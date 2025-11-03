import { define } from "./runtime";
import { sanitize } from "../js/utils/sanitize";

define("Loader", root => {
  root.innerHTML = sanitize(`
    <div class="loader" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `);
});