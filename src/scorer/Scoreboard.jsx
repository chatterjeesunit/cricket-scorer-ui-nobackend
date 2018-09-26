import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { PlayerStatus } from '../newGame/gameConstants';

const totalOversPassed = (totalBalls) => {
  let totalOvers = `${parseInt((totalBalls / 6), 10)}`;
  const ballsPlayedForCurrentOver = totalBalls % 6;

  if (ballsPlayedForCurrentOver !== 0) {
    totalOvers = `${totalOvers}.${ballsPlayedForCurrentOver}`;
  }
  return totalOvers;
};

const isBowlingTeamAlreadyPlayed = (bowlingTeam) => {
  if (bowlingTeam.totalBalls > 0) {
    return `${bowlingTeam.name}  scored ${bowlingTeam.totalRun}/${bowlingTeam.totalWickets}   in  ${totalOversPassed(bowlingTeam.totalBalls)} overs `;
  }
  return '';
};

const displayCurrentOverScore = (currentOverScore) => {
  let overscoreDisplay = '';
  for (let idx = 0; idx < currentOverScore.length; idx += 1) {
    overscoreDisplay = `${overscoreDisplay} ${currentOverScore[idx]} `;
  }

  return overscoreDisplay;
};

const displayCurrentBowlerName = (bowlingTeam) => {
  let currentBowlerName = 'None';
  for (let idx = 0; idx < bowlingTeam.players.length; idx += 1) {
    if (bowlingTeam.players[idx].status === PlayerStatus.BOWLING) {
      currentBowlerName = bowlingTeam.players[idx].name;
    }
  }
  return currentBowlerName;
};

const displayStriker = (battingTeam) => {
  const currentBatsman = {
    player1: '', player2: '', player1Class: '', player2Class: '',
  };
  for (let idx = 0; idx < battingTeam.players.length; idx += 1) {
    if (battingTeam.players[idx].status === PlayerStatus.STRIKER) {
      currentBatsman.player1 = battingTeam.players[idx].name;
      currentBatsman.player1Class = 'badge badge-dark';
    }
    if (battingTeam.players[idx].status === PlayerStatus.NON_STRIKER) {
      currentBatsman.player2 = battingTeam.players[idx].name;
      currentBatsman.player2Class = 'badge badge-light';
    }
  }
  return currentBatsman;
};

class ScoreBoard extends Component {
  render() {
    return (
      <Container>
        <br />
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <Row>
              <Col md="5" xs="4">
                <b className="currentBattingTeam">{this.props.battingTeam.name}</b>
              </Col>
              <Col style={{ textAlign: 'right' }}>
                <b className="currentBattingTeam">{`${this.props.battingTeam.totalRun}/${this.props.battingTeam.totalWickets}  in  ${totalOversPassed(this.props.battingTeam.totalBalls)}/${this.props.maxOvers}`}</b>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col md={{ size: 8, offset: 2 }} sm="12">
            <Row>
              <Col className="scoreBoard">
                {isBowlingTeamAlreadyPlayed(this.props.bowlingTeam)}
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={{ size: 8, offset: 2 }} sm="12">
            <Row>
              <Col md={{ size: 4 }} sm={{ size: 6 }} className="scoreBoard">
                This Over
              </Col>
              <Col md={{ size: 4 }} sm={{ size: 6 }}>
                {displayCurrentOverScore(this.props.currentOverScore)}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }} sm="12">
            <Row>
              <Col md={{ size: 4 }} sm={{ size: 6 }} className="scoreBoard">
                Bowler Name:
              </Col>
              <Col md={{ size: 4 }} sm={{ size: 6 }} className="scoreBoard">
                {displayCurrentBowlerName(this.props.bowlingTeam)}
              </Col>
            </Row>
          </Col>
        </Row>
        <br />

        <Row>
          <Col md={{ size: 8, offset: 2 }} sm="12">
            This ball
          </Col>
          <Col md={{ size: 8, offset: 2 }} sm="12">
            <Col md={{ size: 6 }} sm="12" className="badge-wrapper">
              <div className={displayStriker(this.props.battingTeam).player1Class}>
                {displayStriker(this.props.battingTeam).player1}
              </div>
            </Col>
            <Col md={{ size: 6 }} sm="12" className="badge-wrapper">
              <div className={displayStriker(this.props.battingTeam).player2Class}>
                {displayStriker(this.props.battingTeam).player2}
              </div>
            </Col>
          </Col>
        </Row>
        <br />
        <br />
      </Container>
    );
  }
}


const mapStateToProps = (state) => {
  let battingTeam;
  let bowlingTeam;
  if (state.gameInformation.team1.isBatting === true) {
    battingTeam = state.gameInformation.team1;
    bowlingTeam = state.gameInformation.team2;
  } else {
    battingTeam = state.gameInformation.team2;
    bowlingTeam = state.gameInformation.team1;
  }
  return {
    battingTeam,
    bowlingTeam,
    maxOvers: state.gameInformation.maxOvers,
    currentOverScore: state.gameInformation.currentOverScore,
  };
};

const connectedTeamInfo = connect(mapStateToProps)(ScoreBoard);
export default connectedTeamInfo;
