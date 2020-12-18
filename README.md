# Advent of Code 2020 :santa: :christmas_tree: :snowman: :sparkles: 

[Advent of Code](https://adventofcode.com/) using TypeScript.

There's no need to *build* anything. Source files are transpiled and cached on-the-fly using [esbuild-runner](https://github.com/folke/esbuild-runner/) with pretty much **zero overhead**. Running the code for a certain day, will:

* download the input if needed
* test any examples for each part
* test the answer (if availble) for each part
* measure the performance and update the benchmark section of this readme

## :zap: Benchmark

~~My personal goal for this year is to solve all puzzles within **25ms** total, so an average of **1ms** per puzzle.~~
> **edit:** never mind 😂

<!-- RESULTS:BEGIN -->
### :snowflake: 2020
|[2020](./src/2020) | Part1 | Part2 | Total | Days Total | Stars|
|--- | --- | --- | --- | --- | ---|
|[Day 1](./src/2020/day1.ts) | 12µs | 196µs | ⚡️ 208µs | 208µs | :star: :star: |
|[Day 2](./src/2020/day2.ts) | 320µs | 175µs | ⚡️ 496µs | 703µs | :star: :star: |
|[Day 3](./src/2020/day3.ts) | 3µs | 15µs | ⚡️ 18µs | 721µs | :star: :star: |
|[Day 4](./src/2020/day4.ts) | 302µs | 429µs | ⚡️ 730µs | 1.45ms | :star: :star: |
|[Day 5](./src/2020/day5.ts) | 362µs | 356µs | ⚡️ 718µs | 2.17ms | :star: :star: |
|[Day 6](./src/2020/day6.ts) | 131µs | 143µs | ⚡️ 274µs | 2.44ms | :star: :star: |
|[Day 7](./src/2020/day7.ts) | 573µs | 392µs | ⚡️ 965µs | 3.41ms | :star: :star: |
|[Day 8](./src/2020/day8.ts) | 100µs | 144µs | ⚡️ 244µs | 3.65ms | :star: :star: |
|[Day 9](./src/2020/day9.ts) | 93µs | 47µs | ⚡️ 141µs | 3.79ms | :star: :star: |
|[Day 10](./src/2020/day10.ts) | 14µs | 23µs | ⚡️ 37µs | 3.83ms | :star: :star: |
|[Day 11](./src/2020/day11.ts) | 32.43ms | 55.86ms | ❗️ 88.29ms | 92.12ms | :star: :star: |
|[Day 12](./src/2020/day12.ts) | 23µs | 26µs | ⚡️ 50µs | 92.17ms | :star: :star: |
|[Day 13](./src/2020/day13.ts) | 4µs | 19µs | ⚡️ 23µs | 92.19ms | :star: :star: |
|[Day 14](./src/2020/day14.ts) | 632µs | 6.97ms | ❗️ 7.6ms | 99.79ms | :star: :star: |
|[Day 15](./src/2020/day15.ts) | 10µs | 683.67ms | ❗️ 683.67ms | 783.47ms | :star: :star: |
|[Day 16](./src/2020/day16.ts) | 554µs | 1.26ms | ❗️ 1.81ms | 785.28ms | :star: :star: |
|[Day 17](./src/2020/day17.ts) | 41.86ms | 1359.56ms | ❗️ 1401.42ms | 2186.7ms | :star: :star: |
|[Day 18](./src/2020/day18.ts) | 1.91ms | 1.91ms | ❗️ 3.82ms | 2190.52ms | :star: :star: |

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
