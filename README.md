# Advent of Code 2020 :santa: :christmas_tree: :snowman: :sparkles: 

[Advent of Code 2020](https://adventofcode.com/2020) using TypeScript

## :rocket: Usage

There's no need to *build* anything. Source files are transpiled and cached on-the-fly using [esbuild-runner](https://github.com/folke/esbuild-runner/) with pretty much **zero overhead**.

Running the code for a certain day, will:
* test any examples for each part
* test the answer (if availble) for each part
* measure the performance and update the benchmark section of this readme

To run all days:

```shell
$ node .
```

To run a specific day:

```shell
$ node . 3
```

> if a day has not been implemented yet, executing that day will create a new `src/day??.ts` file based on the [template](src/day.template.ts)






## :zap: Benchmark

<!-- RESULTS:BEGIN -->
|Day | Part1 | Part2 | Stars|
|--- | --- | --- | ---|
|[Day 1](./src/day1.ts) | 0.05ms | 0.55ms | :star: :star: |
|[Day 2](./src/day2.ts) | 2.28ms | 0.68ms | :star: :star: |
|[Day 3](./src/day3.ts) | 0.05ms | 0.15ms | :star: :star: |
|[Day 4](./src/day4.ts) | 2.25ms | 2.48ms | :star: :star: |
|[Day 5](./src/day5.ts) | 1.85ms | 1.26ms | :star: :star: |
|[Day 6](./src/day6.ts) | 2.31ms | 5.1ms | :star: :star: |
|[Day 7](./src/day7.ts) | 3.16ms | 3.43ms | :star: :star: |
|Day 8 |  |  | |
|Day 9 |  |  | |
|Day 10 |  |  | |
|Day 11 |  |  | |
|Day 12 |  |  | |
|Day 13 |  |  | |
|Day 14 |  |  | |
|Day 15 |  |  | |
|Day 16 |  |  | |
|Day 17 |  |  | |
|Day 18 |  |  | |
|Day 19 |  |  | |
|Day 20 |  |  | |
|Day 21 |  |  | |
|Day 22 |  |  | |
|Day 23 |  |  | |
|Day 24 |  |  | |
|Day 25 |  |  | |
<!-- RESULTS:END -->

