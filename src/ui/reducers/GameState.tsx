import React, { createContext, useContext, useReducer } from "react";
import { SetUtil } from "../util/set";
import { SerializedVector2, Vector2 } from "./game-objects";

enum GameResult {
  NotStarted = 'not-started',
  Ongoing = 'ongoing',
  Win = 'win',
  Loss = 'lose',
}

type GameState = {
  result: GameResult;
  size: {
    width: number;
    height: number;
  };
  mines?: Set<SerializedVector2>;
  flags?: Set<SerializedVector2>;
}

const initialGameState: GameState = {
  result: GameResult.Ongoing,
  size: { width: 10, height: 10 },
  mines: new Set(),
  flags: new Set(),
};

type GameStateAction = (
  { type: 'setResult', result: GameResult } |
  { type: 'toggleFlag', position: Vector2 }
);
type GameStateDispatch = (action: GameStateAction) => void;

const GameStateContext = createContext<{ state: GameState | null, dispatch: GameStateDispatch } | null>(null);

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

export const GameStateReducer = (state: GameState, action: GameStateAction) => {
  switch (action.type) {
    case 'setResult': {
      return {
        ...state,
        result: action.result
      };
    }
    case 'toggleFlag': {
      if (!state.flags) {
        throw Error(`Can't toggle flags before the game starts`)
      }
      const position: SerializedVector2 = `${action.position.x},${action.position.y}`;
      const flags = SetUtil.toggle(state.flags, position);
      return {
        ...state,
        flags
      };
    }
  }
}

/**
 * Get the game state.
 * @returns The game state
 */
export const useGameState = () => {
  const context = useContext(GameStateContext);
  return context?.state;
};

/**
 * Get an action that toggles a flag.
 * @returns The action to toggle a flag
 */
export const useToggleFlag = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw Error('No game state');
  }
  /**
   * Toggle the flag at a position.
   * @param position The flag position.
   */
  return (position: Vector2) => {
    const {state, dispatch} = context;
    dispatch({ type: 'toggleFlag', position })
  }
};
