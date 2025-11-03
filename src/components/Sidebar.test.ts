import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { fireEvent, getByRole, getByText } from "@testing-library/dom";
import { store } from "../js/store";
import { mount } from "./runtime";
import { Sidebar } from "./Sidebar";

describe("Sidebar Component", () => {
  let container: HTMLElement;
  let unmount: () => void;

  beforeEach(() => {
    // Set up a container for the component
    container = document.createElement("div");
    container.innerHTML = `<div data-component="Sidebar"></div>`;
    document.body.appendChild(container);

    // Reset store and mount components, storing the cleanup function
    store._resetForTesting();
    const componentEl = container.querySelector<HTMLElement>('[data-component="Sidebar"]')!;
    unmount = mount(componentEl, Sidebar);
  });

  afterEach(() => {
    // Clean up the DOM and any component-specific logic
    unmount();
    document.body.innerHTML = "";
  });

  it("should render the sidebar with default state and navigation items", () => {
    const sidebar = container.querySelector('[data-component="Sidebar"]') as HTMLElement;
    expect(sidebar).not.toBeNull();
    expect(sidebar.dataset.state).toBe("default");

    // Check for title and nav items
    expect(getByText(sidebar, "Beto")).not.toBeNull();
    expect(getByText(sidebar, "Dashboard")).not.toBeNull();
    expect(getByText(sidebar, "Users")).not.toBeNull();
    expect(getByText(sidebar, "Settings")).not.toBeNull();
  });

  it("should toggle the sidebar state when the toggle button is clicked", async () => {
    const sidebar = container.querySelector('[data-component="Sidebar"]') as HTMLElement;
    const toggleButton = getByRole(sidebar, "button", { name: "Toggle sidebar" });

    // Initial state check
    expect(store.get("sidebar")).toBe("default");
    expect(sidebar.dataset.state).toBe("default");

    // Click to collapse
    await fireEvent.click(toggleButton);

    // Final state check
    expect(store.get("sidebar")).toBe("collapsed");
    expect(sidebar.dataset.state).toBe("collapsed");
  });
});