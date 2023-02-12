import React, { useEffect } from 'react';
import { Clock } from '../components/Clock';
import { GameGrid } from '../components/GameGrid';
import { GameStatus } from '../models';
import { useEndGame } from '../reducers/hooks/useEndGame';
import { useGameState } from '../reducers/hooks/useGameState';
import { useRestartGame } from '../reducers/hooks/useRestartGame';

type Props = {
};

export const GameScreen = ({}: Props) => {
  const gameState = useGameState()!;
  const restartGame = useRestartGame();
  const endGame = useEndGame();

  // Watch for victory
  useEffect(() => {
    const places = gameState.places;

    if (gameState.status !== GameStatus.Started) {
      // No game in progress.
      return;
    }

    if (!places || !gameState.mineCount || !gameState.minesPlanted) {
      // Not ready to calculate victory.
      return;
    }

    const unrevealedPlaces = [...places.values()].filter(p => !p.revealed);
    if (unrevealedPlaces.length === gameState.mineCount) {
      endGame(GameStatus.Victory);
    }
  }, [ gameState.places, gameState.status ]);

  return (
    <div className="GameScreen">
      <GameGrid />
      <aside className="sidebar">
        <button type="button" onClick={restartGame}>Restart game</button>
        <Clock startTime={gameState.startedAt} endTime={gameState.endedAt} />
        <div>
          Game status: { gameState.status }
        </div>
      </aside>
    </div>
  );
};
