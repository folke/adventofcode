/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs")
const entryPoints = ["src/cli.ts"]

for (let d = 1; d <= 25; d++) {
  const f = `src/day${d}.ts`
  if (fs.existsSync(f)) entryPoints.push(f)
}

module.exports = {
  build: () =>
    // eslint-disable-next-line node/no-unpublished-require
    require("esbuild").build({
      entryPoints: entryPoints,
      platform: "node",
      bundle: true,
      outdir: "lib",
      incremental: true,
    }),
}
