import { Input, Solution } from "../util"

function fuel(mass: number) {
  return Math.floor(mass / 3) - 2
}

export const part1: Solution = (input: Input) => {
  let totalFuel = 0
  input.numbers().forEach((mass) => {
    totalFuel += fuel(mass)
  })
  return totalFuel
}
part1.examples = []
part1.answer = 3394106

export const part2: Solution = (input: Input) => {
  let totalFuel = 0
  input.numbers().forEach((mass) => {
    let f = fuel(mass)
    do {
      totalFuel += f
      mass = f
      f = fuel(mass)
    } while (f > 0)
  })
  return totalFuel
}
part2.examples = []
part2.answer = 5088280
