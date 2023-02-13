import React, { useEffect, useState } from 'react';
import './GameScreen.scss';
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
  const [flagCount, setFlagCount] = useState(0);
  const restartGame = useRestartGame();
  const endGame = useEndGame();

  useEffect(() => {
    if (gameState.places) {
      const flags = [...gameState.places.values()].filter(p => p.hasFlag).length;
      setFlagCount(flags);
    }
  }, [gameState.places])

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
    <div className="GameScreen screen">
      <GameGrid />
      <aside className="sidebar">
        <Clock startTime={gameState.startedAt} endTime={gameState.endedAt} />
        <div>
          { flagCount } flags planted
        </div>
        <div>
          { gameState.mineCount } mines
        </div>
        <div>
          Game status: { gameState.status }
        </div>
        <button type="button" className="button" onClick={restartGame}>New game</button>
      </aside>
    </div>
  );
};
