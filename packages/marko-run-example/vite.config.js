import { defineConfig, mergeConfig } from "vite";
import base from "../../vite.config";

export default defineConfig(() =>
  mergeConfig(base, {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "#styles/variables.scss" as *;`,
          api: "modern-compiler",
        },
      },
    },
  }),
);
