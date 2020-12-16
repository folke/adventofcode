import { Input, Solution } from "../util"

type Rule = [[number, number], [number, number]]
type Rules = [string, Rule][]

export const part1: Solution = (input: Input) => {
  const { nearby, rules } = parseInput(input)

  let ret = 0
  for (const t of nearby) {
    ret += invalid(t, rules)
  }
  return ret
}
part1.examples = [
  [
    `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`,
    71,
  ],
]
part1.answer = 23036

export const part2: Solution = (input: Input) => {
  const { ticket, nearby, rules } = parseInput(input)

  const tickets = [ticket, ...nearby.filter((t) => !invalid(t, rules))]

  const validFields: string[][] = []

  for (let col = 0; col < ticket.length; col++) {
    validFields[col] = []
    for (const rule of rules) {
      if (
        tickets.every(
          (t) =>
            (t[col] >= rule[1][0][0] && t[col] <= rule[1][0][1]) ||
            (t[col] >= rule[1][1][0] && t[col] <= rule[1][1][1])
        )
      )
        validFields[col].push(rule[0])
    }
  }

  const fields = new Map<string, number>()

  let found = false
  do {
    found = false
    for (let col = 0; col < validFields.length; col++) {
      validFields[col] = validFields[col].filter((field) => !fields.has(field))

      if (validFields[col].length == 1) {
        fields.set(validFields[col][0], col)
        found = true
        break
      }
    }
  } while (found)

  return [...fields.entries()]
    .filter(([field, _col]) => field.startsWith("departure"))
    .reduce((total, [_field, col]) => ticket[col] * total, 1)
}
part2.examples = []
part2.answer = 1909224687553

function invalid(t: number[], rules: Rules) {
  let ret = 0
  for (const v of t) {
    if (
      !rules.some(
        (rule) =>
          (v >= rule[1][0][0] && v <= rule[1][0][1]) ||
          (v >= rule[1][1][0] && v <= rule[1][1][1])
      )
    )
      ret += v
  }
  return ret
}

function parseInput(input: Input) {
  const [rulesText, ticketText, nearbyText] = input.strings("\n\n")

  const ticket = ticketText
    .split("\n")[1]
    .split(",")
    .map((x) => +x)

  const nearby = nearbyText
    .split("\n")
    .slice(1)
    .map((l) => l.split(",").map((x) => +x))

  const rules: Rules = rulesText.split("\n").map((rule) => {
    const [field, value] = rule.split(": ")
    return [field, value.split(" or ").map((v) => v.split("-").map((x) => +x))]
  }) as [string, Rule][]
  return { nearby, rules, ticket }
}
