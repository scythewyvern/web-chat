<script setup lang="ts">
import { defineProps } from "vue";

interface MainButton {
  onClick: () => void;
}

defineProps<MainButton>();
</script>

<template>
  <button class="button" @click="onClick">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: 15px;
  background: #757de8;
  border-radius: 8px;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  letter-spacing: 0.005em;
  min-width: 340px;
  color: #ffffff;
  border: none;
  outline: none;
}
</style>
