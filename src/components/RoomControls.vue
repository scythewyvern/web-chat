<script setup lang="ts">
import CameraIcon from "./icons/CameraIcon.vue";
import CameraIconMuted from "./icons/CameraIconMuted.vue";
import MicIcon from "./icons/MicIcon.vue";
import MicIconMuted from "./icons/MicIconMuted.vue";
import HungUpIcon from "./icons/HungUpIcon.vue";

interface RoomControls {
  onVideoClick: () => void;
  onAudioClick: () => void;
  onHungUpClick: () => void;
  isLocalVideoMuted: boolean;
  isLocalAudioMuted: boolean;
}

defineProps<RoomControls>();
</script>

<template>
  <div class="controls">
    <button @click="onVideoClick">
      <CameraIconMuted v-if="isLocalVideoMuted" />
      <CameraIcon v-else />
    </button>

    <button @click="onAudioClick">
      <MicIconMuted v-if="isLocalAudioMuted" />
      <MicIcon v-else />
    </button>

    <button @click="onHungUpClick">
      <HungUpIcon />
    </button>
  </div>
</template>

<style scoped lang="scss">
.controls {
  display: flex;
  gap: 35px;
}
</style>
