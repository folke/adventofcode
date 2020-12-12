import { Input, Solution } from "../util"

export const part1: Solution = (input: Input) => {
  let [x, y] = [0, 0]
  let deg = 0
  for (const line of input.strings()) {
    const action = line.charAt(0)
    const units = +line.slice(1)
    switch (action) {
      case "N":
        y -= units
        break
      case "S":
        y += units
        break
      case "E":
        x += units
        break
      case "W":
        x -= units
        break
      case "L":
        deg -= units
        break
      case "R":
        deg += units
        break
      case "F":
        deg = deg % 360
        if (deg < 0) deg += 360
        if (deg == 0 /* E */) x += units
        else if (deg == 90 /* S */) y += units
        else if (deg == 180 /* W */) x -= units
        else if (deg == 270 /* N */) y -= units
        break

      default:
        break
    }
  }
  return x + y
}
part1.examples = [
  [
    `F10
N3
F7
R90
F11`,
    25,
  ],
]
part1.answer = 1956

export const part2: Solution = (input: Input) => {
  let [x, y] = [0, 0]
  let wp = [10, -1]

  function rotate(deg: number) {
    deg = deg % 360
    if (deg < 0) deg += 360
    if (deg == 0 /* E */) {
      wp = [wp[0], wp[1]]
    } else if (deg == 90 /* S */) {
      wp = [-wp[1], wp[0]]
    } else if (deg == 180 /* W */) {
      wp = [-wp[0], -wp[1]]
    } else if (deg == 270 /* N */) {
      wp = [wp[1], -wp[0]]
    }
  }

  for (const line of input.strings()) {
    const action = line.charAt(0)
    const units = +line.slice(1)
    switch (action) {
      case "N":
        wp[1] -= units
        break
      case "S":
        wp[1] += units
        break
      case "E":
        wp[0] += units
        break
      case "W":
        wp[0] -= units
        break
      case "L":
        rotate(-units)
        break
      case "R":
        rotate(units)
        break
      case "F":
        x += units * wp[0]
        y += units * wp[1]
        break

      default:
        break
    }
  }
  return x + y
}
part2.examples = [[part1.examples[0][0], 286]]
part2.answer = 126797
