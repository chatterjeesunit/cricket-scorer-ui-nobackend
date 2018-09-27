import React from 'react';
import { Button, Container } from 'reactstrap';
import { Routes } from '../routes/routes';
import ScoreBoard from '../scorer/Scoreboard';
import BattingStats from './BattingStats';

const GameDetails = (props) => (
  <div className="center">
    <Container>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-2">
            <div>
              <Button className="button" size="lg" color="info" href={"#" + Routes.SCORER}>Back</Button>
            </div>
          </div>
        </div>
      </div>
      <ScoreBoard pageName="gameDetails"/>
      <BattingStats />
    </Container>
  </div>

);

export default GameDetails;
