import React from 'react';
import ScoreBoard from './Scoreboard';
import RunRecorder from './RunRecorder';
import Heading from '../home/Heading';

const Scorer = () => (
  <div className="center">
    <Heading />
    <ScoreBoard pageName="scorer" />
    <RunRecorder />
  </div>
);

export default Scorer;
