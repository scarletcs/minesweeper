import { useContext } from "react";
import { Vector2 } from "../game-objects";
import { GameStateContext } from "../GameState";

/**
 * Get an action that toggles a flag.
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
    const { dispatch } = context;
    dispatch({ type: 'toggleFlag', position });
  };
};
