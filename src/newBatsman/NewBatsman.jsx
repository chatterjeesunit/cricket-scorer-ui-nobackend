import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import React from 'react';
import { selectNewBatsmanAction } from '../home/actions';
import PlayerStatus from '../newGame/gameConstants';


const NewBatsman = props => (
  <div>
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <h3>Select next batsman for {props.teamName}</h3>
        </Col>
        <Col></Col>
      </Row>
      <form>
        <br />
        {
          props.players.map(player => (
          <Row>
            <Col/>

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

            <Col/>
          </Row>
          ),)
        }
        <br />
        <Row>
          <Col></Col>
          <Col>
            <button
              className="btn btn-outline-info button"
              id="submit"
              type="button"
              onClick={props.onSelectBatsman}
            >
              Submit
            </button>
          </Col>
          <Col></Col>
        </Row>
        
      </form>

    </Container>
  </div>

);

const mapStateToProps = (state) => {
  const battingTeam = state.gameInformation.team1.isBatting ? state.gameInformation.team1 : state.gameInformation.team2;
  return {
    teamName: battingTeam.name,
    players: [
      ...battingTeam.players.filter(player => player.status === PlayerStatus.YET_TO_PLAY),
    ],
  };
};

const mapDispatchToProps = (dispatch) => ({
    onSelectBatsman: () => {
      console.log(this.selectedBatsman);
      selectNewBatsmanAction.batsmanId = this.selectedBatsman;
      dispatch(selectNewBatsmanAction);
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(NewBatsman);
