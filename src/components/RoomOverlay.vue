<script setup lang="ts">
import FrameGradient from "@/components/ui/FrameGradient.vue";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import CameraIconMuted from "@/components/icons/CameraIconMuted.vue";
import MicIcon from "@/components/icons/MicIcon.vue";
import MicIconMuted from "@/components/icons/MicIconMuted.vue";
import HungUpIcon from "@/components/icons/HungUpIcon.vue";
import { useJasonStore } from "@/stores/jason";

const jasonStore = useJasonStore();
</script>

<template>
  <slot />
  <div class="muted">
    <h1 v-if="jasonStore.isRemoteAudioMuted">audio muted</h1>
    <h1 v-if="jasonStore.isRemoteVideoMuted">video muted</h1>
  </div>
  <FrameGradient>
    <div class="overlay">
      <p>{{ jasonStore.remoteUserName }}</p>
      <div class="controls">
        <button @click="jasonStore.onVideoMute">
          <CameraIconMuted v-if="jasonStore.isLocalVideoMuted" />
          <CameraIcon v-else />
        </button>
        <button @click="jasonStore.onAudioMute">
          <MicIconMuted v-if="jasonStore.isLocalAudioMuted" />
          <MicIcon v-else />
        </button>
        <button @click="jasonStore.onHungUp">
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

.muted {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: 700;
  color: var(--c-white);
  z-index: 20;
}
</style>
