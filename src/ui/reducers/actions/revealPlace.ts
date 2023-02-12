import { GameStateReducerFn } from "../GameState";
import { createMines } from "./createMines";

export const revealPlace: GameStateReducerFn<'revealPlace'> = (state, action) => {
  const { position } = action;

  const places = structuredClone(state.places);
  const place = places?.get(`${position.x},${position.y}`);
  if (place) {
    place.revealed = true;
  }

  // TODO flood-fill adjacent spaces

  return {
    ...state,
    places,
  };
}
