import React from 'react';
import Button from 'reactstrap/lib/Button';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import './Home.css';
import { createGameAction } from "./actions";
import { connect } from 'react-redux';
import BattingStats from '../gameDetails/BattingStats';

const Home = (props) =>
  <Container className="h-100">
    <Row className="align-items-center h-100">
      <Col className="text-center">
        <Button color="primary" onClick={props.createGame}>Create Game</Button>
      </Col>
    </Row>
  </Container>;

const mapDispatchToProps = (dispatch) => ({
  createGame: () => dispatch(createGameAction())
});

export default connect(undefined, mapDispatchToProps)(Home);