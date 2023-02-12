import React from 'react';
import { render, screen } from '@testing-library/react';
import { Box } from './Box';
import { coord, GameState, GameStatus, Place } from '../../models';
import { RequireSome } from '../../util/types';
import { GameStateContext } from '../../reducers/GameState';

const createGameStateContext = (x: number, y: number, placeConfig?: Partial<Omit<Place, 'position'>>, gameState?: Partial<GameState>) => {
  const place: Place = {
    position: { x, y },
    hasMine: false,
    hasFlag: false,
    revealed: false,
    adjacentMineCount: 0,
    ...(placeConfig ?? {})
  };
  const state: RequireSome<GameState, 'places'> = {
    status: GameStatus.Started,
    places: new Map(),
    ...(gameState ?? {})
  };
  state.places.set(coord(x, y), place);

  return { state, dispatch: (action: any) => null };
};

it('renders a button', () => {
  const gameStateContext = createGameStateContext(0, 0);

  const box = render(
    <GameStateContext.Provider value={gameStateContext}>
      <Box x={0} y={0} />
    </GameStateContext.Provider>
  );

  const button = screen.getByRole('button');
  expect(button).toBeDefined();
});

it('renders a blank revealed tile', () => {
  const gameStateContext = createGameStateContext(0, 0,
    { revealed: true });

  const box = render(
    <GameStateContext.Provider value={gameStateContext}>
      <Box x={0} y={0} />
    </GameStateContext.Provider>
  );

  const button = screen.getByRole('button');
  expect(button.childNodes.length).toBe(0);
});

it('renders a flag on a flagged tile', () => {
  const gameStateContext = createGameStateContext(0, 0,
    { hasFlag: true });

  const box = render(
    <GameStateContext.Provider value={gameStateContext}>
      <Box x={0} y={0} />
    </GameStateContext.Provider>
  );

  const image = screen.getByRole('image');
  expect(image.classList).toContain('flag')
});

it('renders an explosion on a revealed mine tile', () => {
  const gameStateContext = createGameStateContext(0, 0,
    { hasMine: true, revealed: true });

  const box = render(
    <GameStateContext.Provider value={gameStateContext}>
      <Box x={0} y={0} />
    </GameStateContext.Provider>
  );

  const image = screen.getByRole('image');
  expect(image.classList).toContain('explosion')
});

it('renders a mine on an unrevealed mine tile during defeat', () => {
  const gameStateContext = createGameStateContext(0, 0,
    { hasMine: true },
    { status: GameStatus.Defeat });

  const box = render(
    <GameStateContext.Provider value={gameStateContext}>
      <Box x={0} y={0} />
    </GameStateContext.Provider>
  );

  const image = screen.getByRole('image');
  expect(image.classList).toContain('mine')
});
