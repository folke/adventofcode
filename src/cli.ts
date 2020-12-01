import { Day } from "./day"
import chalk from "colorette"
import fs from "fs"

export async function run(day: number) {
  try {
    if (day) (await Day.load(day)).run()
    else {
      for (let d = 1; d <= 25; d++) {
        const f = `src/day${d}.ts`
        if (fs.existsSync(f)) (await Day.load(d)).run()
      }
    }
    console.log("🎅 🎄 done!")
  } catch (error) {
    if (error instanceof Error) console.log(chalk.red("    ✖ ") + error.message)
    else console.log(`${chalk.red("    ✖ error: ")}${error}`)
  }
}
void run(+process.argv[2])
