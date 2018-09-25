import { initialState } from './defaultData';
import { selectNewBatsmanAction } from '../home/actions';
import PlayerStatus from './gameConstants';
import updatePlayerStatus from '../utils/gameHelper';


const reducer = (state = initialState, action) => {
  switch (action.type) {
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
