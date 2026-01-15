import { fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["**/node_modules/**", "**/.next/**", "**/out/**", "**/dist/**", "**/build/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      "react": fixupPluginRules(react),
      "react-hooks": fixupPluginRules(reactHooks),
      "jsx-a11y": fixupPluginRules(jsxA11y),
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      
      // React rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-key": "error",
      "react/self-closing-comp": "error",
      "react/no-unescaped-entities": "error",
      
      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      
      // Accessibility rules
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/html-has-lang": "error",
      "jsx-a11y/iframe-has-title": "error",
      "jsx-a11y/img-redundant-alt": "error",
      "jsx-a11y/label-has-associated-control": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/tabindex-no-positive": "error",
    },
  },
];
