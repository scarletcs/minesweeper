import { SetUtil } from "./set";

describe(`toggle`, () => {
  test(`toggle on: returns a new set with the element added`, () => {
    const set = new Set([1, 2, 3]);

    const changed = SetUtil.toggle(set, 4);

    expect(changed.values).toEqual([1, 2, 3, 4]);
    expect(set.values).toEqual([1, 2, 3]);
  });

  test(`toggle off: returns a new set with the element removed`, () => {
    const set = new Set([1, 2, 3]);

    const changed = SetUtil.toggle(set, 2);

    expect(changed.values).toEqual([1, 3]);
    expect(set.values).toEqual([1, 2, 3]);
  });
});
