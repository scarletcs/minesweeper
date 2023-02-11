import React, { MouseEventHandler } from 'react';
import './Box.scss';
import Flag from '../assets/game/flying-flag.svg';
import Bomb from '../assets/game/unlit-bomb.svg';
import Explosion from '../assets/game/crowned-explosion.svg';
import { useToggleFlag, useGameState } from '../reducers/GameState';

type Props = {
  x: number,
  y: number,
};

export const Box = ({ x, y }: Props) => {
  const gameState = useGameState();
  const isFlagged = gameState?.flags?.has(`${x},${y}`);
  const toggleFlag = useToggleFlag();

  const handleClick: MouseEventHandler = (event) => {
    console.log('click', event);
    if (event.button === 2) {
      toggleFlag({ x, y });
    }
  }

  return (
    <button
      type="button"
      className="Box"
      data-x={x}
      data-y={y}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      { isFlagged ? <img src={Flag} /> : null }
    </button>
  );
};
