import initialState from './defaultData';
import { selectNewBatsmanAction, selectNewBowlerAction } from '../home/actions';
import { updatePlayerStatus, updateRuns, updateBalls, updatePlayer, getCurrentOverScore, updateBowlerStatus } from '../utils/gameHelper';
import { PlayerStatus, ExtraTypes } from './gameConstants';

function getTotalRuns(team, isTeamBatting, action) {
  return team.totalRun + (isTeamBatting ? action.currentRun + updateRuns(action.extras) : 0);
}

function getBallSummaryForExtras(action) {
  const EXTRAS_BIES = 'B';
  const EXTRAS_LB = 'Lb';
  const EXTRA_NO_BALL = 'Nb';
  const EXTRA_WIDE = 'Wd';
  let currentBallUpdateStr;
  switch (action.extras) {
    case ExtraTypes.BIES:
    {
      currentBallUpdateStr = EXTRAS_BIES;
      break;
    }
    case ExtraTypes.LB:
    {
      currentBallUpdateStr = EXTRAS_LB;
      break;
    }
    case ExtraTypes.NO_BALL:
    {
      currentBallUpdateStr = EXTRA_NO_BALL;
      break;
    }
    case ExtraTypes.WIDE:
    {
      currentBallUpdateStr = EXTRA_WIDE;
      break;
    }
    default:
    {
      currentBallUpdateStr = action.currentRun;
      break;
    }
  }
  return currentBallUpdateStr;
}

function createCurrentBallSummary(action) {
  let currentBallUpdateStr;
  const WICKET = 'W';

  if (action.isCurrentBatsmanOut) {
    currentBallUpdateStr = WICKET;
  } else {
    currentBallUpdateStr = getBallSummaryForExtras(action);
  }

  if (action.currentRun !== 0) {
    if ((action.extras !== undefined) || (action.isCurrentBatsmanOut)) {
      currentBallUpdateStr = `${action.currentRun}${currentBallUpdateStr}`;
    }
  }

  return currentBallUpdateStr;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECORD_SCORE': {
      const isTeam1Batting = state.team1.isBatting;
      const totalWickets = isTeam1Batting ? state.team1.totalWickets : state.team2.totalWickets;

      const isNewBatsModalOpen = !state.appState.isNewBatsmanModalOpen
        && action.isCurrentBatsmanOut && totalWickets < 9;

      const battingTeam = isTeam1Batting ? state.team1 : state.team2;
      const isNewBowlerSelectionModalOpen = (!state.appState.isNewBowlerModalOpen) &&
      (battingTeam.totalBalls !== 0) && ((battingTeam.totalBalls + 1) % 6 === 0)
      && action.extras !== ExtraTypes.WIDE &&
      action.extras !== ExtraTypes.NO_BALL;

      return {
        ...state,
        appState: {
          ...state.appState,
          isNewBatsmanModalOpen: isNewBatsModalOpen,
          isNewBowlerModalOpen: isNewBowlerSelectionModalOpen,
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
            isTeam1Batting ? state.team1.totalBalls : state.team2.totalBalls,
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
            isTeam1Batting ? state.team2.totalBalls : state.team1.totalBalls,
          ),
        },
        currentOverScore:
          getCurrentOverScore(
            state.currentOverScore, createCurrentBallSummary(action),
            isTeam1Batting ? state.team1.totalBalls : state.team2.totalBalls,
            action.extras,
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
            updatePlayerStatus(
              state.team1.players,
              action.batsmanId, PlayerStatus.STRIKER, state.team1.totalBalls,
            ) :
            state.team1.players,
        },
        team2: {
          ...state.team2,
          players: state.team2.isBatting ?
            updatePlayerStatus(
              state.team2.players,
              action.batsmanId,
              PlayerStatus.STRIKER,
              state.team2.totalBalls,
            ) :
            state.team2.players,
        },
      };

      return obj;
    }

    case selectNewBowlerAction.type: {
      const obj = {
        ...state,
        appState: {
          ...state.appState,
          isNewBowlerModalOpen: false,
        },
        team1: {
          ...state.team1,
          players: !state.team1.isBatting ?
            updateBowlerStatus(
              state.currentOverScore, state.team1.players,
              action.previousBowlerId, action.bowlerId,
            ) :
            state.team1.players,
        },
        team2: {
          ...state.team2,
          players: !state.team2.isBatting ?
            updateBowlerStatus(
              state.currentOverScore, state.team2.players,
              action.previousBowlerId, action.bowlerId,
            ) :
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
