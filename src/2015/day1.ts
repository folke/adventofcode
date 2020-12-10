import { Input, Solution } from "../util"

export const part1: Solution = (input: Input) => {
  let ret = 0
  for (const c of input.data) {
    if (c == "(") ret++
    else ret--
  }
  return ret
}
part1.examples = []
part1.answer = 280

export const part2: Solution = (input: Input) => {
  let ret = 0
  for (let i = 0; i < input.data.length; i++) {
    const c = input.data[i]
    if (c == "(") ret++
    else ret--
    if (ret == -1) return i + 1
  }
  return ret
}
part2.examples = [["()())", 5]]
part2.answer = 1797
