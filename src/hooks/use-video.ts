import { ref } from "vue";
import { useRouter } from "vue-router";
import { useControlsStore } from "@/stores/controls";
import { useJasonStore } from "@/stores/jason";

export const useVideoWithControls = () => {
  const { push } = useRouter();
  const controlsStore = useControlsStore();
  const jasonStore = useJasonStore();

  /**
   * Local video element
   */
  const localVideo = ref<HTMLVideoElement>();
  /**
   * Remote video element
   */
  const remoteVideo = ref<HTMLVideoElement>();
  /**
   * Remote audio element
   */
  const remoteAudio = ref<HTMLAudioElement>();

  /**
   * Mic button click handler
   */
  const onMicClick = async () => {
    const room = jasonStore.roomRef!;

    if (controlsStore.isMicMuted) {
      await room.mute_audio();
    } else {
      await room.unmute_audio();
      await jasonStore.initLocalStream(localVideo.value!);
    }
  };

  /**
   * Camera button click handler
   */
  const onCameraClick = async () => {
    const room = jasonStore.roomRef!;

    if (controlsStore.isCameraMuted) {
      await room.mute_video();
    } else {
      await room.unmute_video();
      await jasonStore.initLocalStream(localVideo.value!);
    }
  };

  /**
   * Hung up button click handler
   * TODO: make correct hangup
   */
  const onHungUpClick = async () => {
    const room = jasonStore.roomRef!;

    await room.mute_video();
    await room.mute_audio();
    
    push("/");
  };

  return {
    localVideo,
    remoteVideo,
    remoteAudio,
    onMicClick,
    onCameraClick,
    onHungUpClick,
  };
};
