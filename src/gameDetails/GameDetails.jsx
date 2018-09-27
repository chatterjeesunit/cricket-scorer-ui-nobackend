import React from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import { Routes } from '../routes/routes';
import ScoreBoard from '../scorer/Scoreboard'

const GameDetails = (props) => (
  <div className="center">
    <Container>
      <Row>
        <Col md={{ size: 8, offset: 2 }} sm={{ size: 12 }} className="scoreBoard">
          <Button className="button" size="lg" color="info" href={"#" + Routes.SCORER}>Back</Button>
        </Col>
      </Row>
      <ScoreBoard pageName="gameDetails" />
    </Container>
  </div>
);

export default GameDetails;
