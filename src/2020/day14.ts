import { Input, Solution } from "../util"

export const part1: Solution = (input: Input) => {
  let mask: [bigint, bigint] = [0n, 0n]
  const memory = new Map<number, bigint>()
  for (const line of input.strings()) {
    if (line.startsWith("mask")) {
      mask = [0n, 0n]
      for (let i = 7; i < line.length; i++) {
        if (line[i] == "0") mask[1] |= 1n << BigInt(line.length - i - 1)
        else if (line[i] == "1") mask[0] |= 1n << BigInt(line.length - i - 1)
      }
    } else {
      const open = line.indexOf("[")
      const close = line.indexOf("]")
      const mem = +line.slice(open + 1, close)
      let value = BigInt(line.slice(close + 4))
      value |= mask[0]
      value &= ~mask[1]
      memory.set(mem, value)
    }
  }
  return [...memory.values()].reduce((a, b) => a + b)
}
part1.examples = [
  [
    `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`,
    165,
  ],
]
part1.answer = 11884151942312n

export const part2: Solution = (input: Input) => {
  let mask: [bigint, bigint][] = []
  const memory = new Map<bigint, bigint>()
  for (const line of input.strings()) {
    if (line.startsWith("mask")) {
      mask = [[0n, 0n]]
      for (let i = 7; i < line.length; i++) {
        if (line[i] == "0") continue
        else if (line[i] == "1") {
          for (let m = 0; m < mask.length; m++)
            mask[m][0] |= 1n << BigInt(line.length - i - 1)
        } else {
          // X
          const len = mask.length
          // set bits for 1
          for (let m = 0; m < len; m++)
            mask.push([
              mask[m][0] | (1n << BigInt(line.length - i - 1)),
              mask[m][1],
            ])
          // set clear bits for 0
          for (let m = 0; m < len; m++)
            mask[m][1] |= 1n << BigInt(line.length - i - 1)
        }
      }
    } else {
      const open = line.indexOf("[")
      const close = line.indexOf("]")
      const mem = BigInt(line.slice(open + 1, close))
      const value = BigInt(line.slice(close + 4))
      for (const m of mask) {
        let mm = mem
        mm |= m[0]
        mm &= ~m[1]
        memory.set(mm, value)
      }
    }
  }
  return [...memory.values()].reduce((a, b) => a + b)
}
part2.examples = [
  [
    `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`,
    208,
  ],
]
part2.answer = 2625449018811n
