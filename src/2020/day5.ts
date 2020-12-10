import { Input, Solution } from "adventofcode-ts"

function decode(pass: string): number {
  const row = Number.parseInt(pass.slice(0, 7), 2)
  const col = Number.parseInt(pass.slice(7), 2)
  return row * 8 + col
}

function getPasses(input: Input) {
  return input.data
    .trim()
    .replace(/F|L/gu, "0")
    .replace(/B|R/gu, "1")
    .split("\n")
}

export const part1: Solution = (input: Input) => {
  return Math.max(...getPasses(input).map((pass) => decode(pass)))
}
part1.examples = [
  [`BFFFBBFRRR`, 567],
  [`FFFBBBFRRR`, 119],
  [`BBFFBBFRLL`, 820],
]
part1.answer = 838

export const part2: Solution = (input: Input) => {
  const ids = new Set(getPasses(input).map((pass) => decode(pass)))
  let foundExisting = false
  for (let id = 0; id <= 127 * 8; id++) {
    if (ids.has(id)) foundExisting = true
    else if (foundExisting) return id
  }
}
part2.examples = []
part2.answer = 714
