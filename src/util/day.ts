import chalk from "colorette"
import fs from "fs"
import path from "path"
import { performance } from "perf_hooks"
import { addBenchmark } from "./bench"
import { format, ms } from "./format"
import { Input } from "./input"

export type Answer = string | number
export type Options = Record<string, number | string | boolean | undefined>
export type Example = [string, Answer] | [string, Answer, Options]

export type Solution = {
  (input: Input, options?: Options): Promise<Answer | void> | Answer | void
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
    const modPath = path.resolve(__dirname, "..", `day${day}.ts`)
    if (!fs.existsSync(modPath)) {
      fs.copyFileSync(path.resolve(__dirname, "..", "day.template.ts"), modPath)
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require(modPath) as DayModule

    const input = await Input.get(day)

    const ret = new Day(day, mod, input)
    if (!ret.part1) throw new Error(`day${day}:part1 is missing`)
    return ret
  }

  async run(replaceBenchmark = false) {
    console.log(`${chalk.cyan(`❯ Day ${this.day}`)}`)
    await this.runPart(this.part1, replaceBenchmark)
    if (this.part2) {
      await this.runPart(this.part2, replaceBenchmark)
    }
  }

  async runPart(part: Solution, replaceBenchmark = false) {
    console.log(chalk.blue(`  ● Part ${part.part}`))
    if (part.examples?.length) {
      for (const example of part.examples) {
        const need = example[1]
        const found = await part(new Input(example[0]), example[2])
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

    if (answer === undefined) throw new Error("no solution was found")
    if (part.answer !== answer)
      throw new Error(
        chalk.red("solution failed") +
          chalk.dim(` (found: ${format(answer)}, need: ${format(part.answer)})`)
      )
    addBenchmark(this.day, part.part as 1 | 2, duration, replaceBenchmark)
    console.log(
      `${chalk.green("    ✔ ")}answer: ${format(answer)} (${chalk.magenta(
        ms(duration)
      )})`
    )
  }
}
