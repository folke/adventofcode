import { inspect } from "util"

export function format(obj: unknown) {
  return inspect(obj, {
    depth: 6,
    colors: true,
    compact: true,
    showHidden: false,
    getters: false,
    customInspect: false,
    showProxy: false,
  })
}

export function ms(duration: number) {
  return duration ? `${Math.round(duration * 100) / 100}ms` : ""
}
