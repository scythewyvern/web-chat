import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import RoomControls from "../RoomControls.vue";
import VideoIcon from "../icons/VideoIcon.vue";
import VideoIconMuted from "../icons/VideoIconMuted.vue";
import AudioIcon from "../icons/AudioIcon.vue";
import AudioIconMuted from "../icons/AudioIconMuted.vue";

const props = {
  onVideoClick: () => {},
  onAudioClick: () => {},
  onHungUpClick: () => {},
  isLocalVideoMuted: false,
  isLocalAudioMuted: false,
};

describe("RoomControls", () => {
  const wrapper = mount(RoomControls, { props });

  it("should render", () => {
    expect(wrapper.html()).toBeTruthy();
  });

  it("should render a `3` buttons", () => {
    const buttons = wrapper.findAll("button");
    expect(buttons.length).toBe(3);
  });

  it("should toggle video button", async () => {
    expect(wrapper.findComponent(VideoIcon).exists()).toBe(true);
    expect(wrapper.findComponent(VideoIconMuted).exists()).toBe(false);

    await wrapper.find("#video").trigger("click");
    await wrapper.setProps({ isLocalVideoMuted: true });

    expect(wrapper.findComponent(VideoIcon).exists()).toBe(false);
    expect(wrapper.findComponent(VideoIconMuted).exists()).toBe(true);
  });

  it("should toggle audio button", async () => {
    expect(wrapper.findComponent(AudioIcon).exists()).toBe(true);
    expect(wrapper.findComponent(AudioIconMuted).exists()).toBe(false);

    await wrapper.find("#audio").trigger("click");
    await wrapper.setProps({ isLocalAudioMuted: true });

    expect(wrapper.findComponent(AudioIcon).exists()).toBe(false);
    expect(wrapper.findComponent(AudioIconMuted).exists()).toBe(true);
  });
});
