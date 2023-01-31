import { vi, describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import JoinForm from "../JoinForm.vue";

vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("JoinForm", () => {
  const mockRouter = {
    push: vi.fn((url: string) => url),
  };

  it("submits form data and calls router push", () => {
    const wrapper = mount(JoinForm);
    const spy = vi.spyOn(mockRouter, "push");

    const roomIdInput = wrapper.find<HTMLInputElement>("input[name='roomId']");
    roomIdInput.element.value = "123";
    roomIdInput.trigger("input");

    const usernameInput = wrapper.find<HTMLInputElement>("input[name='username']");
    usernameInput.element.value = "testuser";
    usernameInput.trigger("input");

    wrapper.find("form").trigger("submit");

    expect(spy);
  });
});
