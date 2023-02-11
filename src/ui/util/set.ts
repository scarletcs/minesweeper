export abstract class SetUtil {
  /**
   * Toggle the presence of an element in the set.
   * - If the element is missing, it will be added.
   * - If the element is present, it will be deleted.
   * 
   * This creates a new set without modifying the existing set.
   * 
   * @param set The set to modify
   * @param element The element to toggle
   * @returns The set with the element toggled.
   */
  static toggle<T>(set: Set<T>, element: T): Set<T> {
    const clone = new Set(set);
    if (clone.has(element)) {
      clone.delete(element);
    } else {
      clone.add(element);
    }
    return clone;
  }
}
