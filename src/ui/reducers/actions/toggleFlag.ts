import { SetUtil } from "../../util/set";
import { SerializedVector2 } from "../../models";
import { GameStateReducerFn } from "../GameState";

export const toggleFlag: GameStateReducerFn<'toggleFlag'> = (state, action) => {
  if (!state.places) {
    throw Error(`Can't toggle flags before places are generated.`);
  }

  const position: SerializedVector2 = `${action.position.x},${action.position.y}`;
  const place0 = state.places.get(position);

  if (!place0) {
    throw Error('No place exists at this coordinate. How did you get here?');
  }

  const places = structuredClone(state.places);
  const place = structuredClone(place0);
  place.hasFlag = !place0.hasFlag;
  places.set(position, place);
  
  return {
    ...state,
    places
  };
};
