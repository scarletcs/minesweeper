import { coord, Place, PlaceMap } from "../../models";
import { GameStateReducerFn } from "../GameState";
import { getAdjacentPlaces } from "../tools/get-adjacent-places";

export const revealPlace: GameStateReducerFn<'revealPlace'> = (state, action) => {
  const { position } = action;

  const places = structuredClone(state.places);
  if (!places) {
    throw Error(`revealPlace found no places. Nothing to reveal.`)
  }
  const here = places.get(coord(position));
  if (here) {
    here.revealed = true;

    if (!here.hasMine) {
      floodFill(places, here);
    }
  }

  return {
    ...state,
    places,
  };
}

/**
 * Flood fill the map from an origin, revealing adjacent clear places and numbered places.
 * 
 * @param map The place map to flood fill
 * @param here The location to flood fill from in this step
 */
export const floodFill = (map: PlaceMap, here: Place): void => {
  if (here.adjacentMineCount === 0) {
    const adjacent = getAdjacentPlaces(map, here.position).filter(p => !p.revealed);

    const next = adjacent.filter(p => !p.revealed && p.adjacentMineCount === 0);

    adjacent.forEach(p => {
      p.revealed = true;
      p.hasFlag = false;
    });

    for (const place of next) {
      floodFill(map, place);
    }
  }
}
