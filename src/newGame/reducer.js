import initialState from './defaultData';
import { selectNewBatsmanAction } from '../home/actions';
import PlayerStatus from './gameConstants';
import updatePlayerStatus from '../utils/gameHelper';

function updateBattingTeam(team, run) {
  const currentTeam = team;
  currentTeam.totalRun += run;
  for (let index = 0; index < currentTeam.players.length; index += 1) {
    if (team.players[index].status === PlayerStatus.STRIKER) {
      currentTeam.players[index].runsScored += run;
      currentTeam.players[index].ballsFaced += 1;
      if (run === 4) {
        currentTeam.players[index].numberOfFours += 1;
      }
      if (run === 6) {
        currentTeam.players[index].numberOfSixes += 1;
      }
      break;
    }
  }
}

function updateBowlingTeam(team, run) {
  const currentTeam = team;
  for (let index = 0; index < currentTeam.players.length; index += 1) {
    if (team.players[index].status === PlayerStatus.BOWLING) {
      currentTeam.players[index].runsGiven += run;
      currentTeam.players[index].ballsBowled += 1;
      break;
    }
  }
}

function recordScore(clone, run) {
  if (clone.team1.isBatting) {
    updateBattingTeam(clone.team1, run);
    updateBowlingTeam(clone.team2, run);
  } else {
    updateBattingTeam(clone.team2, run);
    updateBowlingTeam(clone.team1, run);
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECORD_SCORE': {
      const stateClone = Object.assign({}, state);
      recordScore(stateClone, action.currentRun);
      return stateClone;
    }
    case selectNewBatsmanAction.type: {
      const obj = {
        ...state,
        team1: {
          ...state.team1,
          players: state.team1.isBatting ?
            updatePlayerStatus(state.team1.players, action.batsmanId, PlayerStatus.STRIKER) :
            state.team1.players,
        },
        team2: {
          ...state.team2,
          players: state.team2.isBatting ?
            updatePlayerStatus(state.team2.players, action.batsmanId, PlayerStatus.STRIKER) :
            state.team2.players,
        },
      };

      return obj;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
