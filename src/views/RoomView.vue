<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import RoomOverlay from "@/components/RoomOverlay.vue";
import { useControlsStore } from "@/stores/controls";
import { onMounted, ref } from "vue";
import init, { Jason, JasonError, MediaKind, MediaSourceKind } from "medea-jason";
import { build_constraints } from "./build-constraints";
import { updateLocalVideo } from "./update-video";

const { push } = useRouter();
const { query } = useRoute();
const username = query.username as string;

const controlsStore = useControlsStore();

const onMicClick = () => {
  //
};

const onCameraClick = async () => {
  if (controlsStore.isCameraMuted) return;
};

const onHungUpClick = () => {
  // redirect to home
  push("/");
};


onMounted(async () => {

  await init();
  const jason = new Jason();
  const room = jason.init_room();

  room.on_failed_local_media(() => {
    console.log("Failed to get local media");
  });
  room.on_connection_loss(() => {
    console.log("Connection lost");
  });

  await room.join(
    `wss://frontend-sandbox-voskanian-gor.herokuapp.com/ws/call/${username}?token=helloworld`
  );

  const device_infos = await jason.media_manager().enumerate_devices();
  console.log("Available input and output devices:", device_infos);

  const constraints = await build_constraints();

  const localTracks = await jason
    .media_manager()
    .init_local_tracks(constraints);

  const mediastreams = await updateLocalVideo(localTracks);

  const video = document.querySelector(".video") as HTMLVideoElement;
  video.srcObject = mediastreams;

  room.on_new_connection((connection) => {
    console.log("New connection", connection.get_remote_member_id());

    // connection.add_remote_track(localTracks[0]);

    connection.on_remote_track_added((track) => {
      if (track.kind() === MediaKind.Video) {
        if (track.media_source_kind() === MediaSourceKind.Device) {
          const video = document.querySelector(
            ".remote-video"
          ) as HTMLVideoElement;

          let mediaStream = new MediaStream();
          mediaStream.addTrack(track.get_track());

          video.srcObject = mediaStream;
        }
      }
      console.log(
        "🚀 ~ file: RoomView.vue:103 ~ connection.on_remote_track_added ~ track",
        track
      );
    });
  });

  window.onunhandledrejection = function (event) {
      handleJasonError(event.reason);
    };

    window.onerror = function (event) {
      handleJasonError(event.error);
    };

    // Pretty-prints JasonError, since it does not implements Error due to
    // wasm-bindgen limitations.
    function handleJasonError(error) {
      if (error && error instanceof JasonError) {
        console.error(
          error.name(), "\n",
          error.message(), "\n",
          error.source(), "\n",
          error.trace()
        );
      } else {
        console.error(error);
      }
    }
});
</script>

<template>
  <main>
    <RoomOverlay
      :onMicClick="onMicClick"
      :onCameraClick="onCameraClick"
      :onHungUpClick="onHungUpClick"
      :username="username"
    />
    <video v-if="!controlsStore.isCameraMuted" class="video" autoplay />
    <video class="remote-video" autoplay />
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

.remote-video {
  height: 230px;
  width: 320px;
  background: black;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
