import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { fireEvent, getByRole } from "@testing-library/dom";
import { store } from "../js/store";
import { mount } from "./runtime";
import { ThemeSwitcher } from "./ThemeSwitcher";

describe("ThemeSwitcher Component", () => {
  let container: HTMLElement;
  let unmount: () => void;

  beforeEach(() => {
    container = document.createElement("div");
    container.innerHTML = `<div data-component="ThemeSwitcher"></div>`;
    document.body.appendChild(container);

    // Reset store to its default state { theme: 'auto', ... }
    store._resetForTesting();
    const componentEl = container.querySelector<HTMLElement>('[data-component="ThemeSwitcher"]')!;
    unmount = mount(componentEl, ThemeSwitcher);
  });

  afterEach(() => {
    unmount();
    document.body.innerHTML = "";
  });

  it("should render with the default theme ('auto') selected", () => {
    const radioGroup = getByRole(container, "radiogroup", { name: "Theme" });
    const autoButton = getByRole(radioGroup, "radio", { name: "Auto" });
    const lightButton = getByRole(radioGroup, "radio", { name: "Light" });
    const darkButton = getByRole(radioGroup, "radio", { name: "Dark" });

    expect(autoButton.getAttribute("aria-checked")).toBe("true");
    expect(lightButton.getAttribute("aria-checked")).toBe("false");
    expect(darkButton.getAttribute("aria-checked")).toBe("false");
  });

  it("should update the store when a theme button is clicked", () => {
    const radioGroup = getByRole(container, "radiogroup", { name: "Theme" });
    const darkButton = getByRole(radioGroup, "radio", { name: "Dark" });

    expect(store.get("theme")).toBe("auto");
    fireEvent.click(darkButton);
    expect(store.get("theme")).toBe("dark");
  });

  it("should re-render and update the checked state when the store changes externally", () => {
    const radioGroup = getByRole(container, "radiogroup", { name: "Theme" });
    const darkButton = getByRole(radioGroup, "radio", { name: "Dark" });

    expect(darkButton.getAttribute("aria-checked")).toBe("false");

    // Simulate an external state change
    store.set("theme", "dark");

    expect(darkButton.getAttribute("aria-checked")).toBe("true");
  });
});