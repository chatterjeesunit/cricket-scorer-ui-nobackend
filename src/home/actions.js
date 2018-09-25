import history from '../routes/history';
import { Routes } from '../routes/routes';

const CREATE_GAME = 'CREATE_GAME';

const createGameAction = () => (dispatch) => {
  dispatch({ type: CREATE_GAME });
  history.push(Routes.NEW_GAME);
};

const selectNewBatsmanAction = {
  type: 'SELECT_NEW_BATSMAN',
};

const recordScore = run => ({
  type: 'RECORD_SCORE',
  currentRun: run,
});

export { CREATE_GAME, createGameAction, recordScore, selectNewBatsmanAction };
