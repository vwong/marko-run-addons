const path = require("path");

module.exports = {
  customSyntax: "postcss-scss",
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-scss",
  ],
  plugins: ["stylelint-order", "stylelint-scss"],
  overrides: [
    {
      customSyntax: path.resolve(__dirname, "postcss-marko.cjs"),
      files: ["*.marko"],
      rules: {
        "no-empty-source": null,
      },
    },
  ],
  rules: {
    "order/properties-alphabetical-order": true,
  },
};
