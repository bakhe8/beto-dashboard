import { define } from "./runtime";
import { setHTML } from "../js/dom";

define("Loader", root => {
  setHTML(root, `
    <div class="loader" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `);
});
