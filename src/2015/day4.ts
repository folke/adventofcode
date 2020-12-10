import { Input, Solution } from "../util"
import crypto from "crypto"

function crack(input: Input, leadingZeros: number, start = 0) {
  const zero = "0".charCodeAt(0)
  const md5 = crypto.createHash("md5").update(input.data.trim())
  for (let seed = start; ; seed++) {
    const hash = md5.copy().update(seed.toString()).digest("hex")

    for (let i = 0; i < leadingZeros && hash.charCodeAt(i) == zero; i++) {
      if (i == leadingZeros - 1) return seed
    }
  }
}

export const part1: Solution = (input: Input) => {
  return crack(input, 5)
}
part1.examples = [
  ["abcdef", 609043],
  ["pqrstuv", 1048970],
]
part1.answer = 282749

export const part2: Solution = (input: Input) => {
  return crack(input, 6, part1.answer as number)
}
part2.examples = []
part2.answer = 9962624
