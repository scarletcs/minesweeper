import React, { CSSProperties } from 'react';
import { useGameState } from "../reducers/hooks/useGameState";
import { MathUtil } from '../util/math';
import { Box } from './Box';
import './GameGrid.scss';

type Props = {
};

export const GameGrid = ({}: Props) => {
  const gameState = useGameState()!;

  if (!gameState || !gameState.size) {
    return null;
  }

  const size = gameState.size;

  const style = {
    '--cells-x': size.x,
    '--cells-y': size.y,
  } as CSSProperties;

  return (
    <div className="GameGrid" style={style}>
      {
        MathUtil.range(0, size.y - 1).map(y =>
          MathUtil.range(0, size.x - 1).map(x =>
            <Box key={`${x},${y}`} x={x} y={y} />
          )
        )
      }
    </div>
  );
};
