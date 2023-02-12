import { useContext } from "react";
import { GameStatus } from "../../models";
import { GameStateContext } from "../GameState";

/**
 * Get an action that ends the game.
 */
export const useEndGame = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw Error('No game state');
  }
  /**
   * Create mines.
   */
  return (status: GameStatus.Victory | GameStatus.Defeat) => {
    const { dispatch } = context;
    dispatch({ type: 'endGame', status });
  };
};
