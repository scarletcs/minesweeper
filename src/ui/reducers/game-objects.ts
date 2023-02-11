import { DateTime } from 'luxon';

/**
 * A 2-dimensional vector.
 */
export interface Vector2 {
  x: number;
  y: number;
}

/**
 * A serialized form of Vector2 that will register equal by value in sets, keys, etc.
 */
export type SerializedVector2 = `${number},${number}`;

/**
 * The current status of the game.
 */
export enum GameStatus {
  /** The game has not yet started. */
  NotStarted = 'not-started',
  /** The game is ongoing. No wins or losses yet. */
  Ongoing = 'ongoing',
  /** The player has won. */
  Win = 'win',
  /** The player has hit a mine and lost. */
  Loss = 'lose',
}

export type GameState = {
  status: GameStatus;
  size?: Vector2;
  mines?: Set<SerializedVector2>;
  flags?: Set<SerializedVector2>;
  startedAt?: DateTime;
  endedAt?: DateTime;
}
