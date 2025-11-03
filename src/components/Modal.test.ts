import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { fireEvent, getByRole, getByText } from "@testing-library/dom";
import { mount } from "./runtime";
import { Modal } from "./Modal";

describe("Modal Component", () => {
  let container: HTMLElement;
  let unmount: () => void;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `
      <div data-component="Modal" data-props='{"title": "Test Modal"}'>
        <template data-slot="default"><p>Modal Body Content</p></template>
        <template data-slot="footer"><button data-close>Custom Close</button></template>
      </div>
    `;

    const componentEl = container.querySelector<HTMLElement>('[data-component="Modal"]')!;
    unmount = mount(componentEl, Modal);
  });

  afterEach(() => {
    unmount();
    document.body.innerHTML = "";
  });

  it("should render with the correct title and slot content", () => {
    const modal = getByRole(container, "dialog");
    expect(getByRole(modal, "heading", { name: "Test Modal" })).not.toBeNull();
    expect(getByText(modal, "Modal Body Content")).not.toBeNull();
    expect(getByRole(modal, "button", { name: "Custom Close" })).not.toBeNull();
  });

  it("should close when the header close button is clicked", async () => {
    const modal = getByRole(container, "dialog");
    const closeButton = getByRole(modal, "button", { name: "Close" });

    expect(container.querySelector('[data-component="Modal"]')).not.toBeNull();
    await fireEvent.click(closeButton);
    expect(container.querySelector('[data-component="Modal"]')).toBeNull();
  });

  it("should close when a button with a [data-close] attribute is clicked", async () => {
    const modal = getByRole(container, "dialog");
    const customCloseButton = getByRole(modal, "button", { name: "Custom Close" });

    expect(container.querySelector('[data-component="Modal"]')).not.toBeNull();
    await fireEvent.click(customCloseButton);
    expect(container.querySelector('[data-component="Modal"]')).toBeNull();
  });
});