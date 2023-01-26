import { ref } from "vue";
import { defineStore } from "pinia";

export const useControlsStore = defineStore("counter", () => {
  /**
   * @description: Camera muted state
   * @default false
   */
  const isCameraMuted = ref(false);

  /**
   * @description: Mic muted state
   * @default false
   */
  const isMicMuted = ref(false);

  /**
   * @description: Handle camera click event
   * @param callback: VoidFunction
   * @return void
   */
  const handleCameraClick = (callback: VoidFunction) => {
    isCameraMuted.value = !isCameraMuted.value;
    callback();
  };

  /**
   * @description: Handle mic click event
   * @param callback: VoidFunction
   * @return void
   */
  const handleMicClick = (callback: VoidFunction) => {
    isMicMuted.value = !isMicMuted.value;
    callback();
  };

  /**
   * @description: Handle hung up click event
   * @param callback: VoidFunction
   * @return void
   */
  const handleHungUpClick = (callback: VoidFunction) => {
    isMicMuted.value = false;
    isCameraMuted.value = false;
    
    callback();
  };

  return {
    isCameraMuted,
    isMicMuted,
    handleCameraClick,
    handleMicClick,
    handleHungUpClick,
  };
});
