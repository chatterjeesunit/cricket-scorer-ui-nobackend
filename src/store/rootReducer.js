import { combineReducers } from 'redux';
import gameInformationReducer from '../newGame/reducer';

const rootReducer = combineReducers({
  gameInformation: gameInformationReducer,
});

export default rootReducer;
