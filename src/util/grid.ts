import { CustomInspectFunction, inspect, InspectOptionsStylized } from "util"

export type TypedArray<T> = (
  | Int8Array
  | Uint8Array
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Uint8ClampedArray
  | Float32Array
  | Float64Array
) & { [index: number]: T }

export type ReadonlyData<T> = ArrayLike<T> & {
  [Symbol.iterator](): IterableIterator<T>
  slice(start?: number, end?: number): ReadonlyData<T>
}

export type Data<T> = (Array<T> | TypedArray<T>) & {
  [Symbol.iterator](): IterableIterator<T>
  slice(start?: number, end?: number): Data<T>
}

export class ReadonlyGrid<T> {
  height: number
  _hi: [number, number] = [0, 0]
  _lo: [number, number] = [0, 0]

  constructor(public data: ReadonlyData<T>, public width: number) {
    this.height = Math.ceil(data.length / width)
  }

  hi(x: number, y: number) {
    this._hi[0] += x
    this._hi[1] += y
    this.width -= x
    this.height -= y
    return this
  }

  lo(x: number, y: number) {
    this._lo[0] += x
    this._lo[1] += y
    this.width -= x
    this.height -= y
    return this
  }

  index(x: number, y: number): number {
    return (
      (y + this._lo[1]) * (this.width + this._lo[0] + this._hi[0]) +
      x +
      this._lo[0]
    )
  }

  cell(index: number): [number, number] {
    const w = this.width + this._lo[0] + this._hi[0]
    const y = Math.floor(index / w)
    const x = index % w
    return [x - this._lo[0], y - this._lo[1]]
  }

  valid(index: number) {
    const [x, y] = this.cell(index)
    // console.log([x, y])
    return x >= 0 && y >= 0 && x < this.width && y < this.height
  }

  forEach(cb: (value: T, x: number, y: number, index: number) => void): void {
    for (let i = 0; i < this.data.length; i++) {
      if (this.valid(i)) cb(this.data[i], ...this.cell(i), i)
    }
  }

  map<U>(cb: (value: T, x: number, y: number, index: number) => U): Grid<U> {
    const data: U[] = []
    for (let i = 0; i < this.data.length; i++) {
      if (this.valid(i)) data.push(cb(this.data[i], ...this.cell(i), i))
    }
    return new Grid(data, this.width)
  }

  *values() {
    for (let i = 0; i < this.data.length; i++) {
      if (this.valid(i)) yield this.data[i]
    }
  }

  get(x: number, y: number): T {
    return this.data[this.index(x, y)]
  }

  get length(): number {
    return this.data.length
  }

  flatten() {
    return [...this.values()]
  }

  clone(readonly?: true): ReadonlyGrid<T>
  clone(readonly: false): Grid<T>
  clone(readonly = true) {
    const ro = !(this instanceof Grid)
    if (readonly) {
      const ret = new ReadonlyGrid(
        ro ? this.data : this.data.slice(),
        this.width + this._lo[0] + this._hi[0]
      )
      ret.lo(...this._lo)
      ret.hi(...this._hi)
      return ret
    } else return new Grid(this.flatten(), this.width)
  }

  *rows() {
    for (let y = 0; y < this.height; y++)
      yield this.data.slice(this.index(0, y), this.index(0, y) + this.width)
  }

  [inspect.custom]: CustomInspectFunction = (
    depth: number,
    options: InspectOptionsStylized
  ): string => {
    const name = this instanceof Grid ? "Grid" : "*Grid"
    let ret = options.stylize(`${name}(`, "special")
    ret += [...this.rows()]
      .map((row) => inspect(row, { ...options, depth: depth - 1 }))
      .join(`\n${" ".repeat(name.length + 1)}`)
    ret += options.stylize(")", "special")
    return ret
  }
}

export class Grid<T> extends ReadonlyGrid<T> {
  constructor(public data: Data<T>, public width: number) {
    super(data, width)
  }

  set(x: number, y: number, val: T) {
    this.data[this.index(x, y)] = val
  }

  static fromString(data: string, delimiter = "\n") {
    return new ReadonlyGrid(data, data.indexOf(delimiter) + 1).hi(1, 0)
  }
}
