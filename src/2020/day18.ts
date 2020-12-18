import { Input, Solution } from "../util"

function infixToPostfix(tokens: (string | number)[], part2 = false): (string | number)[] {
  function precedence(str: string) {
    if (part2 && str == "+") return 2
    return str == "+" || str == "*" ? 0 : -1
  }

  const stack = [],
    postfix = []

  for (const token of tokens) {
    // Step 1
    if (typeof token === "number") {
      postfix.push(token)
      continue
    }
    const top = stack[stack.length - 1]
    // Step 2
    if (!stack.length || top == "(") {
      stack.push(token)
      continue
    }
    // Step 3
    if (token == "(") {
      stack.push(token)
      continue
    }
    // Step 4
    if (token == ")") {
      while (stack.length) {
        const op = stack.pop()
        if (op == "(") break
        postfix.push(op)
      }
      continue
    }

    // Step 5
    let prevPresedence = precedence(top)
    const currPresedence = precedence(token)
    while (currPresedence <= prevPresedence) {
      const op = stack.pop()
      postfix.push(op)
      prevPresedence = precedence(stack[stack.length - 1])
      break
    }

    stack.push(token)
  }
  // Step 6
  while (stack.length) {
    const op = stack.pop()
    if (op == "(") break
    postfix.push(op)
  }

  return postfix as (string | number)[]
}

function tokenize(expr: string) {
  const tokens: (string | number)[] = []
  const eat = () => {
    if (num.length) {
      tokens.push(+num)
      num = ""
    }
  }
  let num = ""
  for (const c of expr) {
    if (c == " ") {
      eat()
      continue
    }
    if (["(", ")", "+", "*"].includes(c)) {
      eat()
      tokens.push(c)
    } else num += c
  }
  eat()
  return tokens
}

function calculate(postfix: (string | number)[]): number {
  const args: (number | string)[] = []
  while (postfix.length) {
    const tok = postfix.shift()
    if (tok == "+" || tok == "*") {
      const a = args.pop() as number
      const b = args.pop() as number
      args.push(tok == "+" ? a + b : a * b)
    } else args.push(tok as number)
  }
  return args[0] as number
}

export const part1: Solution = (input: Input) => {
  let total = 0
  for (const line of input.strings()) {
    const tokens = tokenize(line)
    const postfix = infixToPostfix(tokens)
    total += calculate(postfix)
  }
  return total
}
part1.examples = [
  ["5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))", 12240],
  ["1 + 2 * 3 + 4 * 5 + 6", 71],
  ["2 * 3 + (4 * 5)", 26],
  ["((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2", 13632],
]
part1.answer = 50956598240016

export const part2: Solution = (input: Input) => {
  let total = 0
  for (const line of input.strings()) {
    const tokens = tokenize(line)
    const postfix = infixToPostfix(tokens, true)
    total += calculate(postfix)
  }
  return total
}
part2.examples = [["5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))", 669060]]
part2.answer = 535809575344339
