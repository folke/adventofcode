import { Input } from "../../util"

export enum Operation {
  acc,
  jmp,
  nop,
}
export type Instruction = [Operation, number]

export class VM {
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

  run() {
    while (!this.terminated()) this.step()
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
