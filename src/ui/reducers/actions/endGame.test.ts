import { GameStatus } from "../game-objects";
import { DateTime, Settings } from 'luxon';
import { endGame } from "./endGame";

const now = new Date(2023, 1, 1, 0, 5, 0).valueOf();

beforeEach(() => {
  Settings.now = () => now;
});

test(`generates a game`, () => {
  const status = GameStatus.Defeat;
  const startedAt = DateTime.fromObject({ year: 2023, month: 1, day: 1 });

  const state = endGame({ status: GameStatus.Started, startedAt }, { type: 'endGame', status });

  expect(state.status).toEqual(status);
  const expectedNow = DateTime.fromMillis(now);
  expect(state.startedAt).toEqual(startedAt);
  expect(state.endedAt).toEqual(expectedNow);
});
