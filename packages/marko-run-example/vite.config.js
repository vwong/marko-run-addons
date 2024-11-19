import { defineConfig, mergeConfig } from "vite";
import base from "../../vite.config";

export default defineConfig(() =>
  mergeConfig(base, {
    build: {
      assetsInlineLimit: 0,
    },
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
