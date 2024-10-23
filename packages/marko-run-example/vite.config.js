import { defineConfig, mergeConfig } from "vite";
import base from "../../vite.config";

export default defineConfig(() =>
  mergeConfig(base, {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "sass:math"; @import "./src/styles/variables.scss";`,
        },
      },
    },
  }),
);
