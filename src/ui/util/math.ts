export abstract class MathUtil {
  public static range(start: number, end: number): number[] {
    const length = (end - start) + 1;
    return new Array(length).fill(0).map((_, index) => start + index);
  }
}
