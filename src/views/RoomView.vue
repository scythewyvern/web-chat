<script setup lang="ts">
import { useRoute } from "vue-router";
const { params, query } = useRoute();
const username = query.username
</script>

<template>
<div>
  <h1>Room {{ params.id }}</h1>
  <p>hi {{ username }}</p>
</div>
</template>

<style>
</style>