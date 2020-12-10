import { Input, Solution } from "../util"

function decode(pass: string): number {
  const row = Number.parseInt(pass.slice(0, 7), 2)
  const col = Number.parseInt(pass.slice(7), 2)
  return row * 8 + col
}

function getPasses(input: Input) {
  const passes = new Set<number>()
  let pass = ""
  for (const c of input.data) {
    if (c == "\n") {
      passes.add(decode(pass))
      pass = ""
    } else pass += c == "F" || c == "L" ? "0" : "1"
  }
  if (pass.length) passes.add(decode(pass))
  return passes
}

export const part1: Solution = (input: Input) => {
  return Math.max(...getPasses(input))
}
part1.examples = [
  [`BFFFBBFRRR`, 567],
  [`FFFBBBFRRR`, 119],
  [`BBFFBBFRLL`, 820],
]
part1.answer = 838

export const part2: Solution = (input: Input) => {
  const ids = getPasses(input)

  let foundExisting = false
  for (let id = 0; id <= 127 * 8; id++) {
    if (ids.has(id)) foundExisting = true
    else if (foundExisting) return id
  }
}
part2.examples = []
part2.answer = 714
