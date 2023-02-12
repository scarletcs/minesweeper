import { DateTime } from 'luxon';
import { GameStatus } from './game-status';
import { Place } from './place';
import { SerializedVector2, Vector2 } from './vector2';

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
