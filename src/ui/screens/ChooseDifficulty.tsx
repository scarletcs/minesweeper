import React from 'react';
import { useStartGame } from '../reducers/hooks/useStartGame';

type Props = {
};

export const ChooseDifficulty = ({}: Props) => {
  const startGame = useStartGame();

  return (
    <div>
      <button
        type="button"
        onClick={() => startGame(10, { x: 8, y: 8 })}
      >
        8x8, 10 mines
      </button>
      <button
        type="button"
        onClick={() => startGame(40, { x: 16, y: 16 })}
      >
        16x16, 40 mines
      </button>
    </div>
  );
};
