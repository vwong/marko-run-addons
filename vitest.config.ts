import { defineConfig, defaultExclude } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        ...defaultExclude,
        "**/*.d.ts",
        "**/*.test.ts",
        "**/.marko-run/*",
        "*.cjs",
      ],
    },
  },
});
