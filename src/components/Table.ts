import { define } from "./runtime";

type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
};

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  sortable?: boolean;
}

define("Table", <T extends Record<string, any>>(root: HTMLElement, props: TableProps<T>, slots: Record<string, string>) => {
  const { columns, data, sortable = true } = props;

  const renderHeader = () => `
    <thead>
      <tr>
        ${columns
          .map(
            (c) => `
          <th scope="col" ${sortable && c.sortable ? 'aria-sort="none" tabindex="0"' : ""}>
            ${c.label}
          </th>`
          )
          .join("")}
      </tr>
    </thead>
  `;

  const renderBody = () => `
    <tbody>
      ${data
        .map(
          (row) => `
        <tr>
          ${columns.map((c) => `<td>${row[c.key] || ""}</td>`).join("")}
        </tr>`
        )
        .join("")}
    </tbody>
  `;

  if (data.length === 0 && slots.empty) {
    root.innerHTML = slots.empty;
    return;
  }

  root.innerHTML = `
    <div class="table-wrapper">
      <table aria-rowcount="${data.length}">
        ${renderHeader()}
        ${renderBody()}
      </table>
    </div>
  `;
});