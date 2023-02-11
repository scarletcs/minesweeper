import { SetUtil } from "../../util/set";
import { SerializedVector2 } from "../game-objects";
import { GameStateReducerFn } from "../GameState";

export const toggleFlag: GameStateReducerFn<'toggleFlag'> = (state, action) => {
  if (!state.flags) {
    throw Error(`Can't toggle flags before the game starts`)
  }
  const position: SerializedVector2 = `${action.position.x},${action.position.y}`;
  const flags = SetUtil.toggle(state.flags, position);
  return {
    ...state,
    flags
  };
};
