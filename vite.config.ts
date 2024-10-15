import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
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
