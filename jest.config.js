module.exports = {
  testEnvironment: "node",
  testPathIgnorePatterns: ["/lib/", "/node_modules/", "ignore.*", "/build/"],
  coverageProvider: "v8",
  collectCoverageFrom: ["src/*.ts"],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  transform: {
    "\\.ts$": "<rootDir>/src/lib/build.js",
  },
}
