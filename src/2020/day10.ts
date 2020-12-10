import { Input, Solution } from "adventofcode-ts"

export const part1: Solution = (input: Input) => {
  const adapters = input.numbers().sort((a, b) => a - b)

  const diff = [0, 0, 0, 0]
  for (let a = 0; a < adapters.length; a++)
    diff[adapters[a] - (adapters[a - 1] ?? 0)]++
  return (diff[3] + 1) * diff[1]
}
part1.examples = [
  [
    `16
10
15
5
1
11
7
19
6
12
4`,
    35,
  ],
  [
    `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`,
    220,
  ],
]
part1.answer = 2312

const cache = new Map<number, number>()
function pathCount(adapters: number[], from: number): number {
  if (cache.has(from)) return cache.get(from) as number
  let paths = 0
  for (
    let next = from + 1;
    next < adapters.length && adapters[next] - adapters[from] <= 3;
    next++
  ) {
    paths += pathCount(adapters, next)
  }
  paths ||= 1
  cache.set(from, paths)
  return paths
}

export const part2: Solution = (input: Input) => {
  const adapters = input.numbers().sort((a, b) => a - b)
  adapters.unshift(0)
  adapters.push(adapters[adapters.length - 1] + 3)
  cache.clear()
  return pathCount(adapters, 0)
}
part2.examples = [
  [part1.examples[0][0], 8],
  [part1.examples[1][0], 19208],
]
part2.answer = 12089663946752
