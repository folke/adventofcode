import { Input } from "../src/lib/input"

test("numbers", () => {
  expect(new Input("1\n2\n3\n4").numbers()).toStrictEqual([1, 2, 3, 4])
})