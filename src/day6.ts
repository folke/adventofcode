import { Input, Solution } from "./util"

export const part1: Solution = (input: Input) => {
  let sum = 0
  for (const group of input.strings("\n\n")) {
    const answers = new Set(group.replace(/\n/gu, ""))
    sum += answers.size
  }
  return sum
}
part1.examples = [
  [
    `abc

a
b
c

ab
ac

a
a
a
a

b`,
    11,
  ],
]
part1.answer = 7128

export const part2: Solution = (input: Input) => {
  let sum = 0
  for (const group of input.strings("\n\n")) {
    const answers = group.split("\n").map((aa) => new Set(aa))
    sum += answers.reduce((prev, current) => {
      for (const p of prev) {
        if (!current.has(p)) prev.delete(p)
      }
      return prev
    }).size
  }
  return sum
}
part2.examples = [[part1.examples[0][0], 6]]
part2.answer = 3640
