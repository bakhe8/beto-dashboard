import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { fireEvent, getByText, queryByText, getByLabelText } from "@testing-library/dom";
import { mount } from "./runtime";
import { ToastContainer } from "./ToastContainer";
import { store } from "../js/store";

describe("ToastContainer Component", () => {
  let container: HTMLElement;
  let unmount: () => void;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    container.innerHTML = `<div data-component="ToastContainer"></div>`;

    // Reset the store before each test
    store._resetForTesting();
    const componentEl = container.querySelector<HTMLElement>('[data-component="ToastContainer"]')!;
    unmount = mount(componentEl, ToastContainer);
  });

  afterEach(() => {
    unmount();
    document.body.innerHTML = "";
  });

  it("should render toasts when the store is updated", () => {
    // Initially, no toasts should be rendered
    expect(container.querySelector(".toast")).toBeNull();

    // Update the store to add toasts
    store.set("toasts", [
      { id: 1, message: "Success message", type: "success" },
      { id: 2, message: "Error message", type: "danger" },
    ]);

    // Check if toasts are rendered
    expect(getByText(container, "Success message")).not.toBeNull();
    expect(getByText(container, "Error message")).not.toBeNull();
    expect(container.querySelectorAll(".toast").length).toBe(2);
  });

  it("should remove a toast when its close button is clicked", async () => {
    store.set("toasts", [{ id: 123, message: "A toast to close", type: "info" }]);
    const host = container.querySelector('[data-component="ToastContainer"]') as HTMLElement;
    expect(getByText(host, "A toast to close")).not.toBeNull();

    const closeButton = getByLabelText(host, "Close");
    await fireEvent.click(closeButton);
    // Wait a tick to allow store listeners + DOM updates to flush
    await new Promise(r => setTimeout(r, 0));
    expect(queryByText(host, "A toast to close")).toBeNull();
    expect(store.get("toasts").length).toBe(0);
  });
});
