import { DateTime } from "luxon";
import { GameStateReducerFn } from "../GameState";

export const endGame: GameStateReducerFn<'endGame'> = (state, action) => {
  return {
    ...state,
    status: action.status,
    endedAt: DateTime.now(),
  };
}
