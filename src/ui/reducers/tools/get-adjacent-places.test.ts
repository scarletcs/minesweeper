import { Vector2 } from "../../models";
import { createPlaces } from "./create-places";
import { getAdjacentPlaces } from "./get-adjacent-places";

describe(`finds adjacent places for`, () => {
  interface TestCase {
    /** a label for the point being picked */
    label: string;
    /** the point to pick */
    pick: Vector2;
    /** relative positions */
    find: Vector2[];
  }

  const cases: TestCase[] = [
    { 
      label: 'middle',
      pick: { x: 4, y: 4 },
      find: [
        // first row
        { x: -1, y: -1 },
        { x: +0, y: -1 },
        { x: +1, y: -1 },
    
        // second row
        { x: -1, y: 0 },
        { x: +1, y: 0 },
    
        // third row
        { x: -1, y: +1 },
        { x: +0, y: +1 },
        { x: +1, y: +1 },
      ]
    },
    {
      label: 'top left corner',
      pick: { x: 0, y: 0 },
      find: [
        // first row
        { x: +1, y: +0 },
    
        // second row
        { x: +0, y: +1 },
        { x: +1, y: +1 },
      ]
    },
    {
      label: 'bottom left corner',
      pick: { x: 0, y: 9 },
      find: [
        // first row
        { x: +0, y: -1 },
        { x: +1, y: -1 },
    
        // second row
        { x: +1, y: -0 },
      ]
    },
    {
      label: 'top right corner',
      pick: { x: 9, y: 0 },
      find: [
        // first row
        { x: -1, y: +0 },
    
        // second row
        { x: -1, y: +1 },
        { x: -0, y: +1 },
      ]
    },
    {
      label: 'bottom right corner',
      pick: { x: 9, y: 9 },
      find: [
        // first row
        { x: -1, y: -1 },
        { x: -0, y: -1 },
    
        // second row
        { x: -1, y: -0 },
      ]
    },
    {
      label: 'left edge',
      pick: { x: 0, y: 4 },
      find: [
        // first row
        { x: +0, y: -1 },
        { x: +1, y: -1 },

        // second row
        { x: +1, y: +0 },

        // third row
        { x: +0, y: +1 },
        { x: +1, y: +1 },
      ]
    },
    {
      label: 'right edge',
      pick: { x: 9, y: 4 },
      find: [
        // first row
        { x: -1, y: -1 },
        { x: +0, y: -1 },

        // second row
        { x: -1, y: +0 },

        // third row
        { x: -1, y: +1 },
        { x: +0, y: +1 },
      ]
    },
    {
      label: 'top edge',
      pick: { x: 4, y: 0 },
      find: [
        // first row
        { x: -1, y: +0 },
        { x: +1, y: +0 },

        // second row
        { x: -1, y: +1 },
        { x: +0, y: +1 },
        { x: +1, y: +1 },
      ]
    },
    {
      label: 'bottom edge',
      pick: { x: 4, y: 9 },
      find: [
        // first row
        { x: -1, y: -1 },
        { x: +0, y: -1 },
        { x: +1, y: -1 },
        
        // second row
        { x: -1, y: +0 },
        { x: +1, y: +0 },
      ]
    },
  ];

  cases.forEach(({ label, pick, find }) => {
    it(label, () => {
      const places = createPlaces({ x: 10, y: 10 });
    
      const adjacent = getAdjacentPlaces(places, pick);
      
      const positions = [...adjacent.values()].map(p => p.position);
      const expected = find.map(f => ({ x: pick.x + f.x, y: pick.y + f.y }));
      expect(positions).toHaveLength(expected.length);
      expect(positions).toEqual(expected);
    });
  });
});

it(`throws an error if the requested location is not on the map`, () => {
  const places = createPlaces({ x: 4, y: 4});

  expect(() => getAdjacentPlaces(places, { x: 4, y : 4 })).toThrow(); // fencepost error
});
