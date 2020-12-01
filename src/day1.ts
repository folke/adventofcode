import { Input } from "./lib/input"
import { Solution } from "./lib/day"

export const part1: Solution = (input: Input) => {
  const expenses = new Set(input.numbers())
  for (const exp of expenses) {
    if (expenses.has(2020 - exp)) return exp * (2020 - exp)
  }
}
part1.examples = [
  [
    `1721
979
366
299
675
1456`,
    514579,
  ],
]
part1.answer = 744475

export const part2: Solution = (input: Input) => {
  const expenses = input.numbers()
  const expensesSet = new Set(expenses)

  for (let ai = 0; ai < expenses.length; ai++) {
    const a = expenses[ai]
    for (let bi = ai + 1; bi < expenses.length; bi++) {
      const b = expenses[bi]
      const c = 2020 - a - b
      if (expensesSet.has(c)) {
        return a * b * c
      }
    }
  }
}
part2.examples = [[part1.examples[0][0], 241861950]]
part2.answer = 70276940
