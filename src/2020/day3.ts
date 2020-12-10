import { Input, Solution } from "adventofcode-ts"

function findTrees(grid: string[], right: number, down: number) {
  let [x, y, trees] = [0, 0, 0]
  while (y < grid.length) {
    if (grid[y][x] == "#") trees++
    x = (x + right) % grid[0].length
    y += down
  }
  return trees
}

export const part1: Solution = (input: Input) => {
  return findTrees(input.strings(), 3, 1)
}
part1.examples = [
  [
    `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`,
    7,
  ],
]
part1.answer = 164

export const part2: Solution = (input: Input) => {
  const grid = input.strings()
  return (
    findTrees(grid, 1, 1) *
    findTrees(grid, 3, 1) *
    findTrees(grid, 5, 1) *
    findTrees(grid, 7, 1) *
    findTrees(grid, 1, 2)
  )
}
part2.examples = [[part1.examples[0][0], 336]]
part2.answer = 5007658656
