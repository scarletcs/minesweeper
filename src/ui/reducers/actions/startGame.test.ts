import { GameStatus, SerializedVector2 } from "../../models";
import { DateTime, Settings } from 'luxon';
import { startGame } from "./startGame";
import { MathUtil } from "../../util/math";

const now = new Date(2015, 6, 6).valueOf();

beforeEach(() => {
  Settings.now = () => now;
});

it(`generates a game`, () => {
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
