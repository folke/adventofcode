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
