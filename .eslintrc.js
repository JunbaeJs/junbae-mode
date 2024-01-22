module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/typescript",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "no-useless-constructor": "off",
    "max-classes-per-file": "off",
    "no-shadow": "off",
    "prettier/prettier": "error",
    "no-param-reassign": "off",
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/*.spec.*", "**/*.test.*"] },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": [
      "error",
      { typedefs: false, functions: false, classes: false, variables: true },
    ],
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-restricted-syntax": ["error", "WithStatement"],
    "class-methods-use-this": "off",
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/*.test.ts", "**/*.spec.ts", "**/*.e2e-test.ts"] },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      },
    ],
  },
};
