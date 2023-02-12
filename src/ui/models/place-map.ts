import { MathUtil } from '../util/math';
import { Place } from './place';
import { SerializedVector2, Vector2 } from './vector2';

/**
 * A map of positions to place information.
 */
export type PlaceMap = Map<SerializedVector2, Place>;

/**
 * Find the places around a given position.
 * 
 * Returns up to eight places. If the position is on an edge, it will return fewer.
 * 
 * @param map The map to explore
 * @param position The center position to find the places around
 * 
 * @returns the list of places adjacent to this one
 */
export function getAdjacentPlaces(map: PlaceMap, position: Vector2): Place[] {
  const diffs = MathUtil.range(-1, +1);
  let places: Place[] = [];

  for (const dy of diffs) {
    for (const dx of diffs) {
      if (dx === 0 && dy === 0) {
        continue;
      }

      const dpos = {
        x: position.x + dx,
        y: position.y + dy,
      };

      const place = map.get(`${dpos.x},${dpos.y}`);

      if (place) {
        places.push(place);
      }
    }
  }

  return places;
}
