import React from 'react';
import ScoreBoard from '../scorer/Scoreboard';
import BattingStats from './BattingStats';
import BowlingStats from './BowlingStats';
import Heading from '../home/Heading';

const GameDetails = props => (
  <div className="center">
    <Heading />
    <ScoreBoard pageName="gameDetails" />
    <BattingStats />
    <BowlingStats />
  </div>
);

export default GameDetails;
