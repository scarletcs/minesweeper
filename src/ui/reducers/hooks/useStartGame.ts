import { useContext } from "react";
import { Vector2 } from "../../models";
import { GameStateContext } from "../GameState";

/**
 * Get an action that starts the game.
 */
export const useStartGame = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw Error('No game state');
  }
  /**
   * Start the game.
   * @param mineCount The number of mines.
   * @param size The size of the map.
   */
  return (mineCount: number, size: Vector2) => {
    const { dispatch } = context;
    dispatch({ type: 'startGame', mineCount, size });
  };
};
