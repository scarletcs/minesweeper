import React from 'react';
import './App.scss';
import { GameStateProvider } from './reducers/GameState';
import { Navigator } from './screens/Navigator';

function App() {
  return (
    <div className="App screen">
      <GameStateProvider>
        <Navigator />
      </GameStateProvider>
    </div>
  );
}

export default App;
