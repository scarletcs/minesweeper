import React, { createContext, useReducer } from "react";
import { setResult } from "./actions/setResult";
import { toggleFlag } from "./actions/toggleFlag";
import { GameResult, GameState, Vector2 } from "./game-objects";

const initialGameState: GameState = {
  result: GameResult.Ongoing,
  size: { width: 10, height: 10 },
  mines: new Set(),
  flags: new Set(),
};

export type GameStateAction = (
  { type: 'setResult', result: GameResult } |
  { type: 'toggleFlag', position: Vector2 } |
  { type: 'revealPlace', position: Vector2 }
);

type GameStateDispatch = (action: GameStateAction) => void;

export const GameStateContext = createContext<{ state: GameState | null, dispatch: GameStateDispatch } | null>(null);

type Props = {
  children: React.ReactNode,
}

export const GameStateProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(GameStateReducer, initialGameState)
  const value = { state, dispatch }

  return (
    <GameStateContext.Provider value={value}>
      { children }
    </GameStateContext.Provider>
  );
};

export type GameStateReducerFn<T = GameStateAction['type']> = (state: GameState, action: (GameStateAction & { type: T })) => GameState;

export const GameStateReducer: GameStateReducerFn = (state: GameState, action: GameStateAction) => {
  switch (action.type) {
    case 'setResult':
      return setResult(state, action);
    case 'toggleFlag':
      return toggleFlag(state, action);
    case 'revealPlace': {
      return {
        ...state
      };
    }
  }
}
