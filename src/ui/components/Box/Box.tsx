import React, { MouseEventHandler } from 'react';
import './Box.scss';
import Flag from '../../assets/game/flying-flag.svg';
import Mine from '../../assets/game/unlit-bomb.svg';
import Explosion from '../../assets/game/crowned-explosion.svg';
import { useGameState } from '../../reducers/hooks/useGameState';
import { useRevealPlace } from '../../reducers/hooks/useRevealPlace';
import { useToggleFlag } from '../../reducers/hooks/useToggleFlag';
import { GameStatus } from '../../models';
import classNames from 'classnames';

type Props = {
  x: number,
  y: number,
};

export const Box = ({ x, y }: Props) => {
  const gameState = useGameState()!;
  const revealPlace = useRevealPlace();
  const toggleFlag = useToggleFlag();

  /** The place this box represents. */
  const place = gameState.places!.get(`${x},${y}`)!;

  /** True if the player is defeated. */
  const isDefeat = gameState.status === GameStatus.Defeat;

  /** Show a flag on this location. */
  const showFlag = place.hasFlag;
  /** Show an explosion on this location. Oh no! */
  const showExplosion = place.hasMine && place.revealed;
  /** Show a mine on this location. */
  const showMine = place.hasMine && !place.revealed && isDefeat;

  /** Show that the user made a mistake here. */
  const highlightError = isDefeat && ((place.hasFlag && !place.hasMine) || (place.revealed && place.hasMine));
  
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
      className={classNames('Box', { error: highlightError })}
      data-x={x} // just for debug purposes
      data-y={y}
      onClick={reveal}
      onContextMenu={flag}
    >
      { showFlag ? <img src={Flag} alt="flag" /> : null }
      { showMine ? <img src={Mine} alt="mine" /> : null }
      { showExplosion ? <img src={Explosion} alt="explosion" /> : null }
    </button>
  );
};
