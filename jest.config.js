module.exports = {
  ...require("@snowpack/app-scripts-react/jest.config.js")(),
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.spec.{js,jsx,ts,tsx}"
  ],
  coverageReporters: ["json", "lcov", "cobertura", "text"],
  coverageDirectory: "<rootDir>/test-results/coverage",
  coveragePathIgnorePatterns: ["/node_modules/", ".d.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  reporters: ["default", "jest-junit"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.ts?(x)",
    "<rootDir>/src/**/*.{spec,test}.{ts,tsx}"
  ],
  testEnvironment: "jsdom",
  testURL: "http://localhost",
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
};
