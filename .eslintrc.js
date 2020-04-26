module.exports = {
  parser: "babel-eslint",
  plugins: ["prettier"],
  extends: ["plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": ["error", { 
      "semi": true,
      "singleQuote": true,
    }],
    "quotes": ["error", "single"]
  }
}
