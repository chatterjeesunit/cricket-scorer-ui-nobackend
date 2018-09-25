import initialState from './defaultData';
import { selectNewBatsmanAction } from '../home/actions';
import PlayerStatus from './gameConstants';
import { updatePlayerStatus, updateBattingPlayerScore, updateBowlingPlayerScore } from '../utils/gameHelper';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECORD_SCORE': {
      const isTeam1Batting = state.team1.isBatting;

      const newState = {
        ...state,
        team1: {
          ...state.team1,
          totalRun: state.team1.totalRun + (isTeam1Batting ? action.currentRun : 0),
          totalBalls: state.team1.totalBalls + (isTeam1Batting ? 1 : 0),
          players: state.team1.isBatting ?
            updateBattingPlayerScore(state.team1.players, action.currentRun) :
            updateBowlingPlayerScore(state.team1.players, action.currentRun),
        },
        team2: {
          ...state.team2,
          totalRun: state.team2.totalRun + (isTeam1Batting ? 0 : action.currentRun),
          totalBalls: state.team2.totalBalls + (isTeam1Batting ? 0 : 1),
          players: state.team1.isBatting ?
            updateBowlingPlayerScore(state.team2.players, action.currentRun) :
            updateBattingPlayerScore(state.team2.players, action.currentRun),
        },
      };

      return newState;
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
