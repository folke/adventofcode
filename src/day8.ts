import { Input, Operation, Solution, VM } from "./util"

export const part1: Solution = (input: Input) => {
  const game = new VM(input)

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
  const game = new VM(input)
  const state = new Map<number, number>()
  let loc = 0
  while (!state.has(loc)) {
    game.step()
    state.set(loc, game.acc)
    loc = game.loc
  }

  function swap(loc: number) {
    if (game.program[loc][0] == Operation.jmp) {
      game.program[loc][0] = Operation.nop
    } else if (game.program[loc][0] == Operation.nop) {
      game.program[loc][0] = Operation.jmp
    } else return false
    return true
  }

  // eslint-disable-next-line prefer-const
  for (let [loc, acc] of state) {
    if (!swap(loc)) continue

    game.loc = loc
    game.acc = acc
    state.delete(loc)
    while (!state.has(loc)) {
      game.step()
      state.set(loc, game.acc)
      loc = game.loc
      if (game.terminated()) return game.acc
    }

    swap(loc)
  }
}
part2.examples = [[part1.examples[0][0], 8]]
part2.answer = 2251
