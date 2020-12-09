import fs from "fs"
import path from "path"
import { ms } from "./format"

type Results = [number, number][]

const resultsPath = path.resolve(__dirname, "..", "..", "cache", "results.json")
let results: Results

function load() {
  if (!results) {
    try {
      results = fs.existsSync(resultsPath)
        ? (JSON.parse(
            fs.readFileSync(resultsPath, { encoding: "utf-8" })
          ) as Results)
        : []
    } catch {
      results = []
    }
  }
}

export function total(day?: number) {
  return day
    ? results[day - 1][0] + results[day - 1][1]
    : results
        .map((tt) => tt[0] + tt[1])
        .reduce((prev, current) => prev + current)
}

export function addBenchmark(
  day: number,
  part: 1 | 2,
  duration: number,
  replace = true
) {
  load()
  if (!replace && results?.[day - 1]?.[part - 1]) return
  if (!results[day - 1]) results[day - 1] = [0, 0]
  results[day - 1][part - 1] = duration
  fs.writeFileSync(resultsPath, JSON.stringify(results), { encoding: "utf-8" })
}

export function updateReadme() {
  load()
  const ret: string[][] = [
    ["Day", "Part1", "Part2", "Stars"],
    ["---", "---", "---", "---"],
  ]
  for (let d = 1; d <= 25; d++) {
    const times = results[d - 1]
    // if (!times) continue
    const row = [
      times ? `[Day ${d}](./src/day${d}.ts)` : `Day ${d}`,
      ms(times?.[0]),
      ms(times?.[1]),
      "",
    ]
    if (times?.[0]) row[3] += ":star: "
    if (times?.[1]) row[3] += ":star: "
    ret.push(row)
  }
  const table = ret.map((row) => `|${row.join(" | ")}|`).join("\n")
  const readmePath = path.resolve(__dirname, "..", "..", "README.md")
  const readme = fs
    .readFileSync(readmePath, { encoding: "utf-8" })
    .replace(
      /<!-- RESULTS:BEGIN -->[\s\S]*<!-- RESULTS:END -->/mu,
      `<!-- RESULTS:BEGIN -->\n${table}\n<!-- RESULTS:END -->`
    )
  fs.writeFileSync(readmePath, readme, { encoding: "utf-8" })
}
