/* eslint-disable @typescript-eslint/no-var-requires */

const { build } = require("./build.js")

async function main() {
  await build()
  require("../lib/cli")
}

if (require.main == module) void main()
