import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { selectNewBatsmanAction } from '../home/actions';
import PlayerStatus from '../newGame/gameConstants';

class NewBatsman extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedBatsman: undefined,
    }
  }
  render() {
    return (
      <div>
        <form>
          <ModalHeader>Select Next Batsman for {this.props.teamName}</ModalHeader>
          <ModalBody>
            <Container>
              {
                this.props.players.map(player => (
                  <Row>

                    <Col>
                      <input
                        type="radio"
                        name="1"
                        value={player.id}
                        onClick={(event) => {
                          this.setState({
                              selectedBatsman: event.target.value
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
          <ModalFooter>
            <Button
              color="primary"
              disabled={this.state.selectedBatsman === undefined}
              onClick={() => this.props.onSelectBatsman(this.state)}
            >
              Submit
            </Button>
          </ModalFooter>
        </form>
      </div>
    );
  }
}

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
  onSelectBatsman: (state) => {
    selectNewBatsmanAction.batsmanId = state.selectedBatsman;
    dispatch(selectNewBatsmanAction);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewBatsman);
