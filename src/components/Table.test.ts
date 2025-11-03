import { describe, it, expect, afterEach } from "vitest";
import { getByText, queryByText } from "@testing-library/dom";
import { mount } from "./runtime";
import { Table } from "./Table";

const testProps = {
  columns: [
    { key: "name", label: "User Name" },
    { key: "email", label: "Email Address" },
  ],
  data: [
    { name: "Beto", email: "beto@example.com" },
    { name: "Bakheet", email: "bakheet@example.com" },
  ],
};

describe("Table Component", () => {
  let container: HTMLElement | null;
  let unmount: () => void;

  afterEach(() => {
    if (unmount) unmount();
    if (container) document.body.removeChild(container);
    container = null;
  });

  it("should render headers and data rows correctly", () => {
    container = document.createElement("div");
    container.innerHTML = `<div data-component="Table" data-props='${JSON.stringify(testProps)}'></div>`;
    document.body.appendChild(container);

    const componentEl = container.querySelector<HTMLElement>('[data-component="Table"]')!;
    unmount = mount(componentEl, Table);

    // Check for headers
    expect(getByText(container, "User Name")).not.toBeNull();
    expect(getByText(container, "Email Address")).not.toBeNull();

    // Check for data
    expect(getByText(container, "Beto")).not.toBeNull();
    expect(getByText(container, "bakheet@example.com")).not.toBeNull();
  });

  it("should render the empty slot when no data is provided", () => {
    container = document.createElement("div");
    container.innerHTML = `
      <div data-component="Table" data-props='${JSON.stringify({ ...testProps, data: [] })}'>
        <template data-slot="empty"><p>No users available.</p></template>
      </div>
    `;
    document.body.appendChild(container);

    const componentEl = container.querySelector<HTMLElement>('[data-component="Table"]')!;
    unmount = mount(componentEl, Table);

    // Check that the empty slot content is rendered
    expect(getByText(container, "No users available.")).not.toBeNull();

    // Check that table data is not rendered
    expect(queryByText(container, "Beto")).toBeNull();
  });
});