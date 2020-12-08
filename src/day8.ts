import { Input, Solution } from "./lib"

enum Operation {
  acc,
  jmp,
  nop,
}
type Instruction = [Operation, number]

class GameConsole {
  program: Instruction[]
  acc = 0
  loc = 0

  constructor(public code: Input) {
    this.program = this.compile()
  }

  reset() {
    this.acc = this.loc = 0
  }

  private compile(): Instruction[] {
    return this.code
      .strings()
      .map((line) => [
        Operation[line.slice(0, 3) as keyof typeof Operation],
        +line.slice(4),
      ])
  }

  step() {
    const [op, arg] = this.program[this.loc]
    switch (op) {
      case Operation.acc:
        this.acc += arg
        this.loc++
        break

      case Operation.nop:
        this.loc++
        break

      case Operation.jmp:
        this.loc += arg
        break

      default:
        throw new Error(`Invalid instruction ${op} ${arg}`)
    }
  }

  terminated() {
    return this.program.length === this.loc
  }

  debug() {
    console.log(
      `${this.loc}: ${Operation[this.program[this.loc][0]]} ${
        this.program[this.loc][1]
      }`,
      { acc: this.acc }
    )
  }
}

export const part1: Solution = (input: Input) => {
  const game = new GameConsole(input)

  const locs = new Set<number>()

  let loc = game.loc
  while (!locs.has(loc)) {
    // game.debug()
    game.step()
    locs.add(loc)
    loc = game.loc
  }
  return game.acc
}
part1.examples = [
  [
    `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`,
    5,
  ],
]
part1.answer = 2014

export const part2: Solution = (input: Input) => {
  const game = new GameConsole(input)
  const visited = new Set<number>()
  let loc = game.loc
  while (!visited.has(loc)) {
    game.step()
    visited.add(loc)
    loc = game.loc
  }

  for (const change of visited) {
    if (game.program[change][0] == Operation.jmp)
      game.program[change][0] = Operation.nop
    else if (game.program[change][0] == Operation.nop)
      game.program[change][0] = Operation.jmp
    else continue

    game.reset()
    const locs = new Set<number>()
    let loc = game.loc
    while (!locs.has(loc)) {
      // game.debug()
      game.step()
      locs.add(loc)
      loc = game.loc
      if (game.terminated()) return game.acc
    }

    if (game.program[change][0] == Operation.jmp)
      game.program[change][0] = Operation.nop
    else if (game.program[change][0] == Operation.nop)
      game.program[change][0] = Operation.jmp
  }
}
part2.examples = [[part1.examples[0][0], 8]]
part2.answer = 2251
