import { GameStatus } from "../game-objects";
import { restartGame } from "./restartGame";
import { startGame } from "./startGame";

test(`generates a game`, () => {
  const startedGame = startGame({ status: GameStatus.Defeat }, { type: 'startGame', size: { x: 5, y: 5 }, mineCount: 5 });
  const state = restartGame(startedGame, { type: 'restartGame' });

  expect(state).toEqual({ status: GameStatus.NotStarted });
});