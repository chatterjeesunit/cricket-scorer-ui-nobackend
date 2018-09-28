import history from '../routes/history';
import { Routes } from '../routes/routes';

const CREATE_GAME = 'CREATE_GAME';

const createGameAction = () => (dispatch) => {
  dispatch({ type: CREATE_GAME });
  history.push(Routes.SCORER);
};

const selectNewBatsmanAction = {
  type: 'SELECT_NEW_BATSMAN',
};

const recordScore = (run, isOut, extra) => ({
  type: 'RECORD_SCORE',
  currentRun: run,
  isCurrentBatsmanOut: isOut,
  extras: extra,
});

const selectNewBowlerAction = {
  type: 'SELECT_NEW_BOWLER',
};

export {
  CREATE_GAME, createGameAction,
  recordScore, selectNewBatsmanAction, selectNewBowlerAction,
};
