import { Input, Solution } from "../util"

export const part1: Solution = (input: Input) => {
  let grid = input.grid().clone(false)
  let edits = grid.clone(false)

  let rounds = 0
  let changes = 0
  do {
    changes = 0
    grid.forEach((cell: string, x: number, y: number) => {
      if (cell == ".") return
      let occupied = 0
      for (const [adj] of grid.adjacent(x, y)) {
        if (adj == "#") occupied++
      }

      let newCell = cell
      if (cell == "L" && !occupied) newCell = "#"
      else if (cell == "#" && occupied >= 4) newCell = "L"

      if (cell != newCell) changes++
      edits.set(x, y, newCell)
    })
    const tmp = grid
    grid = edits
    edits = tmp
    // console.log(grid)
    rounds++
  } while (changes)
  let occupied = 0
  edits.forEach((v) => {
    if (v == "#") occupied++
  })
  return occupied
}
part1.examples = [
  [
    `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`,
    37,
  ],
]
part1.answer = 2418

export const part2: Solution = (input: Input) => {
  let grid = input.grid().clone(false)

  function* adjacent(x: number, y: number) {
    for (const dx of [-1, 0, +1]) {
      for (const dy of [-1, 0, +1]) {
        if (dx == 0 && dy == 0) continue
        let [xx, yy] = [x + dx, y + dy]
        while (grid.validXY(xx, yy)) {
          if (grid.get(xx, yy) != ".") {
            yield [xx, yy] as [number, number]
            break
          }
          xx += dx
          yy += dy
        }
      }
    }
  }
  const visible = new Map<string, [number, number][]>()
  grid.forEach((v, x, y) => {
    if (v !== ".") {
      visible.set(`${x}-${y}`, [...adjacent(x, y)])
    }
  })
  let edits = grid.clone(false)
  grid.options.inspect.joinRows = true
  edits.options.inspect.joinRows = true

  let rounds = 0
  let changes = 0
  do {
    changes = 0
    grid.forEach((cell: string, x: number, y: number) => {
      if (cell == ".") return cell
      let occupied = 0
      for (const [xx, yy] of visible.get(`${x}-${y}`) ?? []) {
        const adj = grid.get(xx, yy)
        if (adj == "#") occupied++
      }
      let newCell = cell
      if (cell == "L" && !occupied) newCell = "#"
      else if (cell == "#" && occupied >= 5) newCell = "L"

      if (cell != newCell) changes++
      edits.set(x, y, newCell)
    })
    const tmp = grid
    grid = edits
    edits = tmp
    // console.log({ rounds, changes })
    rounds++
    // console.log(grid)
  } while (changes)
  let occupied = 0
  grid.forEach((v) => {
    if (v == "#") occupied++
  })
  return occupied
}
part2.examples = [[part1.examples[0][0], 26]]
part2.answer = 2144
