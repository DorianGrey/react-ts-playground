module.exports = {
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.spec.{js,jsx,ts,tsx}"
  ],
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    ".d.ts"
  ],
  "globals": {
    "ts-jest": {
      "tsConfigFile": "tsconfig.test.json"
    }
  },
  "setupFiles": [
    "<rootDir>/config/polyfills.js"
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx"
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.ts?(x)",
    "<rootDir>/src/**/?(*.)(spec|test).ts?(x)"
  ],
  "testEnvironment": "node",
  "testURL": "http://localhost",
  "transform": {
    "^.+\\.s?css$": "<rootDir>/config/jest/cssTransform.js",
    "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
    "^(?!.*\\.(css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$"
  ],
  "moduleNameMapper": {
    "^react-native$": "react-native-web"
  },
  "mapCoverage": true
};