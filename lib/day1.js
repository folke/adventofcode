var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// src/day1.ts
__export(exports, {
  part1: () => part1,
  part2: () => part2
});
var part1 = (input) => {
  const expenses = new Set(input.numbers());
  for (const exp of expenses) {
    if (expenses.has(2020 - exp))
      return exp * (2020 - exp);
  }
};
part1.examples = [
  [
    `1721
979
366
299
675
1456`,
    514579
  ]
];
part1.answer = 744475;
var part2 = (input) => {
  const expenses = input.numbers();
  const expensesSet = new Set(expenses);
  for (let ai = 0; ai < expenses.length; ai++) {
    const a = expenses[ai];
    for (let bi = ai + 1; bi < expenses.length; bi++) {
      const b = expenses[bi];
      const c = 2020 - a - b;
      if (expensesSet.has(c)) {
        return a * b * c;
      }
    }
  }
};
part2.answer = 70276940;
