import { GameStatus, SerializedVector2 } from "../../models";
import { DateTime, Settings } from 'luxon';
import { startGame } from "./startGame";
import { MathUtil } from "../../util/math";

const now = new Date(2015, 6, 6).valueOf();

beforeEach(() => {
  Settings.now = () => now;
});

test(`generates a game`, () => {
  const mineCount = 5;
  const size = { x: 8, y: 8 };

  const state = startGame({ status: GameStatus.Victory }, { type: 'startGame', size, mineCount });

  expect(state.status).toEqual(GameStatus.Started);
  expect(state.size).toEqual(size);
  expect(state.mineCount).toEqual(mineCount);
  expect(state.minesPlanted).toBeFalsy();
  const expectedNow = DateTime.fromMillis(now);
  expect(state.startedAt).toEqual(expectedNow);
  expect(state.endedAt).toBeUndefined();
  expect(state.places).toBeDefined();
});

test(`creates places properly`, () => {
  const mineCount = 5;
  const size = { x: 8, y: 8 };

  const state = startGame({ status: GameStatus.Victory }, { type: 'startGame', size, mineCount });

  expect(state.places).toBeDefined();
  const places = state.places!;
  const values = [...places.values()];

  expect(values.length).toEqual(size.x * size.y);

  for (const x of MathUtil.range(0, size.x - 1)) {
    for (const y of MathUtil.range(0, size.y - 1)) {
      const pos: SerializedVector2 = `${x},${y}`;
      expect(places.has(pos)).toBeTruthy(); // each coordinate should be defined
      expect(places.get(pos)).toBeDefined(); // each cooordinate should be set to a place
    }
  }

  for (const x of MathUtil.range(0, size.x - 1)) {
    for (const y of MathUtil.range(0, size.y - 1)) {
      // verify each place was generated correctly
      const place = places.get(`${x},${y}`)!;
      expect(place.position).toEqual({ x, y });
      expect(place.hasFlag).toBeFalsy(); // no flags yet
      expect(place.hasMine).toBeFalsy(); // no mines yet
      expect(place.revealed).toBeFalsy(); // no reveals yet
    }
  }
});
