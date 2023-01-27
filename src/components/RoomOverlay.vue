<script setup lang="ts">
import { useJasonStore } from "@/stores/jason";
import FrameGradient from "./ui/FrameGradient.vue";
import RoomControls from "./RoomControls.vue";

const jasonStore = useJasonStore();
</script>

<template>
  <slot />
  <div class="mute-indicators">
    <h1 v-if="jasonStore.isRemoteAudioMuted">audio muted</h1>
    <h1 v-if="jasonStore.isRemoteVideoMuted">video muted</h1>
  </div>
  <FrameGradient>
    <div class="overlay">
      <p>{{ jasonStore.remoteUserName }}</p>
      <RoomControls
        :onAudioClick="jasonStore.onAudioMute"
        :onVideoClick="jasonStore.onVideoMute"
        :onHungUpClick="jasonStore.onHungUp"
        :isLocalAudioMuted="jasonStore.isLocalAudioMuted"
        :isLocalVideoMuted="jasonStore.isLocalVideoMuted"
      />
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

.mute-indicators {
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
