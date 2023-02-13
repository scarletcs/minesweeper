import React from 'react';
import './ChooseDifficulty.scss';
import { useStartGame } from '../reducers/hooks/useStartGame';

type Props = {
};

export const ChooseDifficulty = ({}: Props) => {
  const startGame = useStartGame();

  return (
    <div className="ChooseDifficulty screen">
      <button
        type="button"
        className="button"
        onClick={() => startGame(1, { x: 8, y: 8 })}
      >
        Cheat: 8x8, 1 mines
      </button>
      <button
        type="button"
        className="button"
        onClick={() => startGame(10, { x: 8, y: 8 })}
      >
        8x8, 10 mines
      </button>
      <button
        type="button"
        className="button"
        onClick={() => startGame(30, { x: 12, y: 12 })}
      >
        12x12, 30 mines
      </button>
    </div>
  );
};
