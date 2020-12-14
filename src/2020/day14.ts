/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
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
      const address = +line.slice(open + 1, close)
      let value = BigInt(line.slice(close + 4))
      value |= mask[0]
      value &= ~mask[1]
      memory.set(address, value)
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

type MemoryNode = [
  MemoryNode | undefined,
  MemoryNode | undefined,
  MemoryNode | undefined
]

function memcopy(node: MemoryNode): MemoryNode {
  if (!Array.isArray(node)) return node
  const ret: MemoryNode = [undefined, undefined, undefined]
  if (node[0]) ret[0] = memcopy(node[0])
  if (node[1]) ret[1] = memcopy(node[1])
  if (node[2]) ret[2] = memcopy(node[2])
  return ret
}

function memset(
  node: MemoryNode,
  mask: string,
  address: string,
  bit: number,
  value: bigint
) {
  // abuse [0] as the bigint value at depth 36
  // @ts-ignore
  if (bit == 36) node[0] = value
  else if (mask[bit] == "X") {
    if (node[1] || node[0]) {
      if (!node[1]) node[1] = [undefined, undefined, undefined]
      if (!node[0]) node[0] = [undefined, undefined, undefined]
      memset(node[1], mask, address, bit + 1, value)
      memset(node[0], mask, address, bit + 1, value)
    } else {
      if (!node[2]) node[2] = [undefined, undefined, undefined]
      memset(node[2], mask, address, bit + 1, value)
    }
  } else {
    if (node[2]) {
      node[1] = node[2]
      node[0] = memcopy(node[2])
      node[2] = undefined
    }
    if (mask[bit] == "1") {
      if (!node[1]) node[1] = [undefined, undefined, undefined]
      memset(node[1], mask, address, bit + 1, value)
    } else if (mask[bit] == "0") {
      const child = address[bit] == "0" ? 0 : 1
      if (!node[child]) node[child] = [undefined, undefined, undefined]
      memset(node[child]!, mask, address, bit + 1, value)
    }
  }
}

function memsum(node: MemoryNode, depth = 0): bigint {
  if (depth == 36) return (node[0] as unknown) as bigint
  if (node[2]) return 2n * memsum(node[2], depth + 1)
  return (
    (node[0] ? memsum(node[0], depth + 1) : 0n) +
    (node[1] ? memsum(node[1], depth + 1) : 0n)
  )
}

export const part2: Solution = (input: Input) => {
  let mask = ""
  const memory: MemoryNode = [undefined, undefined, undefined]
  for (const line of input.strings()) {
    if (line.startsWith("mask")) {
      mask = line.slice(7)
    } else {
      const open = line.indexOf("[")
      const close = line.indexOf("]")
      const mem = +line.slice(open + 1, close)
      const value = BigInt(line.slice(close + 4))
      memset(memory, mask, mem.toString(2).padStart(36, "0"), 0, value)
    }
  }
  return memsum(memory)
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
