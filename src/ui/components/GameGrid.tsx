import React, { CSSProperties } from 'react';
import { MathUtil } from '../util/math';
import { Box } from './Box';
import './GameGrid.scss';

type Props = {
};

export const GameGrid = ({}: Props) => {
  const xmax = 9;
  const ymax = 9;
  
  const style = {
    '--xmax': xmax + 1,
    '--ymax': ymax + 1,
  } as CSSProperties;

  return (
    <div className="GameGrid" style={style}>
      {
        MathUtil.range(0, ymax).map(y =>
          MathUtil.range(0, xmax).map(x =>
            <Box x={x} y={y} />
          )
        )
      }
    </div>
  );
};
