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

const WSS_URL = "wss://frontend-sandbox-voskanian-gor.herokuapp.com/ws";

export const useJasonStore = defineStore("jason", () => {
  /**
   * Jason instance
   */
  const jasonRef = ref<Jason>();
  /**
   * Room instance
   */
  const roomRef = ref<RoomHandle>();
  /**
   * Remote user name
   */
  const remoteUserName = ref("");

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
  const initLocalStream = async (
    deviceVideoEl: HTMLVideoElement
  ) => {
    const jason = jasonRef.value!;
    
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

          deviceVideoEl.srcObject = mediaStream;
        }

        if (track.kind() === MediaKind.Audio) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(track.get_track());

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
  };
});
