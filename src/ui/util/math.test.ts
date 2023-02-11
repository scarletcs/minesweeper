import { MathUtil } from "./math";

describe(`range`, () => {
  test(`creates a range from 0 to 10`, () => {
    expect(MathUtil.range(0, 10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test(`creates a range from 1 to 5`, () => {
    expect(MathUtil.range(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });
});
