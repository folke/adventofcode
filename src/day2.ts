import { Input, Solution } from "./util"

export const part1: Solution = (input: Input) => {
  const regex = /^(\d+)-(\d+) ([a-z]): ([a-z]+)$/u
  let correct = 0
  for (const line of input.strings()) {
    const m = regex.exec(line)
    if (m) {
      const [, minS, maxS, char, password] = m
      const min = +minS
      const max = +maxS
      let count = 0
      for (const c of password) {
        if (c === char) count++
        if (count > max) break
      }
      if (count >= min && count <= max) correct++
    } else throw new Error(`Invalid input ${line}`)
  }
  return correct
}
part1.examples = [
  [
    `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`,
    2,
  ],
]
part1.answer = 591

export const part2: Solution = (input: Input) => {
  const regex = /^(\d+)-(\d+) ([a-z]): ([a-z]+)$/u
  let correct = 0
  for (const line of input.strings()) {
    const m = regex.exec(line)
    if (m) {
      const [, minS, maxS, char, password] = m
      const min = +minS
      const max = +maxS
      if (
        (password.charAt(min - 1) === char) !=
        (password.charAt(max - 1) === char)
      )
        correct++
    } else throw new Error(`Invalid input ${line}`)
  }
  return correct
}
part2.examples = [[part1.examples[0][0], 1]]
part2.answer = 335
