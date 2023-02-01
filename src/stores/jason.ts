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
  LocalMediaTrack,
} from "medea-jason";
import { useRouter } from "vue-router";

const WSS_URL = import.meta.env.VITE_WSS_URL;

export const useJasonStore = defineStore("jason", () => {
  const { push } = useRouter();
  const isLocalVideoMuted = ref(false);
  const isLocalAudioMuted = ref(false);
  const isRemoteVideoMuted = ref(false);
  const isRemoteAudioMuted = ref(false);

  const localVideoRef = ref<HTMLVideoElement>();
  /**
   * Jason instance
   */
  const jasonRef = ref<Jason>();
  /**
   * Room instance
   */
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

    push("/");
  };

  /**
   * Initialize Jason and join to the room.
   * Username can be only "Bob" or "Alice"
   * @param username
   * @returns `Jason` and `Room` instances
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
   * @returns constraints which type is `MediaStreamSettings`
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
   * @param tracks - local media tracks which type is `LocalMediaTrack`
   * @param deviceVideoEl - local video element
   */
  const updateLocalVideo = async (
    tracks: LocalMediaTrack[],
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
   * @param deviceVideoEl - local video element
   * @returns constraints type is `MediaStreamSettings`
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
   * @param deviceVideoEl - local video element
   * @param deviceAudioEl - local audio element
   */
  const onNewConnection = async (
    deviceVideoEl: HTMLVideoElement,
    deviceAudioEl: HTMLAudioElement
  ) => {
    const room = roomRef.value!;

    await room.set_local_media_settings(await buildConstraints(), false, false);

    room.on_new_connection((connection: ConnectionHandle) => {
      console.log("New connection", connection.get_remote_member_id());

      // set remote user name
      remoteUserName.value = connection.get_remote_member_id();

      // add remote tracks on new connection
      connection.on_remote_track_added((track: RemoteMediaTrack) => {
        if (
          track.kind() === MediaKind.Video &&
          track.media_source_kind() === MediaSourceKind.Device
        ) {
          const mediaStream = new MediaStream();

          mediaStream.addTrack(track.get_track());
          deviceVideoEl.srcObject = mediaStream;

          track.on_muted(() => {
            isRemoteVideoMuted.value = true;
          });

          track.on_unmuted(() => {
            isRemoteVideoMuted.value = false;
          });
        }

        if (track.kind() === MediaKind.Audio) {
          const mediaStream = new MediaStream();

          mediaStream.addTrack(track.get_track());
          deviceAudioEl.srcObject = mediaStream;

          track.on_muted(() => {
            isRemoteAudioMuted.value = true;
          });

          track.on_unmuted(() => {
            isRemoteAudioMuted.value = false;
          });
        }
      });

      connection.on_close(() => {
        console.log("Connection closed");
      })
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
