import { useContext } from "react";
import { GameStateContext } from "../GameState";

/**
 * Get an action that reveals a place.
 */
export const useRestartGame = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw Error('No game state');
  }
  /**
   * Restart the game.
   */
  return () => {
    const { dispatch } = context;
    dispatch({ type: 'restartGame' });
  };
};
