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

/**
 * Turn an x/y coordinate into a SerializedVector2.
 * @param x The x component
 * @param y The y component
 */
export function coord(x: number, y: number): SerializedVector2;
/**
 * Turn a vector into a SerializedVector2.
 * @param vector The vector
 */
export function coord(vector: Vector2): SerializedVector2;
export function coord(xOrVector: Vector2 | number, y?: number): SerializedVector2 {
  if (typeof xOrVector !== 'number') {
    const vector = xOrVector;
    return `${vector.x},${vector.y}`;
  } else if (typeof xOrVector === 'number' && typeof y === 'number') {
    const x = xOrVector;
    return `${x},${y}`;
  }
  throw Error('Unexpected coord args', { cause: { xOrVector, y } });
}
