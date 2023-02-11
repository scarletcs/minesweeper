import { GameStatus } from "../game-objects";
import { GameStateReducerFn } from "../GameState";

export const startGame: GameStateReducerFn<'startGame'> = (state, action) => {
  const { size, mineCount } = action;

  return {
    status: GameStatus.Ongoing,
    size: { ...size },
    flags: new Set(),
  };
}
