<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface Input {
  value: string;
  placeholder: string;
}

const emit = defineEmits(["input"]);

defineProps<Input>();
</script>

<template>
  <input
    class="input"
    type="text"
    :placeholder="placeholder"
    :value="value"
    @input="emit('input')"
  />
</template>

<style scoped>
.input {
  padding: 15px;
  font-weight: 400;
  font-size: 22px;
  line-height: 22px;
  letter-spacing: 0.005em;
  color: #777777;
  background: #f2f2f2;
  box-shadow: inset 0px 0px 1px #000000;
  border-radius: 8px;
  min-width: 340px;
  border: none;
  outline: none;
}
</style>
