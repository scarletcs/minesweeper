import { GameStateReducerFn } from "../GameState";

export const setResult: GameStateReducerFn<'setResult'> = (state, action) => {
  return {
    ...state,
    result: action.result
  };
}
