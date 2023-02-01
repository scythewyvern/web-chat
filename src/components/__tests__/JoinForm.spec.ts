import { vi, describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import JoinForm from "../JoinForm.vue";

vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: () => {},
  }),
}));

describe("JoinForm", () => {
  it("submits form data and calls router push", async () => {
    const wrapper = mount(JoinForm);

    expect(wrapper.html()).toBeTruthy();

    let url = '';

    expect(url).toBe('');

    const roomIdInput = wrapper.find<HTMLInputElement>("[name=roomId]");
    const usernameInput = wrapper.find<HTMLInputElement>("[name=username]");

    await roomIdInput.setValue("123");
    await usernameInput.setValue("Bob");

    url = `/room/${roomIdInput.element.value}?username=${usernameInput.element.value}`

    expect(wrapper.trigger("submit")).toBeTruthy();

    expect(url).toBe('/room/123?username=Bob');
  });
});
