<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useJasonStore } from "@/stores/jason";
import RoomOverlay from "@/components/RoomOverlay.vue";

const { query } = useRoute();
const username = query.username as string;

const localVideo = ref<HTMLVideoElement>();
const remoteVideo = ref<HTMLVideoElement>();
const remoteAudio = ref<HTMLAudioElement>();

const jasonStore = useJasonStore();

// Init Jason and local stream on mount and add onNewConnection listener
onMounted(async () => {
  await jasonStore.initJason(username);
  await jasonStore.initLocalStream(localVideo.value!);
  await jasonStore.onNewConnection(remoteVideo.value!, remoteAudio.value!);
});

// Dispose room on unmount
onUnmounted(() => {
  const jason = jasonStore.jasonRef;
  const room = jasonStore.roomRef;

  if (room) {
    jason?.dispose();
  }
});
</script>

<template>
  <main>
    <RoomOverlay>
      <video ref="remoteVideo" class="remote-video" autoplay />
      <audio ref="remoteAudio" autoplay></audio>
      <video
      ref="localVideo"
      v-show="!jasonStore.isLocalVideoMuted"
      class="video"
      autoplay
      />
    </RoomOverlay>
  </main>
</template>

<style>
.video {
  height: 230px;
  width: 320px;
  background: var(--c-black);
  position: absolute;
  object-fit: cover;
  right: 27px;
  top: 40px;
}

.remote-video {
  height: 100%;
  width: 100%;
  background: var(--c-black);
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
