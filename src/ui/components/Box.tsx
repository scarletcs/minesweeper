import React, { MouseEventHandler } from 'react';
import './Box.scss';
import Flag from '../assets/game/flying-flag.svg';
import Bomb from '../assets/game/unlit-bomb.svg';
import Explosion from '../assets/game/crowned-explosion.svg';
import { useGameState } from '../reducers/hooks/useGameState';
import { useRevealPlace } from '../reducers/hooks/useRevealPlace';
import { useToggleFlag } from '../reducers/hooks/useToggleFlag';

type Props = {
  x: number,
  y: number,
};

export const Box = ({ x, y }: Props) => {
  const gameState = useGameState();
  const revealPlace = useRevealPlace();
  const toggleFlag = useToggleFlag();
  const isFlagged = gameState?.flags?.has(`${x},${y}`);

  const reveal: MouseEventHandler = (event) => {
    if (event.button === 0) {
      revealPlace({ x, y });
    }
  };

  const flag: MouseEventHandler = (event) => {
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
      onClick={reveal}
      onContextMenu={flag}
    >
      { isFlagged ? <img src={Flag} /> : null }
    </button>
  );
};
