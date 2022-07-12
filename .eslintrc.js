module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jquery: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:jsx-a11y/recommended",
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      impliedStrict: true,
      classes: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
      "react", 
      "prettier", 
      "react-hooks"
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "warn",{
        "additionalHooks": "(useRecoilCallback|useRecoilTransaction_UNSTABLE)"
      }
    ],
    "no-debugger": 0,
    "no-alert": 0,
    "no-unused-vars": 1,
    "prefer-const": [
      "error",
      {
        destructuring: "all",
      },
    ],
    "arrow-body-style": [2, "as-needed"],
    "no-unused-expressions": [
      2,
      {
        allowTaggedTemplates: true,
      },
    ],
    "no-param-reassign": [
      2,
      {
        props: false,
      },
    ],
    "no-console": 0,
    "import/prefer-default-export": 0,
    import: 0,
    "func-names": 0,
    "space-before-function-paren": 0,
    "comma-dangle": 0,
    "max-len": 0,
    "import/extensions": 0,
    "no-underscore-dangle": 0,
    "consistent-return": 0,
    "react/display-name": 1,
    "react/no-array-index-key": 0,
    "react/react-in-jsx-scope": 0,
    "react/prefer-stateless-function": 0,
    "react/forbid-prop-types": 0,
    "react/jsx-props-no-spreading": 0,
    "react/no-unescaped-entities": 0,
    "jsx-a11y/accessible-emoji": 0,
    "react/require-default-props": 0,
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"],
      },
    ],
    radix: 0,
    "no-shadow": "off",
    quotes: [
      2,
      "single",
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "none",
        singleQuote: true,
        printWidth: 100,
      },
    ],
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": [
      "warn",
      {
        aspects: ["invalidHref"],
      },
    ],
  },
};
