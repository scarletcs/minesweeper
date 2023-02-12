import React from 'react';
import { Clock } from '../components/Clock';
import { GameGrid } from '../components/GameGrid';
import { useGameState } from '../reducers/hooks/useGameState';
import { useRestartGame } from '../reducers/hooks/useRestartGame';

type Props = {
};

export const GameScreen = ({}: Props) => {
  const gameState = useGameState()!;
  const restartGame = useRestartGame();

  return (
    <div>
      <GameGrid />
      <button type="button" onClick={restartGame}>Restart game</button>
      <Clock startTime={gameState.startedAt} endTime={gameState.endedAt} />
    </div>
  );
};
