import { useContext } from "react";
import { GameStateContext } from "../GameState";

/**
 * Get the game state.
 * @returns The game state
 */

export const useGameState = () => {
  const context = useContext(GameStateContext);
  return context?.state;
};
