import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MainButton from "../ui/MainButton.vue";

describe("MainButton", () => {
  it("renders properly", () => {
    const wrapper = mount(MainButton, {
      slots: { default: "Hello Vitest" },
    });
    expect(wrapper.text()).toContain("Hello Vitest");
  });

  it("emits click event", () => {
    const wrapper = mount(MainButton);
    wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("has a button element", () => {
    const wrapper = mount(MainButton);
    expect(wrapper.find("button").exists()).toBe(true);
  });
});
