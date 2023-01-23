<template>
  <div class="home">
    <MicIcon />
    <Input />
  </div>
</template>

<script>
// @ is an alias to /src
import MicIcon from "@/components/icons/MicIcon.vue";
import Input from "@/components/Input.vue";

export default {
  name: "Home",
  components: {
    MicIcon,
    Input,
  },
};
</script>
