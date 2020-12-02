import { Input } from "./input"
import path from "path"
import fs from "fs"
import chalk from "colorette"
import { performance } from "perf_hooks"
import { format } from "./format"
import { addBenchmark } from "./bench"

export type Answer = string | number
export type Example = [string, Answer]

export type Solution = {
  (input: Input): Promise<Answer | void> | (Answer | void)
  examples?: Example[]
  answer?: Answer
  part?: 1 | 2
}

export type DayModule = {
  part1: Solution
  part2: Solution
}

export class Day {
  part1: Solution
  part2: Solution

  private constructor(public day: number, mod: DayModule, public input: Input) {
    this.part1 = mod.part1
    this.part1.part = 1
    this.part2 = mod.part2
    this.part2.part = 2
  }

  public static async load(day: number) {
    let mod: DayModule
    try {
      const modPath = path.resolve(__dirname, "..", `day${day}.ts`)
      if (!fs.existsSync(modPath)) {
        fs.copyFileSync(
          path.resolve(__dirname, "..", "day.template.ts"),
          modPath
        )
      }
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      mod = require(modPath) as DayModule
    } catch {
      throw new Error(`day ${day} does not exist yet`)
    }

    const input = await Input.get(day)

    const ret = new Day(day, mod, input)
    if (!ret.part1) throw new Error(`day${day}:part1 is missing`)
    return ret
  }

  async run() {
    console.log(`${chalk.cyan(`❯ Day ${this.day}`)}`)
    await this.runPart(this.part1)
    if (this.part2) {
      await this.runPart(this.part2)
    }
  }

  async runPart(part: Solution) {
    console.log(chalk.blue(`  ● Part ${part.part}`))
    if (part.examples?.length) {
      for (const example of part.examples) {
        const need = example[1]
        const found = await part(new Input(example[0]))
        if (`${need}` != `${found}`) {
          throw new Error(
            `${
              chalk.red("example failed") +
              chalk.dim(` (found: ${format(found)}, need: ${format(need)})`)
            }\n${chalk.dim(example[0])}`
          )
        }
      }
      console.log(
        `${chalk.green("    ✔ ") + part.examples.length.toString()} examples`
      )
    }

    const start = performance.now()
    const answer = await part(this.input)
    const duration = performance.now() - start
    const durationStr = Math.round(duration * 100) / 100

    if (answer === undefined) throw new Error("no solution was found")
    if (part.answer !== answer)
      throw new Error(
        chalk.red("solution failed") +
          chalk.dim(` (found: ${format(answer)}, need: ${format(part.answer)})`)
      )
    addBenchmark(this.day, part.part as 1 | 2, duration)
    console.log(
      `${chalk.green("    ✔ ")}answer: ${format(answer)} (${chalk.magenta(
        `${durationStr}ms`
      )})`
    )
  }
}
