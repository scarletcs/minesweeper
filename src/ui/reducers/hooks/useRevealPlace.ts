import { useContext } from "react";
import { Vector2 } from "../game-objects";
import { GameStateContext } from "../GameState";

/**
 * Get an action that reveals a place.
 */

export const useRevealPlace = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw Error('No game state');
  }
  /**
   * Reveal a position.
   * @param position The position to reveal.
   */
  return (position: Vector2) => {
    const { dispatch } = context;
    dispatch({ type: 'revealPlace', position });
  };
};
