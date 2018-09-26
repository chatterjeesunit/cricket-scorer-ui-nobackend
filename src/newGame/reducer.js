import initialState from './defaultData';
import { selectNewBatsmanAction } from '../home/actions';
import { PlayerStatus } from './gameConstants';
import { updatePlayerStatus, updateRuns, updateBalls, updatePlayer, getCurrentOverScore } from '../utils/gameHelper';

function getTotalRuns(team, isTeamBatting, action) {
  return team.totalRun + (isTeamBatting ? action.currentRun + updateRuns(action.extras) : 0);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECORD_SCORE': {
      const isTeam1Batting = state.team1.isBatting;

      const isNewBatsModalOpen = !state.appState.isNewBatsmanModalOpen
        && action.isCurrentBatsmanOut;

      let currentBallUpdateStr = action.currentRun;
      if (action.isCurrentBatsmanOut) {
        currentBallUpdateStr = action.currentRun === 0 ? 'W' : (`${action.currentRun}W`);
      }

      return {
        ...state,
        appState: {
          ...state.appState,
          isNewBatsmanModalOpen: isNewBatsModalOpen,
        },
        team1: {
          ...state.team1,
          totalWickets: isTeam1Batting && action.isCurrentBatsmanOut ?
            state.team1.totalWickets + 1 : state.team1.totalWickets,
          totalRun: getTotalRuns(state.team1, isTeam1Batting, action),
          totalBalls: state.team1.totalBalls + (isTeam1Batting ? updateBalls(action.extras) : 0),
          players: updatePlayer(
            isTeam1Batting, state.team1.players,
            action.currentRun, action.isCurrentBatsmanOut,
            action.extras,
          ),
        },
        team2: {
          ...state.team2,
          totalWickets: !isTeam1Batting && action.isCurrentBatsmanOut ?
            state.team2.totalWickets + 1 : state.team2.totalWickets,
          totalRun: getTotalRuns(state.team2, !isTeam1Batting, action),
          totalBalls: state.team2.totalBalls + (isTeam1Batting ? 0 : updateBalls(action.extras)),
          players: updatePlayer(
            (!isTeam1Batting), state.team2.players,
            action.currentRun, action.isCurrentBatsmanOut,
            action.extras,
          ),
        },
        currentOverScore:
          getCurrentOverScore(
            state.currentOverScore, currentBallUpdateStr,
            isTeam1Batting ? state.team1.totalBalls : state.team2.totalBalls,
          ),
      };
    }
    case selectNewBatsmanAction.type: {
      const obj = {
        ...state,
        appState: {
          ...state.appState,
          isNewBatsmanModalOpen: false,
        },
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
