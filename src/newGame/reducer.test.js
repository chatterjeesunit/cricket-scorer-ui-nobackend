import reducer from './reducer';
import PlayerStatus from './gameConstants';
import initialState from './defaultData';
import { CREATE_GAME, recordScore, selectNewBatsmanAction } from '../home/actions';

describe('gameInformation/reducer', () => {
  it('should return initial state of 11 players in each team', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return given team1 name as India', () => {
    const modifiedState = reducer(undefined, {});
    expect(modifiedState.team1.name).toEqual('India');
  });

  it('should return given team2 name as Afghanistan', () => {
    const modifiedState = reducer(undefined, {});
    expect(modifiedState.team2.name).toEqual('Afghanistan');
  });
});

describe('newBatsmanSelection/reducer', () => {
  it('selected player in batting team should become the Striker', () => {
    const selectedPlayer = '3';

    const newState = {
      ...initialState,
      team1: {
        ...initialState.team1,
        isBatting: false,
      },
      team2: {
        ...initialState.team2,
        isBatting: true,
      },

    };
    selectNewBatsmanAction.batsmanId = selectedPlayer;
    const actualValueReturned = reducer(newState, selectNewBatsmanAction);

    const battingTeam = actualValueReturned.team1.isBatting ?
      actualValueReturned.team1 : actualValueReturned.team2;

    const isSelectedPlayerAStriker = battingTeam
      .players
      .filter(player => player.id === selectedPlayer
        && player.status === PlayerStatus.STRIKER).length === 1;

    expect(isSelectedPlayerAStriker).toEqual(true);
  });


  it('player in bowling team should not be updated as Striker', () => {
    const selectedPlayer = '3';
    selectNewBatsmanAction.batsmanId = selectedPlayer;
    const actualValueReturned = reducer(undefined, selectNewBatsmanAction);
    const bowlingTeam = !actualValueReturned.team1.isBatting ?
      actualValueReturned.team1 : actualValueReturned.team2;

    const isSelectedPlayerNotAStriker = bowlingTeam
      .players
      .filter(player => player.id === selectedPlayer
        && player.status === PlayerStatus.STRIKER).length === 0;

    expect(isSelectedPlayerNotAStriker).toEqual(true);
  });
});

describe('record score/reducer', () => {
  it('should return initial state of 11 players in each team', () => {
    expect(reducer(undefined, { CREATE_GAME })).toEqual(initialState);
  });

  it('test total score updated for the batting team', () => {
    const localState = Object.assign({}, initialState);
    expect(reducer(localState, recordScore(4)).team1.totalRun).toEqual(4);
  });

  it('test total score not updated for the bowling team', () => {
    const localState = Object.assign({}, initialState);
    expect(reducer(localState, recordScore(4)).team2.totalRun).toEqual(0);
  });

  it('test the current score of the batsman', () => {
    const localState = Object.assign({}, initialState);
    localState.team1.players[0].runsScored = 0;
    expect(reducer(localState, recordScore(2)).team1.players[0].runsScored).toEqual(2);
  });
});
