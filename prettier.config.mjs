/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "<BUILT_IN_MODULES>",
    "",
    "^react/(.*)$|^react$",
    "^next/(.*)$|^next$",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^~/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
};

export default config;
