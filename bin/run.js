/* eslint-disable node/no-unpublished-require */

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("../build.transform").register()

if (require.main == module) require("../src/lib/cli")
