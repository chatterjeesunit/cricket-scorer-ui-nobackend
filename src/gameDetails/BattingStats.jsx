import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { ExtraTypes, PlayerStatus } from '../newGame/gameConstants';

const calculateStrikeRate = (runsScored, ballsFaced) => {
  if (ballsFaced === 0) {
    return 0;
  }
  return (100 * (runsScored / ballsFaced)).toFixed(2);
};

const createTable = (battingTeam) => {

  let striker = battingTeam.players.filter(player => player.status === PlayerStatus.STRIKER)[0];
  let nonStriker = battingTeam.players.filter(player => player.status === PlayerStatus.NON_STRIKER)[0];
  return (
    <tbody>
      <tr>
        <td><b>{striker.name}*</b></td>
        <td>{striker.runsScored}</td>
        <td>{striker.ballsFaced}</td>
        <td>{striker.numberOfFours}</td>
        <td>{striker.numberOfSixes}</td>
        <td>{calculateStrikeRate(striker.runsScored, striker.ballsFaced)}</td>
      </tr>
      <tr>
        <td><b>{nonStriker.name}</b></td>
        <td>{nonStriker.runsScored}</td>
        <td>{nonStriker.ballsFaced}</td>
        <td>{nonStriker.numberOfFours}</td>
        <td>{nonStriker.numberOfSixes}</td>
        <td>{calculateStrikeRate(nonStriker.runsScored, nonStriker.ballsFaced)}</td>
      </tr>
      {
        battingTeam.players.filter(player => player.status === PlayerStatus.OUT)
          .map((player) =>
            <tr>
              <td>{player.name}</td>
              <td>{player.runsScored}</td>
              <td>{player.ballsFaced}</td>
              <td>{player.numberOfFours}</td>
              <td>{player.numberOfSixes}</td>
              <td>{calculateStrikeRate(player.runsScored, player.ballsFaced)}</td>
            </tr>
          )
      }
    </tbody>
  );
};

class BattingStats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container">
        <h5>Batting Table</h5>
        <table class="table table-striped">
          <thead class = "thead-dark"> 
            <tr class="info">
              <th>Batsman</th>
              <th>Runs</th>
              <th>Balls</th>
              <th>Fours</th>
              <th>Sixes</th>
              <th>StrikeRate</th>
            </tr>
          </thead>
          {createTable(this.props.battingTeam)}


        </table>


        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let battingTeam;

  if (state.gameInformation.team1.isBatting === true) {
    battingTeam = state.gameInformation.team1;
  } else {
    battingTeam = state.gameInformation.team2;
  }
  return { battingTeam };
};

export default connect(mapStateToProps)(BattingStats);
