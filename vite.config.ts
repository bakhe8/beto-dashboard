import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => ({
  plugins: [
    // Run the visualizer only in 'analyze' mode
    mode === "analyze"
      ? visualizer({
          open: true,
          filename: "dist/stats.html", // Output stats to the dist folder
          gzipSize: true,
          brotliSize: true,
        })
      : undefined,
  ],
  build: {
    rollupOptions: {
      output: {
        // Group heavy dependencies into a 'vendor' chunk for better caching
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("dompurify") || id.includes("zod")) {
              return "vendor";
            }
          }
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    clearMocks: true,
    mockReset: true,
  },
}));