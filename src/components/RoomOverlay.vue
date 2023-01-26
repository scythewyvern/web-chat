<script setup lang="ts">
import FrameGradient from "@/components/ui/FrameGradient.vue";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import CameraIconMuted from "@/components/icons/CameraIconMuted.vue";
import MicIcon from "@/components/icons/MicIcon.vue";
import MicIconMuted from "@/components/icons/MicIconMuted.vue";
import HungUpIcon from "@/components/icons/HungUpIcon.vue";
import { useControlsStore } from "@/stores/controls";

interface RoomOverlayProps {
  username: string;
  onMicClick: () => void;
  onCameraClick: () => void;
  onHungUpClick: () => void;
}

const props = defineProps<RoomOverlayProps>();

const controlsStore = useControlsStore();
</script>

<template>
  <slot />
  <FrameGradient>
    <div class="overlay">
      <p>{{ username }}</p>
      <div class="controls">
        <button @click="controlsStore.handleCameraClick(props.onCameraClick)">
          <CameraIconMuted v-if="controlsStore.isCameraMuted" />
          <CameraIcon v-else />
        </button>
        <button @click="controlsStore.handleMicClick(props.onMicClick)">
          <MicIconMuted v-if="controlsStore.isMicMuted" />
          <MicIcon v-else />
        </button>
        <button @click="controlsStore.handleHungUpClick(props.onHungUpClick)">
          <HungUpIcon />
        </button>
      </div>
    </div>
  </FrameGradient>
</template>

<style>
.overlay {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 20px 0 50px;
  color: var(--c-white);
  z-index: 20;
}

.controls {
  display: flex;
  gap: 35px;
}
</style>
