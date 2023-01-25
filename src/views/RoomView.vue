<script setup lang="ts">
import { useRoute } from "vue-router";
import RoomOverlay from "@/components/RoomOverlay.vue";
import { useControlsStore } from "@/stores/controls";

const { query } = useRoute();
const username = query.username?.toString() ?? "Unknown";

const controlsStore = useControlsStore();

const onMicClick = () => {
  //
};

const onCameraClick = () => {
  //
};

const onHungUpClick = () => {
  //
};
</script>

<template>
  <main>
    <RoomOverlay
      :onMicClick="onMicClick"
      :onCameraClick="onCameraClick"
      :onHungUpClick="onHungUpClick"
      :username="username"
    />
    <div v-if="!controlsStore.isCameraMuted" class="video"></div>
  </main>
</template>

<style>
.video {
  height: 230px;
  width: 320px;
  background: black;
  position: absolute;
  right: 27px;
  top: 40px;
}
</style>
