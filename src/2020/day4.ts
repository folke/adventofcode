import { Input, Solution } from "adventofcode-ts"

const passportFields = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
] as const

type PassportField = typeof passportFields[number]
type Passport = Map<PassportField, string>

function validate(input: Input, validator?: (passport: Passport) => unknown) {
  const passports = input.strings("\n\n")
  let invalid = 0
  loop: for (const data of passports) {
    const passport: Passport = new Map(
      (data.split(/\s+/u).map((f) => f.split(":")) as unknown) as (readonly [
        PassportField,
        string
      ])[]
    )

    for (const req of passportFields) {
      if (!passport.has(req)) {
        invalid++
        continue loop
      }
    }
    if (validator && !validator(passport)) invalid++
  }
  return passports.length - invalid
}
export const part1: Solution = (input: Input) => {
  return validate(input)
}
part1.examples = [
  [
    `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`,
    2,
  ],
]
part1.answer = 196

export const part2: Solution = (input: Input) => {
  const between = (val: string | undefined, min: number, max: number) => {
    const n = Number.parseInt(val ?? "0", 10)
    return n >= min && n <= max
  }
  return validate(input, (passport) => {
    const height = /^(\d+)(cm|in)$/u.exec(passport.get("hgt") ?? "")
    return (
      between(passport.get("byr"), 1920, 2002) &&
      between(passport.get("iyr"), 2010, 2020) &&
      between(passport.get("eyr"), 2020, 2030) &&
      height &&
      between(
        height[1],
        height[2] == "cm" ? 150 : 59,
        height[2] == "cm" ? 193 : 76
      ) &&
      passport.get("hcl")?.match(/^#[0-9a-f]{6}$/u) &&
      passport.get("ecl")?.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/u) &&
      passport.get("pid")?.match(/^\d{9}$/u)
    )
  })
}
part2.examples = [
  [
    `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`,
    4,
  ],
  [
    `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`,
    0,
  ],
]
part2.answer = 114
