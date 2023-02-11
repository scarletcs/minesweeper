import React, { createContext, useReducer } from "react";
import { startGame } from "./actions/startGame";
import { endGame } from "./actions/endGame";
import { toggleFlag } from "./actions/toggleFlag";
import { GameStatus, GameState, Vector2 } from "./game-objects";

const initialGameState: GameState = {
  status: GameStatus.NotStarted,
};

export type GameStateAction = (
  {
    /** Create a new game. */
    type: 'startGame',
    /** The size of the map to create. */
    size: Vector2,
    /** The number of mines to put on the map. */
    mineCount: number
  } |
  {
    /** Set the current status of the game. Use this to set a win/loss condition. */
    type: 'endGame',
    /** The final state. */
    status: (GameStatus.Win | GameStatus.Loss)
  } |
  {
    /** Place or remove a flag. */
    type: 'toggleFlag',
    /** The coordinates of the flag. */
    position: Vector2
  } |
  {
    /** Reveal a place, checking whether there's a mine or nothing there. */
    type: 'revealPlace',
    /** The coordinates to reveal. */
    position: Vector2
  }
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
    case 'startGame':
      return startGame(state, action);
    case 'endGame':
      return endGame(state, action);
    case 'toggleFlag':
      return toggleFlag(state, action);
    case 'revealPlace': {
      return {
        ...state
      };
    }
  }
}
