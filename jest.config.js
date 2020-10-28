module.exports = {
  globals: {
    __PATH_PREFIX__: ``,
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
  },
  setupFiles: [`<rootDir>/loadershim.js`],
  testPathIgnorePatterns: [
    `node_modules`,
    `\\.cache`,
    `<rootDir>.*/public`,
    `<rootDir>.*/cypress`,
  ],
  testURL: `http://localhost`,
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/jest-preprocess.js',
  },
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
}
