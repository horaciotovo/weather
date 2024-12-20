const prettierConfig = require("eslint-config-prettier");
module.exports = [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      playwright: require("eslint-plugin-playwright"),
      prettier: require("eslint-plugin-prettier"),
    },
    rules: {
      //Typescript rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "playwright/no-skipped-test": "warn",
      //Playwright rules
      "playwright/no-focused-test": "error",
      "playwright/no-wait-for-timeout": "warn",
      //Prettir rules
      "prettier/prettier": "warn",
    },
    settings: {
      prettier: prettierConfig,
    },
  },
];
