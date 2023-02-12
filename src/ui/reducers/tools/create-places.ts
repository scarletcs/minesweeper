import { Vector2, PlaceMap, Place } from "../../models";

export const createPlaces = (size: Vector2): PlaceMap => {
  const map: PlaceMap = new Map();
  const area = size.x * size.y;
  const list = new Array(area).fill(0).map((_, index) => {
    const x = index % size.x;
    const y = Math.floor(index / size.x);
    const place: Place = {
      position: { x, y },
      hasMine: false,
      hasFlag: false,
      revealed: false,
      adjacentMineCount: 0,
    };
    return place;
  });
  for (const place of list) {
    map.set(`${place.position.x},${place.position.y}`, place);
  }
  return map;
}
