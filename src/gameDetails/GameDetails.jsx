import React from 'react';
import { Button } from 'reactstrap';
import { Routes } from '../routes/routes';
import { Container, Row, Col } from 'reactstrap';
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
      <ScoreBoard />
      <BattingStats />
    </Container>
  </div>

);

export default GameDetails;