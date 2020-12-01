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
  const relativePath = path.relative(path.resolve(__dirname), filename)
  const compiledPath = path
    .resolve(__dirname, "build", relativePath)
    .replace(/\.ts$/mu, ".js")
  // console.log(`[check] ${relativePath}`)

  if (
    !fs.existsSync(compiledPath) ||
    fs.statSync(compiledPath).mtime < fs.statSync(filename).mtime
  ) {
    console.log(`[compile] ${relativePath}`)
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

addHook(compile, {
  exts: [".ts"],
})

module.exports = {
  process(src, filename) {
    return compile(src, filename)
  },
}
