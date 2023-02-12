import React from 'react';
import { GameStatus } from '../models';
import { useGameState } from '../reducers/hooks/useGameState';
import { ChooseDifficulty } from './ChooseDifficulty';
import { GameScreen } from './GameScreen';

type Props = {
};

export const Navigator = ({}: Props) => {
  const gameState = useGameState();

  if (!gameState || gameState.status === GameStatus.NotStarted) {
    return (
      <ChooseDifficulty />
    )
  } else {
    return (
      <GameScreen />
    );
  }

};
