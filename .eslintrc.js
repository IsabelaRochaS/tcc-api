/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["unused-imports"],
  rules: {
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
  overrides: [
    {
      files: [
        "*.test.ts",
        "*.spec.ts",
        "*.e2e-spec.ts",
        "*.factory.ts",
        "test/**",
      ],
      rules: {
        "no-unused-expressions": "off",
        "@type-eslint/explicit-function-return-type": "off",
        "@type-eslint/no-explicit-any": "off",
        "@type-eslint/no-empty-function": "off",
        "@type-eslint/explicit-module-boundary-types": "off",
      },
    },
    {
      files: ["*.migration.ts"],
      rules: {
        "@type-eslint/no-explicit-any": "off",
      },
    },
  ],
};
