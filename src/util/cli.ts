import chalk from "colorette"
import dotenv from "dotenv"
import fs from "fs"
import { Day } from "./day"
import { total, updateReadme } from "./bench"
import { ms } from "./format"

dotenv.config()

export async function run(day: number) {
  try {
    let time = 0
    if (day >= 1 && day <= 25) {
      console.log(`🌍 https://adventofcode.com/2020/day/${day}`)
      const runner = await Day.load(day)
      await runner.run(true)
      time = total(day)
    } else {
      for (let d = 1; d <= 25; d++) {
        const f = `src/day${d}.ts`
        if (fs.existsSync(f)) {
          const runner = await Day.load(d)
          await runner.run()
        }
      }
      time = total()
    }
    updateReadme()
    console.log(`🎅 🎄 done in ${ms(time)}!`)
  } catch (error) {
    if (error instanceof Error) console.log(chalk.red("✖ ") + error.message)
    else console.log(`${chalk.red("✖ error: ")}${error}`)
  }
}
void run(+process.argv[2])
