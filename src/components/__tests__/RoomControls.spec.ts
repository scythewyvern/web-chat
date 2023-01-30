import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import RoomControls from "../RoomControls.vue"

describe("RoomControls", () => {
  it("should render", () => {
    const wrapper = mount(RoomControls);
    expect(wrapper.html()).toBeTruthy();
  });

  it("should render a button", () => {
    const wrapper = mount(RoomControls);
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it('should submit form', () => {
    const wrapper = mount(RoomControls);
    wrapper.trigger('submit');
    expect(wrapper.emitted('submit')).toBeTruthy();
  })
});