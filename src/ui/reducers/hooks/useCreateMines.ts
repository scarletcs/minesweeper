import { useContext } from "react";
import { Vector2 } from "../../models";
import { GameStateContext } from "../GameState";

/**
 * Get an action that reveals a place.
 */
export const useCreateMines = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw Error('No game state');
  }
  /**
   * Create mines.
   */
  return (origin: Vector2) => {
    const { dispatch } = context;
    dispatch({ type: 'createMines', origin });
  };
};
