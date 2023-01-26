import { MediaKind, MediaSourceKind } from "medea-jason";

export async function updateLocalVideo(stream) {
  for (const track of stream) {
    if (track.kind() === MediaKind.Audio) {
      continue;
    }
    
    const mediaStream = new MediaStream();

    mediaStream.addTrack(track.get_track());

    return mediaStream;

    // if (track.media_source_kind() === MediaSourceKind.Display) {
    //   const displayVideoEl = localVideo.getElementsByClassName('local-display-video')[0];
    //   if (displayVideoEl === undefined) {
    //     displayVideoEl = document.createElement('video');
    //     displayVideoEl.className = 'local-display-video';
    //     displayVideoEl.width = 300;
    //     displayVideoEl.autoplay = 'true';
    //     localVideo.appendChild(displayVideoEl);
    //   }
    //   displayVideoEl.srcObject = mediaStream;
    // } else {
    //   const deviceVideoEl = localVideo.getElementsByClassName('local-device-video')[0];
    //   if (deviceVideoEl === undefined) {
    //     deviceVideoEl = document.createElement('video');
    //     deviceVideoEl.className = 'local-device-video';
    //     deviceVideoEl.width = 300;
    //     deviceVideoEl.autoplay = 'true';
    //     localVideo.appendChild(deviceVideoEl);
    //   }
    //   deviceVideoEl.srcObject = mediaStream;
    // }
  }
}