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


