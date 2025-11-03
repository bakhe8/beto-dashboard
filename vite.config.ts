import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      mode === "analyze"
        ? visualizer({
            open: true,
            filename: "stats.html",
            gzipSize: true,
            brotliSize: true,
          })
        : [],
    ],
  };
});