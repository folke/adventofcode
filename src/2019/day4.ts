import { Input, Solution } from "../util"

function check(input: Input, part1 = false) {
  let possible = 0
  const [from, to] = input.numbers("-")
  for (let password = from; password <= to; password++) {
    let last = -1
    let rep = 0
    let n = password
    let adjacent = false
    let order = true
    while (n > 0) {
      const digit = n % 10
      if (last != -1 && digit > last) {
        order = false
        break
      }
      if (digit == last) {
        rep++
      } else {
        if (part1 && rep > 0) adjacent = true
        else if (rep == 1) adjacent = true
        rep = 0
      }
      last = digit
      n = (n - digit) / 10
    }
    if (part1 && rep > 0) adjacent = true
    else if (rep == 1) adjacent = true
    rep = 0
    if (adjacent && order) {
      possible++
    }
  }
  return possible
}

export const part1: Solution = (input: Input) => {
  return check(input, true)
}
part1.examples = []
part1.answer = 1694

export const part2: Solution = (input: Input) => {
  return check(input, false)
}
part2.examples = []
part2.answer = 1148
