module.exports = {
  setupTestFrameworkScriptFile: './client/src/js/test/setupTests.js',
  testRegex: './client/src/js/test/.*.spec.js$',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/client/src/js/test/fileMock.js'
  },
  globals: {
    localStorage: {
      removeItem() {},
      setItem() {},
      getItem() {}
    }
  }
};
