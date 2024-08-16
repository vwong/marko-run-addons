import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      template: "flamegraph",
    }),
  ],
  server: {
    watch: {
      ignored: ["**/coverage/**"],
    },
  },
});