import React from 'react';
import { render, screen } from '@testing-library/react';
import { Box } from './Box';
import { GameState, GameStatus, Place } from '../../models';
import { RequireSome } from '../../util/types';
import { GameStateContext } from '../../reducers/GameState';

const createGameStateContext = (x: number, y: number, data: Omit<Place, 'position'>, gameState?: Partial<GameState>) => {
  const place: Place = {
    position: { x, y },
    ...data
  };
  const state: RequireSome<GameState, 'places'> = {
    status: GameStatus.Started,
    places: new Map(),
    ...(gameState ?? {})
  };
  state.places.set(`${x},${y}`, place);

  return { state, dispatch: (action: any) => null };
};

test('renders a button', () => {
  const gameStateContext = createGameStateContext(0, 0,
    { hasMine: false, hasFlag: false, revealed: false });

  const box = render(
    <GameStateContext.Provider value={gameStateContext}>
      <Box x={0} y={0} />
    </GameStateContext.Provider>
  );

  const button = screen.getByRole('button');
  expect(button).toBeDefined();
});

test('renders a blank revealed tile', () => {
  const gameStateContext = createGameStateContext(0, 0,
    { hasMine: false, hasFlag: false, revealed: true });

  const box = render(
    <GameStateContext.Provider value={gameStateContext}>
      <Box x={0} y={0} />
    </GameStateContext.Provider>
  );

  const button = screen.getByRole('button');
  expect(button.childNodes.length).toBe(0);
});

test('renders a flag on a flagged tile', () => {
  const gameStateContext = createGameStateContext(0, 0,
    { hasMine: false, hasFlag: true, revealed: false });

  const box = render(
    <GameStateContext.Provider value={gameStateContext}>
      <Box x={0} y={0} />
    </GameStateContext.Provider>
  );

  const image = screen.getByAltText('flag');
  expect(image).toBeDefined();
});

test('renders an explosion on a revealed mine tile', () => {
  const gameStateContext = createGameStateContext(0, 0,
    { hasMine: true, hasFlag: false, revealed: true });

  const box = render(
    <GameStateContext.Provider value={gameStateContext}>
      <Box x={0} y={0} />
    </GameStateContext.Provider>
  );

  const image = screen.getByAltText('explosion');
  expect(image).toBeDefined();
});

test('renders a mine on an unrevealed mine tile during defeat', () => {
  const gameStateContext = createGameStateContext(0, 0,
    { hasMine: true, hasFlag: false, revealed: false },
    { status: GameStatus.Defeat });

  const box = render(
    <GameStateContext.Provider value={gameStateContext}>
      <Box x={0} y={0} />
    </GameStateContext.Provider>
  );

  const image = screen.getByAltText('mine');
  expect(image).toBeDefined();
});
