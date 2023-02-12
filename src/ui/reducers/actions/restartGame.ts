import { GameStatus } from "../game-objects";
import { GameStateReducerFn } from "../GameState";

export const restartGame: GameStateReducerFn<'restartGame'> = (state, action) => {
  return {
    status: GameStatus.NotStarted,
  };
}
