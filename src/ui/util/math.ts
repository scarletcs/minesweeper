export abstract class MathUtil {
  /**
   * Generate a range of values from start to end, inclusive.
   * 
   * @param start The start of the range
   * @param end The end of the range
   * @returns The generated range
   */
  public static range(start: number, end: number): number[] {
    const length = (end - start) + 1;
    return new Array(length).fill(0).map((_, index) => start + index);
  }

  /**
   * Pick a random number from within a range, inclusive of the ends.
   * 
   * @param start The start of the range
   * @param end The end of the range
   */
  public static pickRange(start: number, end: number): number {
    const range = MathUtil.range(start, end);
    return MathUtil.pickRandom(range);
  }

  /**
   * Pick a random index from an array.
   * 
   * @param array The array to pick from
   * @returns The randomly picked index.
   */
  public static pickRandomIndex(array: any[]): number {
    const index = MathUtil.randomInt(array.length - 1);
    return index;
  }

  /**
   * Pick a random element from an array.
   * 
   * @param array The array to pick from
   * @returns The randomly picked element.
   */
  public static pickRandom<T>(array: T[]): T {
    const index = MathUtil.pickRandomIndex(array);
    return array[index];
  }

  /**
   * Generate a random number between 0 and max inclusive.
   * 
   * @param max The maximum number
   */
  public static randomInt(max: number): number;
  /**
   * Generate a random number between min and max inclusive.
   * 
   * @param min The minimum number
   * @param max The maximum number
   */
  public static randomInt(min: number, max: number): number;
  public static randomInt(minOrMax: number, max?: number): number {
    let min = minOrMax;
    if (typeof max === 'undefined') {
      min = 0;
      max = minOrMax;
    }
    const magnitude = max - min;
    return Math.floor(Math.random() * (magnitude + 1)) - min;
  }
}
