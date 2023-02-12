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

  /** True if the player is defeated. */
  const isDefeat = gameState.status === GameStatus.Defeat;

  /** Show a flag on this location. */
  const showFlag = place.hasFlag;
  /** Show an explosion on this location. Oh no! */
  const showExplosion = place.hasMine && place.revealed;
  /** Show a mine on this location. */
  const showMine = place.hasMine && (!place.revealed && isDefeat);

  /** Show that the user made a mistake here. */
  const highlightError = isDefeat && ((place.hasFlag && !place.hasMine) || (place.revealed && place.hasMine));

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

  return (
    <button
      type="button"
      className={classNames('Box', {
        error: highlightError,
        revealed: place.revealed
      })}
      data-x={x} // just for debug purposes
      data-y={y}
      disabled={!canReveal}
      onClick={reveal}
      onContextMenu={flag}
    >
      { showFlag ? <Icon src={Flag} alt="flag" /> : null }
      { showMine ? <Icon src={Mine} alt="mine" /> : null }
      { showExplosion ? <Icon src={Explosion} alt="explosion" /> : null }
    </button>
  );
};
