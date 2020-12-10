import { Input, Solution } from "../util"

export const part1: Solution = (input: Input) => {
  return input
    .strings()
    .map(
      (line) =>
        /([aeiou].*){3}/gu.test(line) &&
        /([a-z])\1/u.test(line) &&
        !/ab|cd|pq|xy/u.test(line)
    )
    .filter((x) => x).length
}
part1.examples = [
  ["ugknbfddgicrmopn", 1],
  ["aaa", 1],
  ["jchzalrnumimnmhp", 0],
  ["haegwjzuvuyypxyu", 0],
  ["dvszwmarrgswjxmb", 0],
]
part1.answer = 255

export const part2: Solution = (input: Input) => {
  return input
    .strings()
    .map((line) => /([a-z]{2}).*\1/u.test(line) && /([a-z]).\1/u.test(line))
    .filter((x) => x).length
}
part2.examples = [
  ["qjhvhtzxzqqjkmpb", 1],
  ["xxyxx", 1],
  ["uurcxstgmygtbstg", 0],
  ["ieodomkazucvgmuy", 0],
]
part2.answer = 55
