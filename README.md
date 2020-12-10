# Advent of Code 2020 :santa: :christmas_tree: :snowman: :sparkles: 

[Advent of Code 2020](https://adventofcode.com/2020) using TypeScript.

My personal goal for this year is to solve all puzzles within **25ms** total, so an average of **1ms** per puzzle.

## :rocket: Usage

There's no need to *build* anything. Source files are transpiled and cached on-the-fly using [esbuild-runner](https://github.com/folke/esbuild-runner/) with pretty much **zero overhead**.

Running the code for a certain day, will:
* test any examples for each part
* test the answer (if availble) for each part
* measure the performance and update the benchmark section of this readme

```shell
$ bin/aoc --help
Usage: aoc [options] [day]

  --year [year] Defaults to 2020       
  --bench       Benchmark the solutions for all days
  --help|-h     Display this help message
```

To run all days:

```shell
$ bin/aoc
```

To run a specific day:

```shell
$ bin/aoc 3
```

To run the benchmarks:

```shell
$ bin/aoc --bench
```

> if a day has not been implemented yet, executing that day will create a new `src/day??.ts` file based on the [template](src/day.template.ts)






## :zap: Benchmark

<!-- RESULTS:BEGIN -->
| 2020                          | Part1  | Part2  | Total    | Days Total | Stars         |
| ----------------------------- | ------ | ------ | -------- | ---------- | ------------- |
| [Day 1](./src/2020/day1.ts)   | 0.03ms | 0.21ms | ⚡️ 0.23ms | 0.23ms     | :star: :star: |
| [Day 2](./src/2020/day2.ts)   | 0.37ms | 0.21ms | ⚡️ 0.58ms | 0.82ms     | :star: :star: |
| [Day 3](./src/2020/day3.ts)   | 0.01ms | 0.02ms | ⚡️ 0.04ms | 0.86ms     | :star: :star: |
| [Day 4](./src/2020/day4.ts)   | 0.81ms | 0.93ms | ❗️ 1.74ms | 2.59ms     | :star: :star: |
| [Day 5](./src/2020/day5.ts)   | 0.65ms | 0.68ms | ❗️ 1.33ms | 3.92ms     | :star: :star: |
| [Day 6](./src/2020/day6.ts)   | 0.14ms | 0.14ms | ⚡️ 0.28ms | 4.2ms      | :star: :star: |
| [Day 7](./src/2020/day7.ts)   | 1.03ms | 0.81ms | ❗️ 1.84ms | 6.04ms     | :star: :star: |
| [Day 8](./src/2020/day8.ts)   | 0.16ms | 0.21ms | ⚡️ 0.37ms | 6.41ms     | :star: :star: |
| [Day 9](./src/2020/day9.ts)   | 0.13ms | 0.09ms | ⚡️ 0.22ms | 6.63ms     | :star: :star: |
| [Day 10](./src/2020/day10.ts) | 0.02ms | 0.03ms | ⚡️ 0.05ms | 6.68ms     | :star: :star: |

| 2015                        | Part1  | Part2  | Total    | Days Total | Stars         |
| --------------------------- | ------ | ------ | -------- | ---------- | ------------- |
| [Day 1](./src/2015/day1.ts) | 0.08ms | 0.01ms | ⚡️ 0.09ms | 0.09ms     | :star: :star: |
<!-- RESULTS:END -->

