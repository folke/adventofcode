/* eslint-disable no-process-exit */
import chalk from "colorette"
import dotenv from "dotenv"
import fs from "fs"
import { total, updateReadme } from "./bench"
import { Day, defaultOptions } from "./day"
import { ms } from "./format"

dotenv.config()

function help() {
  console.log(`Usage: aoc [options] [day]

  --bench       Benchmark the solutions for all days
  --help|-h     Display this help message
  `)
  process.exit(1)
}

function parseArgs(args: string[] = process.argv) {
  args.shift() // Remove node path

  const options = defaultOptions
  let day = 0

  for (const arg of args) {
    switch (arg) {
      case "--help":
      case "-h":
        help()
        continue

      case "--bench":
        options.examples = false
        options.benchmark = {
          replace: true,
          minRuns: 4,
          minTime: 500,
          warmup: 2,
        }
        continue

      default:
        day = +arg
        continue
    }
  }
  return { day, options }
}

export async function run() {
  const { day, options } = parseArgs()
  try {
    let time = 0
    if (day >= 1 && day <= 25) {
      console.log(`🌍 https://adventofcode.com/2020/day/${day}`)
      const runner = await Day.load(day)
      await runner.run(options)
      time = total(day)
    } else {
      for (let d = 1; d <= 25; d++) {
        const f = `src/day${d}.ts`
        if (fs.existsSync(f)) {
          const runner = await Day.load(d)
          await runner.run(options)
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
void run()
