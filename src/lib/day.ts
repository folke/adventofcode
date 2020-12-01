import { Input } from "./input"
import path from "path"
import chalk from "colorette"
import { performance } from "perf_hooks"

export type Answer = string | number
export type Example = [string, Answer]

export type Solution = {
  (input: Input): Answer | undefined
  examples?: Example[]
  answer?: Answer
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
    this.part2 = mod.part2
  }

  public static async load(day: number) {
    let mod: DayModule
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      mod = require(path.resolve(__dirname, "..", `day${day}`)) as DayModule
    } catch {
      throw new Error(`day ${day} does not exist yet`)
    }

    const input = await Input.get(day)

    const ret = new Day(day, mod, input)
    if (!ret.part1) throw new Error(`day${day}:part1 is missing`)
    return ret
  }

  run() {
    console.log(`${chalk.cyan(`❯ Day ${this.day}`)}`)
    console.log(chalk.blue("  ● Part 1"))
    this.runPart(this.part1)
    if (this.part2) {
      console.log(chalk.blue("  ● Part 2"))
      this.runPart(this.part2)
    }
  }

  runPart(part: Solution) {
    if (part.examples) {
      for (const example of part.examples) {
        const need = example[1]
        const found = part(new Input(example[0]))
        if (`${need}` != `${found}`) {
          throw new Error(
            `${
              chalk.red("example failed") +
              chalk.dim(` (found: ${found}, need: ${need})`)
            }\n${example[0]}`
          )
        }
      }
      console.log(
        `${chalk.green("    ✔ ") + part.examples.length.toString()} examples`
      )
    }

    const start = performance.now()
    const answer = part(this.input)
    const duration = performance.now() - start
    const durationStr = Math.round(duration * 100) / 100

    if (answer === undefined) throw new Error("no solution was found")
    if (part.answer !== answer)
      throw new Error(
        chalk.red("solution failed") +
          chalk.dim(` (found: ${answer}, need: ${part.answer})`)
      )

    console.log(`${chalk.green("    ✔ ")}answer: ${answer} (${durationStr}ms)`)
  }
}
