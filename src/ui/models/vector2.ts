/**
 * A 2-dimensional vector.
 */
export interface Vector2 {
  x: number;
  y: number;
}

/**
 * A serialized form of Vector2 that will register equal by value in sets, keys, etc.
 */
export type SerializedVector2 = `${number},${number}`;
