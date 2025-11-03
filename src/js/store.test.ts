import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { store, State } from "./store";

describe("Global Store", () => {
  // Reset localStorage and the store's in-memory state before each test
  beforeEach(() => {
    localStorage.clear();
    store._resetForTesting();
  });

  it("should set and get a value correctly", () => {
    store.set("sidebar", "collapsed");
    expect(store.get("sidebar")).toBe("collapsed");
  });

  it("should notify listeners when state changes", () => {
    const listener = vi.fn();
    store.on(listener);

    store.set("theme", "dark");

    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toHaveBeenCalledWith("theme", "dark");
  });

  it("should persist state to localStorage for whitelisted keys", () => {
    store.set("theme", "dark");
    const persistedState = JSON.parse(localStorage.getItem("beto-state") || "{}");
    expect(persistedState.theme).toBe("dark");
  });

  it("should NOT persist state for non-whitelisted keys", () => {
    const user: State["user"] = { id: "123", name: "Beto" };
    store.set("user", user);
    const persistedState = JSON.parse(localStorage.getItem("beto-state") || "{}");
    expect(persistedState.user).toBeUndefined();
  });

  it("should load initial state from localStorage on initialization", () => {
    // Set up localStorage and reset the store to force re-initialization
    localStorage.setItem(
      "beto-state",
      JSON.stringify({ theme: "light", sidebar: "collapsed" })
    );

    store._resetForTesting();

    expect(store.get("theme")).toBe("light");
    expect(store.get("sidebar")).toBe("collapsed");
    expect(store.get("dir")).toBe("ltr"); // Should fall back to default
  });
});