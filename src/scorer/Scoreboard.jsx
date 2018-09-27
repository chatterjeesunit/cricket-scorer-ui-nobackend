import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { PlayerStatus } from '../newGame/gameConstants';
import { totalOversPassed } from '../utils/gameHelper';

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

  const batsmen = battingTeam.players.filter(player =>
    player.status === PlayerStatus.STRIKER || player.status === PlayerStatus.NON_STRIKER);

  currentBatsman.player1 = batsmen[0].name;
  currentBatsman.player2 = batsmen[1].name;

  currentBatsman.player1Class = batsmen[0].status === PlayerStatus.STRIKER ? 'badge badge-dark' : 'badge badge-light';
  currentBatsman.player2Class = batsmen[1].status === PlayerStatus.STRIKER ? 'badge badge-dark' : 'badge badge-light';

  return currentBatsman;
};

const getSecondTeamStats = (props) => {
  if (props.pageName == 'gameDetails') {
    return <b className="currentBattingTeam">{`${props.battingTeam.totalRun}/${props.battingTeam.totalWickets}  in  ${totalOversPassed(props.battingTeam.totalBalls)}/${props.maxOvers}`}</b>;
  } else if (props.pageName == 'scorer') {
    return isBowlingTeamAlreadyPlayed(props.bowlingTeam);
  }
}

const getCurrentBatsman = (props) => {
  if (props.pageName === 'scorer') {
    return (
      <div>
        <Row>
          <Col md={{ size: 8, offset: 2 }} sm="12">
            <Row>
              <Col md={{ size: 4 }} sm={{ size: 6 }} className="scoreBoard">
                <b>This Over</b>
              </Col>
              <Col md={{ size: 6 }} sm={{ size: 6 }}>
                {displayCurrentOverScore(props.currentOverScore)}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }} sm="12">
            <Row>
              <Col md={{ size: 4 }} sm={{ size: 6 }} className="scoreBoard">
                <b>Bowler:</b>
              </Col>
              <Col md={{ size: 6 }} sm={{ size: 6 }} className="scoreBoard">
                {displayCurrentBowlerName(props.bowlingTeam)}
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={{ size: 8, offset: 2 }} sm="12">
            <b>This ball</b>
            <br />
          </Col>
          <Col md={{ size: 8, offset: 2 }} sm="12">
            <Col md={{ size: 6 }} sm="12" className="badge-wrapper">
              <div className={displayStriker(props.battingTeam).player1Class}>
                {displayStriker(props.battingTeam).player1}
              </div>
            </Col>
            <Col md={{ size: 6 }} sm="12" className="badge-wrapper">
              <div className={displayStriker(props.battingTeam).player2Class}>
                {displayStriker(props.battingTeam).player2}
              </div>
            </Col>
          </Col>
        </Row>
        <br />
      </div>
    );
  }
  return '';
}

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
            {getSecondTeamStats(props)}
          </Col>
        </Row>
      </Col>
    </Row>
    <br />
    {getCurrentBatsman(props)}
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
