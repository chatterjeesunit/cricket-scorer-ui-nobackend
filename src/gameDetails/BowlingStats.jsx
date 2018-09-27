import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { totalOversPassed } from '../utils/gameHelper';
import { PlayerStatus } from '../newGame/gameConstants';

const createTable = bowlingTeam => (
  <tbody>
    {
      bowlingTeam.players
        .filter(player => player.ballsBowled > 0 || player.status === PlayerStatus.BOWLING)
        .map(player =>
          (
            <tr>
              <td>{player.name}</td>
              <td>{totalOversPassed(player.ballsBowled)}</td>
              <td>{player.numberOfMaidens}</td>
              <td>{player.runsGiven}</td>
              <td>{player.wicketsTaken}</td>
            </tr>
          ))
    }
  </tbody>
);

const BowlingStats = props => (
  <div className="container">
    <div className="row">
      <div className="col-md-10 offset-1">
        <h5> Bowling Table</h5>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr className="info">
              <th>Bowler</th>
              <th>Overs</th>
              <th>Maiden</th>
              <th>Run</th>
              <th>Wickets</th>
            </tr>
          </thead>
          {createTable(props.bowlingTeam)}
        </table>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => {
  let bowlingTeam;

  if (state.gameInformation.team1.isBatting === false) {
    bowlingTeam = state.gameInformation.team1;
  } else {
    bowlingTeam = state.gameInformation.team2;
  }
  return { bowlingTeam };
};

export default connect(mapStateToProps)(BowlingStats);
