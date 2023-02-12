import { MathUtil } from '../../util/math';
import { Place } from '../../models/place';
import { coord, Vector2 } from '../../models/vector2';
import { PlaceMap } from '../../models/place-map';

/**
 * Find the up-to-eight places around a given position, both linearly and diagonally.
 *
 * @param map The map to explore
 * @param position The center position to find the places around
 *
 * @returns the list of places adjacent to this one
 */
export function getAdjacentPlaces(map: PlaceMap, position: Vector2): Place[] {
  if (!map.has(coord(position))) {
    throw Error(`The requested position is not on the map.`, { cause: { map, position }});
  }

  const places: Place[] = [];
  const diffs = MathUtil.range(-1, +1);

  for (const dy of diffs) {
    for (const dx of diffs) {
      if (dx === 0 && dy === 0) {
        continue;
      }

      const dpos = {
        x: position.x + dx,
        y: position.y + dy,
      };

      const place = map.get(coord(dpos));

      if (place) {
        places.push(place);
      }
    }
  }

  return places;
}
