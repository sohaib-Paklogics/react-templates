export default {
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'no-undef': 'off',
    "no-console": ["error", { allow: ["warn", "error"] }],
    'prettier/prettier': ['error'],
    "no-unused-vars": "warn",
    
  },
  env: {
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
};
