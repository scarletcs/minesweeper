import React from 'react';
import './Box.scss';
import Flag from '../assets/game/flying-flag.svg';
import Bomb from '../assets/game/unlit-bomb.svg';
import Explosion from '../assets/game/crowned-explosion.svg';

type Props = {
  x: number,
  y: number,
};

export const Box = ({ x, y }: Props) => {


  return (
    <button type="button" className="Box" data-x={x} data-y={y}>
      <img src={Flag} />
      {/* <img src={Bomb} />
      <img src={Explosion} /> */}
    </button>
  );
};
