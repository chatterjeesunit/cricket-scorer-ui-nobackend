import reducer from './reducer';
import PlayerStatus from './gameConstants';
import { selectNewBatsmanAction } from "../home/actions"
import initialState from './defaultData';

describe('gameInformation/reducer', () => {
  it('should return initial state of 11 players in each team', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});



describe('newBatsmanSelection/reducer', () => {
  it('selected player in batting team should become the Striker', () => {
    const selectedPlayer = '3';

    let newState = {
      ...initialState,
      team1: {
        ...initialState.team1,
        isBatting : false
      },
      team2: {
        ...initialState.team2,
        isBatting : true
      }

    }
    selectNewBatsmanAction.batsmanId = selectedPlayer;
    let actualValueReturned = reducer(newState, selectNewBatsmanAction);

    let battingTeam = actualValueReturned.team1.isBatting ? actualValueReturned.team1 : actualValueReturned.team2;
    let isSelectedPlayerAStriker = battingTeam
      .players
      .filter(player => player.id === selectedPlayer
        && player.status === PlayerStatus.STRIKER
      ).length == 1;

    expect(isSelectedPlayerAStriker).toEqual(true);
  });



  
  it('player in bowling team should not be updated as Striker', () => {
    const selectedPlayer = '3';
    selectNewBatsmanAction.batsmanId = selectedPlayer;
    let actualValueReturned = reducer(undefined, selectNewBatsmanAction);
    let bowlingTeam = !actualValueReturned.team1.isBatting ? actualValueReturned.team1 : actualValueReturned.team2;

    let isSelectedPlayerNotAStriker = bowlingTeam
      .players
      .filter(player => player.id === selectedPlayer
        && player.status === PlayerStatus.STRIKER
      ).length == 0;

    expect(isSelectedPlayerNotAStriker).toEqual(true);
  });
});
