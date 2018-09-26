import initialState from './defaultData';
import { selectNewBatsmanAction } from '../home/actions';
import PlayerStatus from './gameConstants';
import { updatePlayerStatus, updateBattingPlayerScore, updateBowlingPlayerScore } from '../utils/gameHelper';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECORD_SCORE': {
      const isTeam1Batting = state.team1.isBatting;
      const isNewBatsModalOpen = !state.appState.isNewBatsmanModalOpen
        && action.isCurrentBatsmanOut;
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
          totalRun: state.team1.totalRun + (isTeam1Batting ? action.currentRun : 0),
          totalBalls: state.team1.totalBalls + (isTeam1Batting ? 1 : 0),
          players: isTeam1Batting ?
            updateBattingPlayerScore(state.team1.players, action.currentRun) :
            updateBowlingPlayerScore(state.team1.players, action.currentRun),
        },
        team2: {
          ...state.team2,
          totalWickets: !isTeam1Batting && action.isCurrentBatsmanOut ?
            state.team2.totalWickets + 1 : state.team2.totalWickets,
          totalRun: state.team2.totalRun + (isTeam1Batting ? 0 : action.currentRun),
          totalBalls: state.team2.totalBalls + (isTeam1Batting ? 0 : 1),
          players: isTeam1Batting ?
            updateBowlingPlayerScore(state.team2.players, action.currentRun) :
            updateBattingPlayerScore(state.team2.players, action.currentRun),
        },
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
