const babelConfig = require("./babel.config");
babelConfig.plugins.push("@babel/plugin-transform-modules-commonjs");

module.exports = {
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.spec.{js,jsx,ts,tsx}"
  ],
  coverageReporters: [
    "json",
    "lcov",
    "cobertura",
    "text"
  ],
  coverageDirectory: "<rootDir>/test-results/coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    ".d.ts"
  ],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      babelConfig: babelConfig
    }
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx"
  ],
  reporters: ["default", "jest-junit"],
  setupFiles: [
    "<rootDir>/config/jest/polyfills.js"
  ],
  setupTestFrameworkScriptFile: "<rootDir>config/jest/testSetup.ts",
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.ts?(x)",
    "<rootDir>/src/**/?(*.)(spec|test).ts?(x)"
  ],
  testEnvironment: "jsdom",
  testURL: "http://localhost",
  transform: {
    "^.+\\.s?css$": "<rootDir>/config/jest/cssTransform.js",
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
    "^(?!.*\\.(js|jsx|mjs|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$"
  ],
  moduleNameMapper: {
    "^react-native$": "react-native-web"
  },
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
};