import { Input, Solution } from "./util"

export const part1: Solution = (input: Input) => {
  const a = "a".charCodeAt(0)
  let sum = 0

  const answers: number[] = []
  for (let i = 0; i < 26; i++) answers[i] = 0

  for (let c = 0; c < input.data.length; c++) {
    if (input.data[c] === "\n") {
      if (c - 1 > 0 && input.data[c - 1] === "\n") {
        for (let i = 0; i < answers.length; i++) answers[i] = 0
      }
    } else if (answers[input.data.charCodeAt(c) - a]++ == 0) sum++
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

b
`,
    11,
  ],
]
part1.answer = 7128

export const part2: Solution = (input: Input) => {
  const a = "a".charCodeAt(0)
  let [sum, groupSize] = [0, 0]

  const answers: number[] = []
  for (let i = 0; i < 26; i++) answers[i] = 0

  for (let c = 0; c < input.data.length; c++) {
    if (input.data[c] === "\n") {
      if (c - 1 > 0 && input.data[c - 1] === "\n") {
        for (let i = 0; i < answers.length; i++) {
          if (answers[i] === groupSize) sum++
          answers[i] = 0
        }
        groupSize = 0
      } else groupSize++
    } else answers[input.data.charCodeAt(c) - a]++
  }

  for (const answer of answers) if (answer === groupSize) sum++
  return sum
}
part2.examples = [[part1.examples[0][0], 6]]
part2.answer = 3640
