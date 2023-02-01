<script setup lang="ts">
import VideoIcon from "./icons/VideoIcon.vue";
import VideoIconMuted from "./icons/VideoIconMuted.vue";
import AudioIcon from "./icons/AudioIcon.vue";
import AudioIconMuted from "./icons/AudioIconMuted.vue";
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
    <button id="video" @click="onVideoClick">
      <VideoIconMuted id="video-muted" v-if="isLocalVideoMuted" />
      <VideoIcon id="video-unmuted" v-else />
    </button>

    <button id="audio" @click="onAudioClick">
      <AudioIconMuted v-if="isLocalAudioMuted" />
      <AudioIcon v-else />
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
