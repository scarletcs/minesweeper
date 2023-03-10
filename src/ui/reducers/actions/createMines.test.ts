import { coord, GameStatus } from "../../models";
import { MathUtil } from "../../util/math";
import { createMines } from "./createMines";
import { startGame } from "./startGame";

it(`places the asked-for number of mines`, () => {
  const mineCount = 8;
  const origin = { x: 3, y: 3 };
  const size = { x: 10, y: 10 };

  const state0 = startGame({ status: GameStatus.Defeat }, { type: 'startGame', size, mineCount });
  const state1 = createMines(state0, { type: 'createMines', origin });

  expect(state1.minesPlanted).toBeTruthy();
  const list = [...state1.places!.values()];
  expect(list.filter(p => p.hasMine)).toHaveLength(mineCount);
});

it(`places as many mines as it can, then gives up if it hits a limit`, () => {
  const mineCount = 8;
  const origin = { x: 1, y: 1 };
  const size = { x: 4, y: 3 };

  const state0 = startGame({ status: GameStatus.Defeat }, { type: 'startGame', size, mineCount });
  const state1 = createMines(state0, { type: 'createMines', origin });

  /*
  This state should look like:
  o o o X
  o O o X
  o o o X
  */

  const places = state1.places!;
  const list = [...places.values()];
  expect(list.filter(p => p.hasMine)).toHaveLength(3);
  expect(state1.places?.get(`${3},${0}`)?.hasMine).toBeTruthy();
  expect(state1.places?.get(`${3},${1}`)?.hasMine).toBeTruthy();
  expect(state1.places?.get(`${3},${2}`)?.hasMine).toBeTruthy();
});

it(`always leaves adjacent count as 0 for places with a mine`, () => {
  const mineCount = 8;
  const origin = { x: 1, y: 1 };
  const size = { x: 4, y: 3 };

  const state0 = startGame({ status: GameStatus.Defeat }, { type: 'startGame', size, mineCount });
  const state1 = createMines(state0, { type: 'createMines', origin });

  /*
  This state should look like:
  o o o X
  o O o X
  o o o X
  */

  const places = state1.places!;
  const list = [...places.values()];
  expect(list.filter(p => p.hasMine && p.adjacentMineCount > 0)).toHaveLength(0);
});

it(`will place mines anywhere but the origin & its surrounds`, () => {
  const mineCount = 16;
  const origin = { x: 2, y: 2 };
  const size = { x: 5, y: 5 };

  const state0 = startGame({ status: GameStatus.Defeat }, { type: 'startGame', size, mineCount });
  const state1 = createMines(state0, { type: 'createMines', origin });

  /*
  This state should look like:
  X X X X X
  X o o o X
  X o O o X
  X o o o X
  X X X X X
  */

  const places = state1.places!;
  const list = [...places.values()];
  expect(list.filter(p => p.hasMine)).toHaveLength(16);
  const safe = MathUtil.range(1, 3);
  for (const y of safe) {
    for (const x of safe) {
      const place = places.get(`${x},${y}`);
      expect(place!.hasMine).toBeFalsy();
    }
  }
});

it(`will mark surrounding mine count on tiles properly`, () => {
  const mineCount = 99;
  const origin = { x: 1, y: 1 };
  const size = { x: 4, y: 4 };

  const state0 = startGame({ status: GameStatus.Defeat }, { type: 'startGame', size, mineCount });
  const state1 = createMines(state0, { type: 'createMines', origin });

  /*
  This state should look like:
  o o o X
  o O o X
  o o o X
  X X X X
  */

  expect(state1.minesPlanted).toBeTruthy();
  const places = state1.places!;
  
  const expectations = [
    { pos: coord(0,0), count: 0 },
    { pos: coord(1,0), count: 0 },
    { pos: coord(0,1), count: 0 },
    { pos: coord(1,1), count: 0 },
    { pos: coord(2,0), count: 2 },
    { pos: coord(2,1), count: 3 },
    { pos: coord(2,2), count: 5 },
    { pos: coord(1,2), count: 3 },
    { pos: coord(0,2), count: 2 },
  ];

  for (const { pos, count } of expectations) {
    const place = places.get(pos)!;
    expect({ pos, count: place.adjacentMineCount }).toEqual({ pos, count });
  }
});
