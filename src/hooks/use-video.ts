import { ref } from "vue";
import { useRouter } from "vue-router";
import { useControlsStore } from "@/stores/controls";
import { useJasonStore } from "@/stores/jason";

export const useVideoWithControls = () => {
  const { push } = useRouter();
  const controlsStore = useControlsStore();
  const jasonStore = useJasonStore();

  const localVideo = ref<HTMLVideoElement>();
  const remoteVideo = ref<HTMLVideoElement>();
  const remoteAudio = ref<HTMLAudioElement>();

  const onMicClick = async () => {
    const room = jasonStore.roomRef!;

    if (controlsStore.isMicMuted) {
      await room.mute_audio();
    } else {
      await room.unmute_audio();
      await jasonStore.initLocalStream(localVideo.value!);
    }
  };

  const onCameraClick = async () => {
    const room = jasonStore.roomRef!;

    if (controlsStore.isCameraMuted) {
      await room.mute_video();
    } else {
      await room.unmute_video();
      await jasonStore.initLocalStream(localVideo.value!);
    }
  };

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
