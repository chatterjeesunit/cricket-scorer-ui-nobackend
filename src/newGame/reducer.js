import initialState from './defaultData';
import { selectNewBatsmanAction } from '../home/actions';
import PlayerStatus from './gameConstants';
import { updatePlayerStatus, updatePlayer, getCurrentOverScore } from '../utils/gameHelper';

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
          players: updatePlayer(
            isTeam1Batting, state.team1.players,
            action.currentRun, action.isCurrentBatsmanOut,
          ),
        },
        team2: {
          ...state.team2,
          totalWickets: !isTeam1Batting && action.isCurrentBatsmanOut ?
            state.team2.totalWickets + 1 : state.team2.totalWickets,
          totalRun: state.team2.totalRun + (isTeam1Batting ? 0 : action.currentRun),
          totalBalls: state.team2.totalBalls + (isTeam1Batting ? 0 : 1),
          players: updatePlayer(
            (!isTeam1Batting), state.team2.players,
            action.currentRun, action.isCurrentBatsmanOut,
          ),
        },
        currentOverScore:
        getCurrentOverScore(
          state.currentOverScore, action.currentRun,
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
