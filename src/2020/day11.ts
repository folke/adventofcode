import { Input, Solution } from "../util"
import { Grid, ReadonlyGrid } from "../util/grid"

enum GridSymbol {
  floor = 0,
  free,
  occupied,
}

export const part1: Solution = (input: Input) => {
  function* seats(x: number, y: number, grid: ReadonlyGrid<string>) {
    for (const [v, xx, yy] of grid.adjacent(x, y)) {
      if (v !== ".") yield [xx, yy] as [number, number]
    }
  }
  return automata(input, 4, seats)
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
  function* seats(x: number, y: number, grid: ReadonlyGrid<string>) {
    for (const dx of [-1, 0, +1]) {
      for (const dy of [-1, 0, +1]) {
        if (dx == 0 && dy == 0) continue
        let [xx, yy] = [x + dx, y + dy]
        while (grid.valid(xx, yy)) {
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
  return automata(input, 5, seats)
}
part2.examples = [[part1.examples[0][0], 26]]
part2.answer = 2144

function automata(
  input: Input,
  minimumOccupied: number,
  adjacentSeats: (
    x: number,
    y: number,
    grid: ReadonlyGrid<string>
  ) => Generator<[number, number], void, unknown>
) {
  const inputGrid = input.grid()

  const visible = new Map<number, [number, number][]>()

  let grid: Grid<GridSymbol> = inputGrid.map((v, x, y) => {
    if (v == ".") return GridSymbol.floor
    else {
      visible.set(x + y * inputGrid.width, [...adjacentSeats(x, y, inputGrid)])
      return GridSymbol.free
    }
  })

  let edits = new Grid(new Int8Array(grid.width * grid.height), grid.width)

  const seats = new Set<number>()
  grid.forEach((cell, _x, _y, index) => {
    if (cell !== GridSymbol.floor) seats.add(index)
  })

  let changes = 0
  do {
    changes = 0
    for (const index of seats) {
      const [x, y] = grid.cell(index)
      const cell = grid.data[index]
      if (cell == GridSymbol.floor) return

      let occupied = 0
      for (const [xx, yy] of visible.get(x + y * inputGrid.width) ?? []) {
        const adj = grid.get(xx, yy)
        if (adj == GridSymbol.occupied) occupied++
      }

      let newCell = cell
      if (cell == GridSymbol.free && !occupied) newCell = GridSymbol.occupied
      else if (cell == GridSymbol.occupied && occupied >= minimumOccupied)
        newCell = GridSymbol.free

      if (cell != newCell) {
        changes++
      } else {
        // cell is stable for one iteration
        seats.delete(index)
      }
      edits.set(x, y, newCell)
    }
    ;[grid, edits] = [edits, grid]
  } while (changes)

  let occupied = 0
  grid.forEach((v) => {
    if (v == GridSymbol.occupied) occupied++
  })
  return occupied
}
