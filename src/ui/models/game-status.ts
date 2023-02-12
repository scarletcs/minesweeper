/**
 * The current status of the game.
 */
export enum GameStatus {
  /** The game has not yet started. */
  NotStarted = 'not-started',
  /** The game has started and is ongoing. */
  Started = 'started',
  /** The player has won. */
  Victory = 'victory',
  /** The player has hit a mine and lost. */
  Defeat = 'defeat',
}
