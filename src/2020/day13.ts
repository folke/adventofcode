import { Input, Solution } from "../util"

export const part1: Solution = (input: Input) => {
  const lines = input.strings()
  const earliest = +lines[0]
  const busses = lines[1]
    .split(",")
    .filter((x) => x != "x")
    .map((x) => +x)

  let quickest: [number, number] = [0, 0]
  for (const bus of busses) {
    const wait = bus - (earliest % bus)
    if (quickest[0] == 0 || wait < quickest[1]) quickest = [bus, wait]
  }

  return quickest[0] * quickest[1]
}
part1.examples = [
  [
    `939
7,13,x,x,59,x,31,19`,
    295,
  ],
]
part1.answer = 1915

function invmod(a: bigint, b: bigint) {
  const b0 = b
  let [x0, x1] = [0n, 1n]
  if (b == 1n) return 1n
  while (a > 1) {
    const q = (a - (a % b)) / b
    ;[a, b] = [b, a % b]
    ;[x0, x1] = [x1 - q * x0, x0]
  }
  return x1 < 0 ? x1 + b0 : x1
}

/**
 * Based on http://rosettacode.org/wiki/Chinese_remainder_theorem (python implementation)
 * solve a system of linear congruences by applying the Chinese Remainder Theorem
 */
function crt(remainders: bigint[], modulos: bigint[]) {
  const prod = modulos.reduce((a, b) => a * b)
  let sum = 0n
  for (const [i, modulo] of modulos.entries())
    sum = sum + (remainders[i] * invmod(prod / modulo, modulo) * prod) / modulo
  return sum % prod
}

export const part2: Solution = (input: Input) => {
  const busses: { bus: bigint; offset: bigint }[] = []
  input
    .strings()[1]
    .split(",")
    .forEach((bus, offset) => {
      if (bus !== "x") busses.push({ bus: BigInt(bus), offset: BigInt(offset) })
    })

  return crt(
    busses.map((bus) => bus.bus - bus.offset),
    busses.map((bus) => bus.bus)
  )
}
part2.examples = [
  [part1.examples[0][0], 1068781],
  [
    `1
    67,7,59,61`,
    754018,
  ],
  [
    `1
17,x,13,19`,
    3417,
  ],
  [
    `1
1789,37,47,1889`,
    1202161486,
  ],
]
part2.answer = 294354277694107n
