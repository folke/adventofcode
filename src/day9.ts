import { Input, Solution } from "./lib"

export const part1: Solution = (input: Input, options = { preamble: 25 }) => {
  const numbers = input.numbers()
  const preamble = options.preamble as number

  loop: for (let n = preamble; n < numbers.length; n++) {
    const sum = numbers[n]
    for (let a = n - preamble; a < n - 1; a++) {
      for (let b = a + 1; b < n; b++) {
        if (sum == numbers[a] + numbers[b]) {
          continue loop
        }
      }
    }
    return sum
  }
}
part1.examples = [
  [
    `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`,
    127,
    { preamble: 5 },
  ],
]
part1.answer = 32321523

export const part2: Solution = (
  input: Input,
  options = { invalid: part1.answer }
) => {
  const numbers = input.numbers()
  const invalid = options.invalid as number

  let [begin, end, sum] = [0, 1, numbers[0] + numbers[1]]

  while (sum !== invalid) {
    if (sum < invalid) {
      end++
      sum += numbers[end]
    } else {
      sum -= numbers[begin]
      begin++
    }
  }
  const range = numbers.slice(begin, end + 1)
  return Math.min(...range) + Math.max(...range)
}
part2.examples = [[part1.examples[0][0], 62, { invalid: 127 }]]
part2.answer = 4794981
