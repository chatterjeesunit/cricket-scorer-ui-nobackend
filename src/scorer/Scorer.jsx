import React from 'react';
import ScoreBoard from './Scoreboard';
import RunRecorder from './RunRecorder';

const Scorer = () => (
  <div className="center">
    <ScoreBoard pageName="scorer"/>
    <RunRecorder />

  </div>
);

export default Scorer;
