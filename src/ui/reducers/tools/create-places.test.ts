import { coord } from "../../models";
import { MathUtil } from "../../util/math";
import { createPlaces } from "./create-places";

it(`creates a map of places of the desired size`, () => {
  const size = { x: 8, y: 8 };

  const places = createPlaces(size);

  const values = [...places.values()];

  expect(values.length).toEqual(size.x * size.y); // should have the exact number of places

  for (const x of MathUtil.range(0, size.x - 1)) {
    for (const y of MathUtil.range(0, size.y - 1)) {
      const pos = coord(x, y);
      expect(places.has(pos)).toBeTruthy(); // each coordinate should be defined
      expect(places.get(pos)).toBeDefined(); // each cooordinate should be set to a place
    }
  }

  for (const x of MathUtil.range(0, size.x - 1)) {
    for (const y of MathUtil.range(0, size.y - 1)) {
      // verify each place was generated correctly
      const place = places.get(`${x},${y}`)!;
      expect(place.position).toEqual({ x, y });
      expect(place.hasFlag).toBeFalsy(); // no flags yet
      expect(place.hasMine).toBeFalsy(); // no mines yet
      expect(place.revealed).toBeFalsy(); // no reveals yet
    }
  }
});

it(`can create a map (simple rectangle)`, () => {
  const places = createPlaces({ x: 4, y: 3 });

  const positions = [...places.values()].map(p => p.position);

  expect(positions).toEqual([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },

    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },

    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
  ])
});


it(`can create a map (simple square)`, () => {
  const places = createPlaces({ x: 3, y: 3 });

  const positions = [...places.values()].map(p => p.position);

  expect(positions).toEqual([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },

    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },

    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ])
});
