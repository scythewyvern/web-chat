<script setup lang="ts">
interface MainButton {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

withDefaults(defineProps<MainButton>(), {
  onClick: () => {},
  type: "button",
});
</script>

<template>
  <button class="button" @click="onClick" :type="type">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: 15px;
  background: var(--c-accent);
  border-radius: 8px;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  letter-spacing: 0.005em;
  color: var(--c-white);
  width: 100%;

  &:hover {
    background: var(--c-accent-hover);
  }
}
</style>
