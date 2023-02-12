import { coord } from "./vector2";

describe(`coord`, () => {
  it(`serialises a vector`, () => {
    expect(coord({ x: 3, y: 4 })).toEqual(`3,4`);
  });

  it(`serialises two numbers`, () => {
    expect(coord(3, 4)).toEqual(`3,4`);
  });
});
