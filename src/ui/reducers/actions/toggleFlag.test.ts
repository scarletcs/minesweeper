import { GameState, GameStatus } from "../../models";
import { toggleFlag } from "./toggleFlag";
import { startGame } from "./startGame";

let state0: GameState;

beforeEach(() => {
  state0 = startGame({ status: GameStatus.Started }, { type: 'startGame', size: { x: 10, y: 10 }, mineCount: 5 });
});

test(`applies a flag`, () => {
  const position = { x: 1, y: 2 };

  const state = toggleFlag(state0, { type: 'toggleFlag', position });

  const places = [...state.places!.values()];
  expect(places.filter(p => p.hasFlag).length).toEqual(1); // just one flag
  expect(places.find(p => p.hasFlag)?.position).toEqual(position); // it's at the position we marked
});

test(`applies a second flag`, () => {
  const pos1 = { x: 1, y: 2 };
  const pos2 = { x: 4, y: 7 };

  const state1 = toggleFlag(state0, { type: 'toggleFlag', position: pos1 });
  const state2 = toggleFlag(state1, { type: 'toggleFlag', position: pos2 });

  const places = [...state2.places!.values()];
  expect(places.filter(p => p.hasFlag).length).toEqual(2); // two flags now

  // first flag is where we put it
  expect(places.find(p => p.hasFlag && p.position.x === pos1.x && p.position.y === pos1.y)).toBeDefined();
  // second flag is where we put it
  expect(places.find(p => p.hasFlag && p.position.x === pos2.x && p.position.y === pos2.y)).toBeDefined();
});


test(`removes a flag`, () => {
  const position = { x: 1, y: 2 };

  const state1 = toggleFlag(state0, { type: 'toggleFlag', position });
  const state2 = toggleFlag(state1, { type: 'toggleFlag', position });

  const places = [...state2.places!.values()];
  expect(places.filter(p => p.hasFlag).length).toEqual(0); // no flags now
});
