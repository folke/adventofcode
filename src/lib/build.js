/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path")
const fs = require("fs")
const { addHook } = require("pirates")
const esbuild = require("esbuild")

/**
 * @param {string} src
 * @param {string} filename
 * @returns {string}
 */
function compile(src, filename) {
  const rootPath = path.resolve(__dirname, "..", "..")
  const relativePath = path.relative(rootPath, filename)
  const compiledPath = path
    .resolve(rootPath, "build", relativePath)
    .replace(/\.ts$/mu, ".js")

  if (
    !fs.existsSync(compiledPath) ||
    fs.statSync(compiledPath).mtime < fs.statSync(filename).mtime
  ) {
    console.log(`📦️ ${relativePath}`)
    const code = esbuild.transformSync(src, {
      loader: "ts",
      format: "cjs",
      target: ["node15.0.0"],
      minify: false,
      treeShaking: true,
      sourcemap: true,
      sourcefile: filename,
    }).code

    const compiledDir = path.dirname(compiledPath)
    if (!fs.existsSync(compiledDir))
      fs.mkdirSync(compiledDir, { recursive: true })
    fs.writeFileSync(compiledPath, code, { encoding: "utf-8" })
    return code
  }
  return fs.readFileSync(compiledPath, { encoding: "utf-8" })
}

module.exports = {
  register() {
    addHook(compile, {
      exts: [".ts"],
    })
  },
  /**
   *
   * @param {string} src
   * @param {string} filename
   * @returns {string}
   */
  process(src, filename) {
    return compile(src, filename)
  },
}
