<script setup lang="ts">
import MainButton from "./ui/MainButton.vue";
import MainInput from "./ui/MainInput.vue";

const onSubmit = () => {
  console.log("submit");
};
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <MainInput value="123" placeholder="Room ID" />
    <MainInput value="123" placeholder="Username" />
    <MainButton type="submit">Join</MainButton>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 27px;
  max-width: 340px;
}
</style>
