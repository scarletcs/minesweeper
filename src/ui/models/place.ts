import { Vector2 } from "./vector2";

export interface Place {
  /**
   * The position this data represents.
   */
  position: Vector2;
  /**
   * Whether there is a mine here. (Ssh!)
   */
  hasMine: boolean;
  /**
   * Whether a flag has been placed here.
   */
  hasFlag: boolean;
  /**
   * Whether this place is revealed.
   */
  revealed: boolean;
}
