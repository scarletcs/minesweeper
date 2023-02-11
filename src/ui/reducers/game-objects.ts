export interface Vector2 {
  x: number;
  y: number;
}

export type SerializedVector2 = `${number},${number}`;

export enum GameResult {
  NotStarted = 'not-started',
  Ongoing = 'ongoing',
  Win = 'win',
  Loss = 'lose',
}

export type GameState = {
  result: GameResult;
  size: {
    width: number;
    height: number;
  };
  mines?: Set<SerializedVector2>;
  flags?: Set<SerializedVector2>;
}
