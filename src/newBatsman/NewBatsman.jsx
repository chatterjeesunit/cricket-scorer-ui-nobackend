import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';
import { selectNewBatsmanAction } from '../home/actions';
import PlayerStatus from '../newGame/gameConstants';

const NewBatsman = props => (
  <div>
    <form>
      <ModalHeader>Select Next Batsman for {props.teamName}</ModalHeader>
      <ModalBody>
        <Container>
          {
            props.players.map(player => (
              <Row>

                <Col>
                  <input
                    type="radio"
                    name="1"
                    value={player.id}
                    onClick={(event) => {
                    this.selectedBatsman = event.target.value;
                  }}
                  />
                  <label>&nbsp;&nbsp;&nbsp;{player.name}</label>
                </Col>

              </Row>
            ))
          }
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={props.onSelectBatsman}
        >
        Submit
        </Button>
      </ModalFooter>
    </form>
  </div>
);

const mapStateToProps = (state) => {
  const battingTeam =
    state.gameInformation.team1.isBatting ?
      state.gameInformation.team1 : state.gameInformation.team2;

  return {
    teamName: battingTeam.name,
    players: [
      ...battingTeam.players.filter(player => player.status === PlayerStatus.YET_TO_PLAY),
    ],
  };
};

const mapDispatchToProps = dispatch => ({
  onSelectBatsman: () => {
    selectNewBatsmanAction.batsmanId = this.selectedBatsman;
    dispatch(selectNewBatsmanAction);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewBatsman);
