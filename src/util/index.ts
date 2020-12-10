export * from "./input"
export * from "./day"
export * from "./format"
export * from "./bench"

export function eat(str: string, offset: number, delims: string) {
  if (delims.length == 1) return str.indexOf(delims, offset)
  let ret = str.length
  for (let d = 0; d < delims.length; d++) {
    const i = str.indexOf(delims.charAt(d), offset)
    if (i != -1 && (ret === -1 || i < ret)) ret = i
  }
  return ret
}
