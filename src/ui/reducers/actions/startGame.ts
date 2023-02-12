import { DateTime } from "luxon";
import { GameStatus, Place, PlaceMap, Vector2 } from "../../models";
import { GameStateReducerFn } from "../GameState";

const createPlaces = (size: Vector2): PlaceMap => {
  const map: PlaceMap = new Map();
  const area = size.x * size.y;
  const list = new Array(area).fill(0).map((_, index) => {
    const x = index % size.x;
    const y = Math.floor(index / size.y);
    const place: Place = {
      position: { x, y },
      hasMine: false,
      hasFlag: false,
      revealed: false,
    };
    return place;
  });
  for (const place of list) {
    map.set(`${place.position.x},${place.position.y}`, place);
  }
  return map;
}

export const startGame: GameStateReducerFn<'startGame'> = (state, action) => {
  const { size, mineCount } = action;

  const places = createPlaces(size);

  return {
    status: GameStatus.Started,
    size: { ...size },
    mineCount,
    minesPlanted: false,
    places,
    startedAt: DateTime.now(),
    endedAt: undefined,
  };
}
