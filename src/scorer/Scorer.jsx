import React from 'react';
import ScoreBoard from './Scoreboard';
import RunRecorder from './RunRecorder';
import '../css/style.css';

const Scorer = () => (
  <div className="center">
    <ScoreBoard />
    <RunRecorder />
  </div>
);

export default Scorer;
