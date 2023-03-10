import React, { useEffect, useState } from 'react';
import './Clock.scss';
import { DateTime } from 'luxon';
import Stopwatch from '../../assets/game/stopwatch.svg';
import { Icon } from '../Icon';

type Props = {
  startTime?: DateTime;
  endTime?: DateTime;
};

export const Clock = ({ startTime, endTime }: Props) => {
  const [tick, redraw] = useState(0);

  let time = '00:00';

  if (startTime) {
    const until = endTime ?? DateTime.now();
    const diff = until.diff(startTime).shiftTo('minutes', 'seconds', 'milliseconds');
    time = diff.toFormat('mm:ss');
  }

  useEffect(() => {
    setTimeout(() => {
      redraw(tick + 1)
    }, 1000);
  }, [tick]);

  return (
    <div className="Clock">
      <Icon src={Stopwatch} />
      <span>
        { time }
      </span>
    </div>
  );
};
