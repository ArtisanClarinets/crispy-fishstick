const nextEslintConfig = require("eslint-config-next");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");

module.exports = [
  ...nextEslintConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ]
    }
  },
  {
    // Disable this rule for test files as it causes false positives
    files: ["e2e/**/*.ts", "e2e/**/*.spec.ts", "tests/**/*.ts"],
    rules: {
      "@next/next/no-assign-module-variable": "off"
    }
  },
  {
    ignores: ["**/node_modules/*", ".next/*", "out/*"],
  },
];