import { define } from "./runtime";
import { setHTML } from "../js/dom";

type Props = {
  columns: { key: string; label: string }[];
  data: Record<string, any>[];
};

export const Table = (root: HTMLElement, props: Props, slots: Record<string, string>) => {
  const { columns, data } = props;

  if (!data || data.length === 0) {
    setHTML(root, slots.empty || "<p>No data available</p>");
    return;
  }

  const header = `<thead><tr>${columns.map(c => `<th>${c.label}</th>`).join("")}</tr></thead>`;
  const body = `<tbody>${data
    .map(
      row =>
        `<tr>${columns
          .map(c => `<td>${row[c.key] || ""}</td>`)
          .join("")}</tr>`
    )
    .join("")}</tbody>`;

  setHTML(root, `<table>${header}${body}</table>`);
};

define("Table", Table);
