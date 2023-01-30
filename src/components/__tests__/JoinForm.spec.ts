import { vi, describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import JoinForm from "../JoinForm.vue"



describe("JoinForm", () => {
  it("should render", () => {
    const mockRouter = {
      push: vi.fn(),
    }

    const wrapper = mount(JoinForm);
    expect(wrapper.html()).toMatchSnapshot();
  });
});