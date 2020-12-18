import { Input, Solution } from "../util"

type Position = Int8Array

function solve(input: Input, order: number, cycles: number) {
  const slice = input.grid()
  let pocket = new Set<string>()
  let edits = new Set<string>()

  function newPosition() {
    return new Int8Array(order)
  }

  slice.forEach((value, x, y) => {
    const pos = newPosition()
    pos[0] = x
    pos[1] = y
    if (value == "#") {
      pocket.add(pos.toString())
      edits.add(pos.toString())
    }
  })
  const dims: [number, number][] = []
  for (let dim = 0; dim < order; dim++) dims.push([0, 0])

  function* neighbours(pos: Position = newPosition(), dim = 0, zero = true): Generator<Position, void> {
    if (dim == order) {
      if (!zero) yield pos.slice()
      return
    }
    const v = pos[dim]
    yield* neighbours(pos, dim + 1, zero && true)
    pos[dim] = v - 1
    yield* neighbours(pos, dim + 1, false)
    pos[dim] = v + 1
    yield* neighbours(pos, dim + 1, false)
    pos[dim] = v
  }

  const around = [...neighbours()]

  function check(pos: Position) {
    let activeNeighbours = 0
    for (const a of around) {
      for (let d = 0; d < order; d++) pos[d] += a[d]
      const active = pocket.has(pos.join(","))
      for (let d = 0; d < order; d++) pos[d] -= a[d]
      if (active) activeNeighbours++
      if (activeNeighbours > 3) break
    }

    const key = pos.join(",")
    const isActive = pocket.has(key)
    if (isActive) {
      if (activeNeighbours == 2 || activeNeighbours == 3) edits.add(key)
      else edits.delete(key)
    } else {
      if (activeNeighbours == 3) edits.add(key)
      else edits.delete(key)
    }
  }

  function loop(dim = 0, pos = newPosition()) {
    for (let d = dims[dim][0] - 1; d <= dims[dim][1] + 1; d++) {
      pos[dim] = d
      if (dim < order - 1) loop(dim + 1, pos)
      else if (dim == order - 1) check(pos)
    }
  }

  function expand() {
    for (const dd of dims) {
      dd[0] = 0
      dd[1] = 0
    }
    for (const key of pocket) {
      const pos = key.split(",").map((x) => +x)
      for (let d = 0; d < order; d++) {
        if (pos[d] < dims[d][0]) dims[d][0] = pos[d]
        if (pos[d] > dims[d][1]) dims[d][1] = pos[d]
      }
    }
  }

  for (let cycle = 0; cycle < cycles; cycle++) {
    edits = new Set<string>()
    expand()
    loop()
    pocket = edits
    const size = dims.map((d) => d[1] - d[0] + 1).reduce((a, b) => a * b, 1)
    console.log({ size, active: pocket.size })
  }

  return pocket.size
}

export const part1: Solution = (input: Input) => {
  return solve(input, 3, 6)
}
part1.examples = [
  [
    `.#.
..#
###`,
    112,
  ],
]
part1.answer = 372

export const part2: Solution = (input: Input) => {
  return solve(input, 4, 6)
}
part2.examples = [[part1.examples[0][0], 848]]
part2.answer = 1896
