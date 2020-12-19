import { Input, Solution } from "../util"
import { performance } from "perf_hooks"

type TreeNode = string[][]

export const part1: Solution = (input: Input, options = { part2: false }) => {
  const tree = new Map<string, TreeNode>()
  const messages: string[] = []

  let rulesDone = false
  for (const line of input.strings()) {
    if (!line.length) {
      rulesDone = true
      continue
    }
    if (rulesDone) messages.push(line)
    else {
      // eslint-disable-next-line prefer-const
      let [id, rule] = line.split(": ")
      if (options.part2) {
        if (id == "8") rule = "42 | 42 8"
        if (id == "11") rule = "42 31 | 42 11 31"
      }
      const node: TreeNode = []
      for (const oneRule of rule.split(" | ")) {
        node.push(oneRule.split(" ").map((s) => s.replace(/"/gu, "")))
      }
      tree.set(id, node)
    }
  }

  const cache = new Map<string, string>()

  function regex(nodeId: string): string {
    if (cache.has(nodeId)) return cache.get(nodeId) as string
    const node = tree.get(nodeId) as TreeNode
    const ors: string[] = []
    let ret = ""
    if (options.part2 && nodeId == "8") {
      ret = `${regex("42")}+`
    } else if (options.part2 && nodeId == "11") {
      const a = regex("42")
      const b = regex("31")
      let aa = ""
      let bb = ""
      for (let n = 1; n <= 4; n++) {
        aa += a
        bb += b
        ors.push(aa + bb)
      }
      ret = `(?:${ors.join("|")})`
    } else {
      for (const rule of node) {
        let re = ""
        for (const part of rule) {
          re += !Number.isNaN(Number.parseInt(part)) ? regex(part) : part
        }
        ors.push(re)
      }
      ret = ors.length == 1 ? ors[0] : `(?:${ors.join("|")})`
    }
    cache.set(nodeId, ret)
    return ret
  }

  const rexText = regex("0")
  const rex = new RegExp(`^${rexText}$`, "u")
  const ret = messages.filter((m) => rex.test(m)).length
  return ret
}
part1.examples = [
  [
    `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`,
    2,
  ],
]
part1.answer = 279

export const part2: Solution = (input: Input) => {
  return part1(input, { part2: true })
}
part2.examples = [
  [
    `42: 9 14 | 10 1
9: 14 27 | 1 26
10: 23 14 | 28 1
1: "a"
11: 42 31
5: 1 14 | 15 1
19: 14 1 | 14 14
12: 24 14 | 19 1
16: 15 1 | 14 14
31: 14 17 | 1 13
6: 14 14 | 1 14
2: 1 24 | 14 4
0: 8 11
13: 14 3 | 1 12
15: 1 | 14
17: 14 2 | 1 7
23: 25 1 | 22 14
28: 16 1
4: 1 1
20: 14 14 | 1 15
3: 5 14 | 16 1
27: 1 6 | 14 18
14: "b"
21: 14 1 | 1 14
25: 1 1 | 1 14
22: 14 14
8: 42
26: 14 22 | 1 20
18: 15 15
7: 14 5 | 1 21
24: 14 1

abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa
bbabbbbaabaabba
babbbbaabbbbbabbbbbbaabaaabaaa
aaabbbbbbaaaabaababaabababbabaaabbababababaaa
bbbbbbbaaaabbbbaaabbabaaa
bbbababbbbaaaaaaaabbababaaababaabab
ababaaaaaabaaab
ababaaaaabbbaba
baabbaaaabbaaaababbaababb
abbbbabbbbaaaababbbbbbaaaababb
aaaaabbaabaaaaababaa
aaaabbaaaabbaaa
aaaabbaabbaaaaaaabbbabbbaaabbaabaaa
babaaabbbaaabaababbaabababaaab
aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba`,
    12,
  ],
]
part2.answer = 384
