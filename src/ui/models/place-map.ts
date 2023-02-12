import { Place } from './place';
import { SerializedVector2 } from './vector2';

/**
 * A map of positions to place information.
 */
export type PlaceMap = Map<SerializedVector2, Place>;
