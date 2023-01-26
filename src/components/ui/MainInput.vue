<script setup lang="ts">
import { ref } from "vue";

interface Input {
  name: string;
  placeholder: string;
}

defineProps<Input>();

const value = ref("");
</script>

<template>
  <input
    class="input"
    v-model="value"
    :name="name"
    :placeholder="placeholder"
    type="text"
  />
</template>

<style scoped>
.input {
  padding: 15px;
  font-size: 22px;
  line-height: 22px;
  letter-spacing: 0.005em;
  color: var(--c-text-secondary);
  background: var(--c-input-background);
  box-shadow: inset 0px 0px 1px var(--c-black);
  border-radius: var(--border-radius);
  width: 100%;
}
</style>
