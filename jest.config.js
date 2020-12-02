module.exports = {
  testEnvironment: "node",
  testPathIgnorePatterns: ["/lib/", "/node_modules/", "ignore.*", "/build/"],
  transform: {
    "\\.ts$": "<rootDir>/src/lib/build.js",
  },
}
