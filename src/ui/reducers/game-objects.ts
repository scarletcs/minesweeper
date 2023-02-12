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

export interface Place {
  /**
   * The position this data represents.
   */
  position: Vector2;
  /**
   * Whether there is a mine here. (Ssh!)
   */
  hasMine: boolean;
  /**
   * Whether a flag has been placed here.
   */
  hasFlag: boolean;
  /**
   * Whether this place is revealed.
   */
  revealed: boolean;
}

/**
 * The current status of the game.
 */
export enum GameStatus {
  /** The game has not yet started. */
  NotStarted = 'not-started',
  /** The game has started and is ongoing. */
  Started = 'ongoing',
  /** The player has won. */
  Victory = 'victory',
  /** The player has hit a mine and lost. */
  Defeat = 'defeat',
}

export type PlaceMap = Map<SerializedVector2, Place>;

export type GameState = {
  status: GameStatus;
  size?: Vector2;
  mineCount?: number;
  minesPlanted?: boolean;
  places?: PlaceMap;
  startedAt?: DateTime;
  endedAt?: DateTime;
};
