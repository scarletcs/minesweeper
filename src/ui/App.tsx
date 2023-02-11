import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { GameGrid } from './components/GameGrid';
import { GameStateProvider } from './reducers/GameState';

function App() {
  return (
    <div className="App">
      <GameStateProvider>
        <GameGrid></GameGrid>
      </GameStateProvider>
    </div>
  );
}

export default App;
