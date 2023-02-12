import { DateTime } from "luxon";
import { GameStatus, Place, PlaceMap, Vector2 } from "../../models";
import { GameStateReducerFn } from "../GameState";
import { createPlaces } from "../tools/create-places";

export const startGame: GameStateReducerFn<'startGame'> = (state, action) => {
  const { size, mineCount } = action;

  const places = createPlaces(size);

  return {
    status: GameStatus.Started,
    size: { ...size },
    mineCount,
    minesPlanted: false,
    places,
    startedAt: DateTime.now(),
    endedAt: undefined,
  };
}
