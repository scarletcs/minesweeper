import React, { CSSProperties } from 'react';
import { useGameState } from '../reducers/GameState';
import { MathUtil } from '../util/math';
import { Box } from './Box';
import './GameGrid.scss';

type Props = {
};

export const GameGrid = ({}: Props) => {
  const gameState = useGameState();

  if (!gameState) {
    return null;
  }

  const { width, height } = gameState.size;

  const style = {
    '--cells-x': gameState.size.width,
    '--cells-y': gameState.size.height,
  } as CSSProperties;

  return (
    <div className="GameGrid" style={style}>
      {
        MathUtil.range(0, width - 1).map(y =>
          MathUtil.range(0, height - 1).map(x =>
            <Box key={`${x},${y}`} x={x} y={y} />
          )
        )
      }
    </div>
  );
};
