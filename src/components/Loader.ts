import { define } from "./runtime";

type LoaderProps = {
  type?: "spinner" | "skeleton";
  size?: "sm" | "md" | "lg";
};

define("Loader", (root, props: LoaderProps) => {
  const { type = "spinner", size = "md" } = props;

  root.innerHTML = `
    <div 
      class="loader" 
      data-type="${type}" 
      data-size="${size}" 
      role="status" 
      aria-live="polite"
    >
      <span class="sr-only">Loading...</span>
    </div>
  `;
});