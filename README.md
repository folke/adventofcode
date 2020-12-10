# Advent of Code 2020 :santa: :christmas_tree: :snowman: :sparkles: 

[Advent of Code](https://adventofcode.com/) using TypeScript.

There's no need to *build* anything. Source files are transpiled and cached on-the-fly using [esbuild-runner](https://github.com/folke/esbuild-runner/) with pretty much **zero overhead**. Running the code for a certain day, will:

* download the input if needed
* test any examples for each part
* test the answer (if availble) for each part
* measure the performance and update the benchmark section of this readme

## :zap: Benchmark

My personal goal for this year is to solve all puzzles within **25ms** total, so an average of **1ms** per puzzle.

<!-- RESULTS:BEGIN -->
### :snowflake: 2020
|[2020](./src/2020) | Part1 | Part2 | Total | Days Total | Stars|
|--- | --- | --- | --- | --- | ---|
|[Day 1](./src/2020/day1.ts) | 12µs | 190µs | ⚡️ 202µs | 202µs | :star: :star: |
|[Day 2](./src/2020/day2.ts) | 315µs | 172µs | ⚡️ 487µs | 689µs | :star: :star: |
|[Day 3](./src/2020/day3.ts) | 3µs | 15µs | ⚡️ 17µs | 706µs | :star: :star: |
|[Day 4](./src/2020/day4.ts) | 297µs | 425µs | ⚡️ 723µs | 1.43ms | :star: :star: |
|[Day 5](./src/2020/day5.ts) | 346µs | 330µs | ⚡️ 676µs | 2.1ms | :star: :star: |
|[Day 6](./src/2020/day6.ts) | 128µs | 141µs | ⚡️ 269µs | 2.37ms | :star: :star: |
|[Day 7](./src/2020/day7.ts) | 585µs | 387µs | ⚡️ 972µs | 3.35ms | :star: :star: |
|[Day 8](./src/2020/day8.ts) | 97µs | 141µs | ⚡️ 238µs | 3.58ms | :star: :star: |
|[Day 9](./src/2020/day9.ts) | 94µs | 47µs | ⚡️ 141µs | 3.72ms | :star: :star: |
|[Day 10](./src/2020/day10.ts) | 14µs | 23µs | ⚡️ 37µs | 3.76ms | :star: :star: |

### :snowflake: 2019
|[2019](./src/2019) | Part1 | Part2 | Total | Days Total | Stars|
|--- | --- | --- | --- | --- | ---|
|[Day 1](./src/2019/day1.ts) | 3µs | 10µs | ⚡️ 13µs | 13µs | :star: :star: |
|[Day 3](./src/2019/day3.ts) | 58.98ms | 114.56ms | ❗️ 173.54ms | 173.55ms | :star: :star: |
|[Day 4](./src/2019/day4.ts) | 6.66ms | 6.29ms | ❗️ 12.95ms | 186.5ms | :star: :star: |

### :snowflake: 2015
|[2015](./src/2015) | Part1 | Part2 | Total | Days Total | Stars|
|--- | --- | --- | --- | --- | ---|
|[Day 1](./src/2015/day1.ts) | 85µs | 9µs | ⚡️ 95µs | 95µs | :star: :star: |
|[Day 2](./src/2015/day2.ts) | 611µs | 785µs | ❗️ 1.4ms | 1.49ms | :star: :star: |
|[Day 3](./src/2015/day3.ts) | 263µs | 282µs | ⚡️ 545µs | 2.04ms | :star: :star: |
|[Day 4](./src/2015/day4.ts) | 592.43ms | 18805.74ms | ❗️ 19398.16ms | 19400.2ms | :star: :star: |
|[Day 5](./src/2015/day5.ts) | 394µs | 703µs | ❗️ 1.1ms | 19401.3ms | :star: :star: |
<!-- RESULTS:END -->

## :rocket: Usage

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
