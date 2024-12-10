import globals from "globals";
import prettier from "eslint-config-prettier";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "**/.marko-run/*",
      "**/coverage/*",
      "**/dist/*",
      "**/public/*",
      "*.cjs",
    ],
  },
  ...tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    prettier,
  ),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];
