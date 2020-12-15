import { Input, Solution } from "../util"

export const part1: Solution = (input: Input) => {
  return game(input, 2020)
}
part1.examples = [
  ["0,3,6", 436],
  ["1,3,2", 1],
  ["2,1,3", 10],
  ["2,3,1", 78],
  ["3,1,2", 1836],
]
part1.answer = 273

export const part2: Solution = (input: Input) => {
  return game(input, 30000000)
}
part2.examples = []
part2.answer = 47205

function game(input: Input, turns: number) {
  const numbers = [...input.numbers(",")]
  const spoken = new Int32Array(turns)
  let turn = 1
  let last = 0
  for (const n of numbers) {
    last = n
    spoken[last] = turn++
  }
  while (turn <= turns) {
    const index = spoken[last]
    const n = index == 0 ? 0 : turn - index - 1
    spoken[last] = turn++ - 1
    last = n
  }
  return last
}
