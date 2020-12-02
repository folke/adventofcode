import chalk from "colorette"
import dotenv from "dotenv"
import fs from "fs"
import { Day } from "./day"
import { updateReadme } from "./bench"
dotenv.config()

export async function run(day: number) {
  try {
    if (day >= 1 && day <= 25) {
      const runner = await Day.load(day)
      await runner.run()
    } else {
      for (let d = 1; d <= 25; d++) {
        const f = `src/day${d}.ts`
        if (fs.existsSync(f)) {
          const runner = await Day.load(d)
          await runner.run()
        }
      }
    }
    updateReadme()
    console.log("🎅 🎄 done!")
  } catch (error) {
    if (error instanceof Error) console.log(chalk.red("✖ ") + error.message)
    else console.log(`${chalk.red("✖ error: ")}${error}`)
  }
}
void run(+process.argv[2])
