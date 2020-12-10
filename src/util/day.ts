import chalk from "colorette"
import fs from "fs"
import path from "path"
import { performance, PerformanceObserver } from "perf_hooks"
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

export const defaultOptions = {
  debug: false,
  year: new Date().getFullYear(),
  verbose: true,
  examples: true,
  benchmark: { replace: false, minRuns: 1, minTime: 0, warmup: 0 },
}
type RunOptions = typeof defaultOptions

export class Day {
  part1: Solution
  part2: Solution

  private constructor(
    public year: number,
    public day: number,
    mod: DayModule,
    public input: Input
  ) {
    this.part1 = mod.part1
    this.part1.part = 1
    this.part2 = mod.part2
    this.part2.part = 2
  }

  public static async load(year: number, day: number) {
    const srcPath = path.resolve("src", `${year}`)

    const modPath = path.resolve("src", `${year}`, `day${day}.ts`)
    if (!fs.existsSync(modPath)) {
      if (!fs.existsSync(srcPath)) fs.mkdirSync(srcPath, { recursive: true })
      fs.copyFileSync(path.resolve(__dirname, "day.tpl"), modPath)
    }
    const mod = (await import(modPath)) as DayModule

    const input = await Input.get(year, day)

    const ret = new Day(year, day, mod, input)
    if (!ret.part1) throw new Error(`day${day}:part1 is missing`)
    if (!ret.part2) throw new Error(`day${day}:part2 is missing`)
    return ret
  }

  async run(_options: Partial<RunOptions> = {}) {
    const options = { ...defaultOptions, ..._options }
    if (options.verbose) console.log(`${chalk.cyan(`❯ Day ${this.day}`)}`)
    await this.runPart(this.part1, options)
    if (this.part2) {
      await this.runPart(this.part2, options)
    }
  }

  async runPart(part: Solution, options: RunOptions) {
    if (options.verbose) console.log(chalk.blue(`  ● Part ${part.part}`))
    if (options.examples && part.examples?.length) {
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
      if (options.verbose)
        console.log(
          `${chalk.green("    ✔ ") + part.examples.length.toString()} examples`
        )
    }

    const { answer, duration } = await this.measure(part, options)

    if (answer === undefined) throw new Error("no solution was found")
    if (part.answer !== answer)
      throw new Error(
        chalk.red("solution failed") +
          chalk.dim(` (found: ${format(answer)}, need: ${format(part.answer)})`)
      )
    addBenchmark(
      this.year,
      this.day,
      part.part as 1 | 2,
      duration,
      options.benchmark.replace
    )
    if (options.verbose)
      console.log(
        `${chalk.green("    ✔ ")}answer: ${format(answer)} (${chalk.magenta(
          ms(duration)
        )})`
      )
  }

  private async measure(part: Solution, options: RunOptions) {
    // Wrap the solver for performance measurment
    const wrapped = performance.timerify(() => part(this.input))

    // Run warmup runs
    for (let run = 0; run < options.benchmark.warmup; run++) await wrapped()

    // Create performance observer to measure timing
    let duration = 0
    const obs = new PerformanceObserver((list) => {
      duration += list.getEntries()[0].duration
    })
    obs.observe({ entryTypes: ["function"], buffered: false })

    // Run the solver multiple times
    const start = performance.now()
    let runs = 0
    let answer
    while (
      runs++ < options.benchmark.minRuns ||
      performance.now() - start < options.benchmark.minTime
    ) {
      answer = await wrapped()
    }
    obs.disconnect()

    return { answer, duration: duration / runs }
  }
}
