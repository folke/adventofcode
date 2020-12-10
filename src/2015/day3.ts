import { Input, Solution } from "../util"

function move(move: string, loc: number[]) {
  switch (move) {
    case ">":
      loc[0]++
      break

    case "<":
      loc[0]--
      break

    case "^":
      loc[1]++
      break

    case "v":
      loc[1]--
      break
  }
  return loc[0] + loc[1] * 100000
}

export const part1: Solution = (input: Input) => {
  const loc = [0, 0]
  const visited = new Set<number>()
  visited.add(move("", loc))
  for (let i = 0; i < input.data.length; i++) {
    visited.add(move(input.data.charAt(i), loc))
  }
  return visited.size
}
part1.examples = [
  [">", 2],
  ["^>v<", 4],
  ["^v^v^v^v^v", 2],
]
part1.answer = 2565

export const part2: Solution = (input: Input) => {
  const santa = [0, 0]
  const robot = [0, 0]
  const visited = new Set<number>()
  visited.add(move("", santa))
  for (let i = 0; i < input.data.length; i += 2) {
    visited.add(move(input.data.charAt(i), santa))
    visited.add(move(input.data.charAt(i + 1), robot))
  }
  return visited.size
}
part2.examples = [
  ["^>", 3],
  ["^>v<", 3],
  ["^v^v^v^v^v", 11],
]
part2.answer = 2639
