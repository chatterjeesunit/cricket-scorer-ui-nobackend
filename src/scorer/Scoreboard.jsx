import React from 'react';
import { Container, Row, Col, Badge } from 'reactstrap';
import { connect } from 'react-redux';
import PlayerStatus from '../newGame/gameConstants';

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
  const currentBatsman = { striker: '', nonStriker: '' };
  for (let idx = 0; idx < battingTeam.players.length; idx += 1) {
    if (battingTeam.players[idx].status === PlayerStatus.STRIKER) {
      currentBatsman.striker = battingTeam.players[idx].name;
    }
    if (battingTeam.players[idx].status === PlayerStatus.NON_STRIKER) {
      currentBatsman.nonStriker = battingTeam.players[idx].name;
    }
  }
  return currentBatsman;
};

const ScoreBoard = props => (
  <Container>
    <br />
    <Row>
      <Col md={{ size: 8, offset: 2 }}>
        <Row>
          <Col md="5" xs="4">
            <b className="currentBattingTeam">{props.battingTeam.name}</b>
          </Col>
          <Col style={{ textAlign: 'right' }}>
            <b className="currentBattingTeam">{`${props.battingTeam.totalRun}/${props.battingTeam.totalWickets}  in  ${totalOversPassed(props.battingTeam.totalBalls)}/${props.maxOvers}`}</b>
          </Col>
        </Row>
      </Col>
    </Row>

    <Row>
      <Col md={{ size: 8, offset: 2 }} sm="12">
        <Row>
          <Col className="scoreBoard">
            {isBowlingTeamAlreadyPlayed(props.bowlingTeam)}
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
            {displayCurrentOverScore(props.currentOverScore)}
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
            {displayCurrentBowlerName(props.bowlingTeam)}
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
          <Badge color="light">{displayStriker(props.battingTeam).nonStriker}</Badge>
        </Col>
        <Col md={{ size: 6 }} sm="12" className="badge-wrapper">
          <Badge color="dark">{displayStriker(props.battingTeam).striker}</Badge>
        </Col>
      </Col>
    </Row>
    <br />
    <br />
  </Container>
);


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
