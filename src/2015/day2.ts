import { Input, Solution } from "../util"

function paper(l: number, w: number, h: number) {
  const sides = [l * w, l * h, w * h]
  return Math.min(...sides) + 2 * sides[0] + 2 * sides[1] + 2 * sides[2]
}

export const part1: Solution = (input: Input) => {
  return input
    .strings()
    .map((line) => line.split("x").map((x) => +x) as [number, number, number])
    .map((dim) => paper(...dim))
    .reduce((a, b) => a + b)
}
part1.examples = [
  ["2x3x4", 58],
  ["1x1x10", 43],
]
part1.answer = 1598415

function ribbon(l: number, w: number, h: number) {
  const dim = [l, h, w].sort((a, b) => a - b)
  return dim[0] * 2 + dim[1] * 2 + dim[0] * dim[1] * dim[2]
}

export const part2: Solution = (input: Input) => {
  return input
    .strings()
    .map((line) => line.split("x").map((x) => +x) as [number, number, number])
    .map((dim) => ribbon(...dim))
    .reduce((a, b) => a + b)
}
part2.examples = [
  ["2x3x4", 34],
  ["1x1x10", 14],
]
part2.answer = 3812909
