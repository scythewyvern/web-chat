<script setup lang="ts">
import { useRouter } from "vue-router";
import MainButton from "./ui/MainButton.vue";
import MainInput from "./ui/MainInput.vue";

const { push } = useRouter();

const onSubmit = (e: Event) => {
  if (!(e.target instanceof HTMLFormElement)) return;

  const data = new FormData(e.target);
  const roomId = data.get("roomId");
  const username = data.get("username");

  if (!roomId || !username) return;

  push(`/room/${roomId}?username=${username}`);
};
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <MainInput name="roomId" placeholder="Room ID" />
    <MainInput name="username" placeholder="Username" />
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
