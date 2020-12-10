import { Input, Solution } from "../util"

function traceWire(wire: string) {
  const ret: string[] = []
  const steps = wire.split(",")
  let x = 0,
    y = 0
  for (const step of steps) {
    const dir = step.slice(0, 1)
    const count = Number.parseInt(step.slice(1))
    for (let c = 0; c < count; c++) {
      if (dir === "U") y++
      else if (dir === "D") y--
      else if (dir === "R") x++
      else if (dir === "L") x--
      ret.push(`${x} ${y}`)
    }
  }
  return ret
}

function load(input: Input) {
  const [data1, data2] = input.strings()
  const w1 = traceWire(data1)
  const w2 = traceWire(data2)
  const s = new Set(w2)
  const intersection = w1.filter((x) => s.has(x))
  return { intersection, w1, w2 }
}

export const part1: Solution = (input: Input) => {
  const { intersection } = load(input)

  let shortest = -1
  intersection.forEach((p) => {
    const coord = p.split(" ").map((x) => Number.parseInt(x, 10))
    const d = Math.abs(coord[0]) + Math.abs(coord[1])
    if (shortest == -1 || d < shortest) shortest = d
  })
  return shortest
}
part1.examples = []
part1.answer = 266

export const part2: Solution = (input: Input) => {
  const { intersection, w1, w2 } = load(input)

  let shortest = -1
  intersection.forEach((p) => {
    const d = w1.findIndex((x) => x == p) + w2.findIndex((x) => x == p) + 2
    if (shortest == -1 || d < shortest) shortest = d
  })
  return shortest
}
part2.examples = []
part2.answer = 19242
