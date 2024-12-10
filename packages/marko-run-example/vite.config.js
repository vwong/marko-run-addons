import { defineConfig, mergeConfig } from "vite";
import { fileURLToPath } from "url";
import base from "../../vite.config";

export default defineConfig(() =>
  mergeConfig(base, {
    build: {
      assetsInlineLimit: 0,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/_variables.scss" as *;`,
          api: "modern-compiler",
        },
      },
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
      ],
    },
  }),
);
