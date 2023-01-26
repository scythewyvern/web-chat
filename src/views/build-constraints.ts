import init, {
  AudioTrackConstraints,
  DeviceVideoTrackConstraints,
  DisplayVideoTrackConstraints,
  FacingMode,
  MediaStreamSettings,
} from "medea-jason";

export async function build_constraints() {
  const constraints = new MediaStreamSettings();

  const audio = new AudioTrackConstraints();
  const video = new DeviceVideoTrackConstraints();
  
  video.exact_facing_mode(FacingMode.User);
  
  constraints.audio(audio);
  constraints.device_video(new DeviceVideoTrackConstraints());

  return constraints;
}

// async function build_constraints(audio_select, video_select) {
//   const constraints = new MediaStreamSettings();
//   if (audio_select != null) {
//     const audio = new AudioTrackConstraints();
//     const audioSource = audio_select.options[audio_select.selectedIndex];
//     if (audioSource) {
//       audio.device_id(audioSource.value);
//     }
//     constraints.audio(audio);
//   }

//   if (video_select != null) {
//     const videoSource = video_select.options[video_select.selectedIndex];
//     if (videoSource) {
//       if (videoSource.value === "screen") {
//         const video = new DisplayVideoTrackConstraints();
//         constraints.display_video(video);
//       } else {
//         const video = new DeviceVideoTrackConstraints();
//         if (videoSource.value === "facingModeUser") {
//           video.exact_facing_mode(FacingMode.User);
//         } else if (videoSource.value === "facingModeEnvironment") {
//           video.exact_facing_mode(FacingMode.Environment);
//         } else {
//           video.device_id(videoSource.value);
//         }
//         constraints.device_video(video);
//         if (screenshareSwitchEl.checked) {
//           constraints.display_video(new DisplayVideoTrackConstraints());
//         }
//       }
//     } else {
//       constraints.device_video(new DeviceVideoTrackConstraints());
//     }
//   }

//   return constraints;
// }
