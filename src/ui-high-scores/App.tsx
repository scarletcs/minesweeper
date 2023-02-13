import { DateTime, Duration } from 'luxon';
import React from 'react';
import './App.scss';
import Emblem from './assets/holy-grail.svg';

function App() {
  const scores = [
    { name: 'scarlett 2', time: 34 },
    { name: 'scarlett', time: 37 },
    { name: 'scarlettcs', time: 127 },
  ];

  return (
    <div className="App">
      <header>
        <img src={Emblem} className="emblem"></img>
        <h1>High Scores</h1>
      </header>

      <div className="list">
        {
          scores.map(({ name, time }, index) => {
            const duration = Duration.fromObject({ second: time });

            return <div className="entry">
              <div className="counter">{index}.</div>
              <div className="name">{name}</div>
              <div className="time">{duration.toFormat('mm:ss')}</div>
            </div>;
          })
        }
      </div>
    </div>
  );
}

export default App;
