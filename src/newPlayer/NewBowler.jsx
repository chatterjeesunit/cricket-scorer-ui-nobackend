import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { selectNewBowlerAction } from '../home/actions';
import { PlayerStatus } from '../newGame/gameConstants';

class NewBowler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBowler: props.players.length === 0 ? undefined : props.players[0].id,
      previousBowler:props.previousBowler[0].id,
    };
    // console.log('previous bowler' + props.previousBowler[0].name);
  }
  render() {
    return (
      <div>
        <form>
          <ModalHeader> Select New bowler for the match</ModalHeader>
          <ModalBody >
            <Container>
              {
                this.props.players.map(player => (
                  <Row>
                    <Col>
                      <input
                        type="radio"
                        name="playerSelection"
                        checked={player.id === this.state.selectedBowler}
                        value={player.id}
                        onClick={(event) => {
                            this.setState({
                                selectedBowler: event.target.value,
                              });
                        }}
                      />
                      <label>&nbsp;&nbsp;&nbsp;{player.name}</label>
                    </Col>
                  </Row>
                ))
            }
            </Container>
          </ModalBody>
          <ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                disabled={this.state.selectedBowler === undefined}
                onClick={() => this.props.onSelectedBowler(this.state)
              }
              >Select
              </Button>
            </ModalFooter>
          </ModalBody>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const bowlingTeam = state.gameInformation.team1.isBatting ?
    state.gameInformation.team2 : state.gameInformation.team1;

  return {
    teamName: bowlingTeam.name,
    players: [
      ...bowlingTeam.players.filter(player => player.status !== PlayerStatus.BOWLING),
    ],
    previousBowler: bowlingTeam.players.filter(player => player.status === PlayerStatus.BOWLING),
  };
};

const mapDispatcherToProps = dispatch => ({
  onSelectedBowler: (state) => {
    selectNewBowlerAction.bowlerId = state.selectedBowler;
    selectNewBowlerAction.previousBowlerId = state.previousBowler;
    dispatch(selectNewBowlerAction);
  },
});


export default connect(mapStateToProps, mapDispatcherToProps)(NewBowler);
