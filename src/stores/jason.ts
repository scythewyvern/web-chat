import { ref } from "vue";
import { defineStore } from "pinia";
import init, {
  AudioTrackConstraints,
  ConnectionHandle,
  DeviceVideoTrackConstraints,
  FacingMode,
  Jason,
  MediaKind,
  MediaSourceKind,
  MediaStreamSettings,
  RemoteMediaTrack,
  RoomHandle,
} from "medea-jason";
import { useRouter } from "vue-router";

const WSS_URL = "wss://frontend-sandbox-voskanian-gor.herokuapp.com/ws";


export const useJasonStore = defineStore("jason", () => {
  const { push } = useRouter();
  const isLocalVideoMuted = ref(false);
  const isLocalAudioMuted = ref(false);
  const isRemoteVideoMuted = ref(false);
  const isRemoteAudioMuted = ref(false);

  const localVideoRef = ref<HTMLVideoElement>();
  const jasonRef = ref<Jason>();
  const roomRef = ref<RoomHandle>();
  const remoteUserName = ref("");

  /**
   * Mute local video
   * @returns void
   */
  const onVideoMute = async () => {
    const room = roomRef.value;

    if (!room) return;

    if (!isLocalVideoMuted.value) {
      await room.mute_video();
    } else {
      await room.unmute_video();
      await initLocalStream(localVideoRef.value!);
    }

    isLocalVideoMuted.value = !isLocalVideoMuted.value;
  };

  /**
   * Mute local audio
   * @returns void
   */
  const onAudioMute = async () => {
    const room = roomRef.value;

    if (!room) return;

    if (!isLocalAudioMuted.value) {
      await room.mute_audio();
    } else {
      await room.unmute_audio();
      await initLocalStream(localVideoRef.value!);
    }

    isLocalAudioMuted.value = !isLocalAudioMuted.value;
  };

  /**
   * Hang up
   * @returns void
   */
  const onHungUp = async () => {
    const room = roomRef.value;

    if (!room) return;

    await room.mute_video();
    await room.mute_audio();

    push("/");
  };

  /**
   * Initialize Jason and join to the room
   * username can be only "Bob" or "Alice"
   * @param username
   * @returns Jason and Room instances
   */
  const initJason = async (username: string) => {
    await init();

    const jason = new Jason();
    const room = jason.init_room();

    room.on_failed_local_media(() => {
      console.log("Failed to get local media");
    });

    room.on_connection_loss(() => {
      console.log("Connection lost");
    });

    await room.join(`${WSS_URL}/call/${username}?token=helloworld`);

    jasonRef.value = jason;
    roomRef.value = room;

    return { jason, room };
  };

  /**
   * Build constraints for local media
   * @returns MediaStreamSettings
   */
  const buildConstraints = async () => {
    const constraints = new MediaStreamSettings();

    const audio = new AudioTrackConstraints();
    const video = new DeviceVideoTrackConstraints();

    video.exact_facing_mode(FacingMode.User);

    constraints.audio(audio);
    constraints.device_video(new DeviceVideoTrackConstraints());

    return constraints;
  };

  /**
   * Update local video
   * @param tracks
   * @param deviceVideoEl
   */
  const updateLocalVideo = async (
    tracks: any[],
    deviceVideoEl: HTMLVideoElement
  ) => {
    localVideoRef.value = deviceVideoEl;

    for (const track of tracks) {
      if (track.kind() === MediaKind.Audio) continue;

      const mediaStream = new MediaStream();
      mediaStream.addTrack(track.get_track());

      if (track.media_source_kind() === MediaSourceKind.Device) {
        deviceVideoEl.srcObject = mediaStream;
      }
    }
  };

  /**
   * Initialize local media stream
   * @param deviceVideoEl
   * @returns MediaStreamSettings
   */
  const initLocalStream = async (deviceVideoEl: HTMLVideoElement) => {
    const jason = jasonRef.value;

    if (!jason) return;

    const constraints = await buildConstraints();
    const localTracks = await jason
      .media_manager()
      .init_local_tracks(constraints);

    await updateLocalVideo(localTracks, deviceVideoEl);
 
    return constraints;
  };

  /**
   * Handle new connection
   * @param deviceVideoEl
   * @param deviceAudioEl
   */
  const onNewConnection = async (
    deviceVideoEl: HTMLVideoElement,
    deviceAudioEl: HTMLAudioElement
  ) => {
    const room = roomRef.value!;

    room.set_local_media_settings(await buildConstraints(), true, true);

    room.on_new_connection((connection: ConnectionHandle) => {
      console.log("New connection", connection.get_remote_member_id());

      remoteUserName.value = connection.get_remote_member_id();

      connection.on_remote_track_added((track: RemoteMediaTrack) => {
        if (
          track.kind() === MediaKind.Video &&
          track.media_source_kind() === MediaSourceKind.Device
        ) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(track.get_track());

          track.on_muted(() => {
            isRemoteVideoMuted.value = true;
          });

          track.on_unmuted(() => {
            isRemoteVideoMuted.value = false;
          });

          deviceVideoEl.srcObject = mediaStream;
        }

        if (track.kind() === MediaKind.Audio) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(track.get_track());

          track.on_muted(() => {
            isRemoteAudioMuted.value = true;
          });

          track.on_unmuted(() => {
            isRemoteAudioMuted.value = false;
          });

          deviceAudioEl.srcObject = mediaStream;
        }
      });
    });
  };

  return {
    initJason,
    initLocalStream,
    onNewConnection,
    remoteUserName,
    jasonRef,
    roomRef,
    isLocalVideoMuted,
    isLocalAudioMuted,
    isRemoteVideoMuted,
    isRemoteAudioMuted,
    onVideoMute,
    onAudioMute,
    onHungUp,
  };
});
