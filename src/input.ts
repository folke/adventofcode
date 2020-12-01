import fs from "fs"
import fetch from "node-fetch"
import path from "path"

const CACHE_DIR = path.resolve(__dirname, "..", "cache")
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR)

export class Input {
  public constructor(public data: string) {}

  strings(separator: string | RegExp = "\n") {
    return this.data.trim().split(separator)
  }

  numbers(separator: string | RegExp = "\n") {
    return this.strings(separator).map((n) => +n)
  }

  public static async get(day: number) {
    const cacheFile = path.resolve(__dirname, "..", "cache", `day${day}.txt`)
    if (!fs.existsSync(cacheFile))
      fs.writeFileSync(cacheFile, await this._fetch(day), { encoding: "utf-8" })
    return new Input(fs.readFileSync(cacheFile, { encoding: "utf-8" }))
  }

  private static async _fetch(day: number) {
    const session = process.env.AOC_SESSION
    if (!session)
      throw new Error("Please specify AOC_SESSION in your .env file")
    return await fetch(`https://adventofcode.com/2020/day/${day}/input`, {
      headers: { cookie: `session=${session}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`)
        return res
      })
      .then((res) => res.text())
  }
}
