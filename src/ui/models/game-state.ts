import { DateTime } from 'luxon';
import { MathUtil } from '../util/math';
import { GameStatus } from './game-status';
import { PlaceMap } from './place-map';
import { Vector2 } from './vector2';

/**
 * The core game state of the application.
 */
export type GameState = {
  status: GameStatus;
  size?: Vector2;
  mineCount?: number;
  minesPlanted?: boolean;
  places?: PlaceMap;
  startedAt?: DateTime;
  endedAt?: DateTime;
};
