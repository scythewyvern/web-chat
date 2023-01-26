<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useControlsStore } from "@/stores/controls";
import { useJasonStore } from "@/stores/jason";
import { useVideoWithControls } from "@/hooks/use-video";
import RoomOverlay from "@/components/RoomOverlay.vue";

const { query } = useRoute();
const username = query.username as string;

const controlsStore = useControlsStore();
const jasonStore = useJasonStore();

const { initJason, initLocalStream, onNewConnection } = jasonStore;
const {
  localVideo,
  remoteVideo,
  remoteAudio,
  onCameraClick,
  onHungUpClick,
  onMicClick,
} = useVideoWithControls();

onMounted(async () => {
  await initJason(username);
  await initLocalStream(localVideo.value!);
  await onNewConnection(remoteVideo.value!, remoteAudio.value!);
});

onBeforeUnmount(() => {
  const jason = jasonStore.jasonRef;
  const room = jasonStore.roomRef;

  if (room) {
    jason?.close_room(room);
  }
});
</script>

<template>
  <main>
    <RoomOverlay
      :onMicClick="onMicClick"
      :onCameraClick="onCameraClick"
      :onHungUpClick="onHungUpClick"
      :username="jasonStore.remoteUserName"
    >
      <video ref="remoteVideo" class="remote-video" autoplay />
      <audio ref="remoteAudio" autoplay></audio>
    </RoomOverlay>
    <video
      ref="localVideo"
      v-if="!controlsStore.isCameraMuted"
      class="video"
      autoplay
    />
  </main>
</template>

<style>
.video {
  height: 230px;
  width: 320px;
  background: black;
  position: absolute;
  object-fit: cover;
  right: 27px;
  top: 40px;
}

.remote-video {
  height: 100%;
  width: 100%;
  background: black;
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
