import React, { MouseEventHandler } from 'react';
import './Box.scss';
import Flag from '../../assets/game/flying-flag.svg';
import Mine from '../../assets/game/unlit-bomb.svg';
import Explosion from '../../assets/game/crowned-explosion.svg';
import { useGameState } from '../../reducers/hooks/useGameState';
import { useRevealPlace } from '../../reducers/hooks/useRevealPlace';
import { useToggleFlag } from '../../reducers/hooks/useToggleFlag';
import { coord, GameStatus } from '../../models';
import classNames from 'classnames';
import { useCreateMines } from '../../reducers/hooks/useCreateMines';
import { useEndGame } from '../../reducers/hooks/useEndGame';
import { Icon } from '../Icon';

type Props = {
  x: number,
  y: number,
};

export const Box = ({ x, y }: Props) => {
  const gameState = useGameState()!;
  const createMines = useCreateMines();
  const revealPlace = useRevealPlace();
  const toggleFlag = useToggleFlag();
  const endGame = useEndGame();
  const gameOngoing = gameState.status === GameStatus.Started;
  
  /** The place this box represents. */
  const place = gameState.places!.get(coord(x, y))!;
  const position = { x, y };
  
  const canReveal = (!place.revealed && !place.hasFlag && gameOngoing);
  const canModifyFlag = (!place.revealed && gameOngoing);
  
  const reveal: MouseEventHandler = (event) => {
    if (!canReveal) {
      return;
    }

    if (event.button === 0) {
      if (!gameState.minesPlanted) {
        createMines(position);
      }
      revealPlace(position);
      if (place.hasMine) {
        endGame(GameStatus.Defeat);
      }
    }
  };

  const flag: MouseEventHandler = (event) => {
    if (!canModifyFlag) {
      return;
    }
    
    if (event.button === 2) {
      toggleFlag(position);
    }
  }

  /** True if the player is defeated. */
  const isDefeated = gameState.status === GameStatus.Defeat;

  /** The user's made a mistake here. We'll present this during defeat.. */
  const hasError = (place.hasFlag && !place.hasMine) || (place.revealed && place.hasMine);

  let content: React.ReactNode | null = null;
  let has: string | null = null;

  if (place.hasMine && place.revealed) {
    has = 'explosion';
    content = <Icon src={Explosion} className="explosion" alt="explosion" />;
  } else if (place.hasFlag) {
    has = 'flag';
    content = <Icon src={Flag} className="flag" alt="flag" />;
  } else if (place.hasMine && !place.revealed && isDefeated) {
    // Reveal mines at the end.
    has = 'mine';
    content = <Icon src={Mine} className="mine" alt="mine" />;
  } else if (place.revealed && place.adjacentMineCount > 0) {
    has = 'warning';
    content = <span className="warning">{ place.adjacentMineCount }</span>;
  }

  return (
    <button
      type="button"
      className={classNames('Box', {
        error: isDefeated && hasError,
        revealed: place.revealed,
        [`has-${has}`]: has,
      })}
      data-x={x} // just for debug purposes
      data-y={y}
      disabled={!canReveal}
      onClick={reveal}
      onContextMenu={flag}
    >
      { content }
    </button>
  );
};
