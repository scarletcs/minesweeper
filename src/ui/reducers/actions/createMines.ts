import { getAdjacentPlaces } from "../tools/get-adjacent-places";
import { MathUtil } from "../../util/math";
import { GameStateReducerFn } from "../GameState";
import { Place } from "../../models";

export const createMines: GameStateReducerFn<'createMines'> = (state, action) => {
  if (state.minesPlanted) {
    throw Error(`Mines were already planted, createMines shouldn't have been called.`)
  }
  if (!state.places) {
    throw Error(`State had no places, can't create mines. Has the game been started yet?`);
  }
  if (!state.mineCount) {
    throw Error(`No mineCount has been specified. Has the game been started yet?`)
  }
  
  const places = structuredClone(state.places);
  
  const { origin } = action;
  const originPlace = places.get(`${origin.x},${origin.y}`);
  const originAdjacent = getAdjacentPlaces(places, origin);

  const skip = [originPlace, ...originAdjacent];
  const possibilities = [...places.values()].filter(p => !skip.includes(p));
  const mines: Place[] = [];

  while (mines.length < state.mineCount && possibilities.length > 0) {
    const index = MathUtil.pickRandomIndex(possibilities);
    const [place] = possibilities.splice(index, 1);
    const adjacent = getAdjacentPlaces(places, place.position);

    if (adjacent.find(p => p.adjacentMineCount >= 7)) {
      // Avoid closing off a tile completely.
      continue;
    }

    place.hasMine = true;
    adjacent.forEach(a => {
      a.adjacentMineCount++;
    });
    mines.push(place);
  }

  // Cleanup
  mines.forEach(p => {
    p.adjacentMineCount = 0;
  });

  return {
    ...state,
    minesPlanted: true,
    places,
  };
}
