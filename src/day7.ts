import { Input, Solution } from "./util"

const ruleRegex = /^(\d+) (\w+ \w+) bags?$/u

function parse(rule: string) {
  const [bag, contents] = rule.split(" bags contain", 2)

  const children = new Map<string, number>()
  if (contents.includes("no other bags")) return { bag, children }
  const parts = contents
    .replace(".", "")
    .split(",")
    .map((x) => x.trim())
  for (const p of parts) {
    const m = ruleRegex.exec(p)
    if (m) {
      children.set(m[2], +m[1])
    } else throw new Error(`invalid input for ${p}`)
  }
  return { bag, children }
}

export const part1: Solution = (input: Input) => {
  const parents = new Map<string, Set<string>>()
  for (const rule of input.strings()) {
    const { bag, children } = parse(rule)
    for (const child of children.keys()) {
      if (!parents.has(child)) parents.set(child, new Set([bag]))
      else parents.get(child)?.add(bag)
    }
  }
  const holdingBags = new Set<string>()
  const queue = ["shiny gold"]
  while (queue.length) {
    const bag = queue.pop() as string
    const pp = parents.get(bag)
    for (const p of pp || []) {
      if (!holdingBags.has(p)) queue.push(p)
      holdingBags.add(p)
    }
  }
  return holdingBags.size
}
part1.examples = [
  [
    `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`,
    4,
  ],
]
part1.answer = 126

export const part2: Solution = (input: Input) => {
  const rules = new Map<string, Map<string, number>>()
  for (const rule of input.strings()) {
    const { bag, children } = parse(rule)
    rules.set(bag, children)
  }

  const getTotalBags = (bag: string): number => {
    let ret = 1
    for (const [child, amount] of rules.get(bag) ?? []) {
      ret += amount * getTotalBags(child)
    }
    return ret
  }
  return getTotalBags("shiny gold") - 1
}
part2.examples = [
  [part1.examples[0][0], 32],
  [
    `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`,
    126,
  ],
]
part2.answer = 220149
