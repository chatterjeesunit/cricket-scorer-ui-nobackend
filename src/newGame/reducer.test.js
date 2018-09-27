import reducer from './reducer';
import { PlayerStatus, ExtraTypes } from './gameConstants';
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

    const newTeam1 = { ...initialState.team2 };
    const newTeam2 = { ...initialState.team1 };
    const newState = {
      ...initialState,
      team1: newTeam1,
      team2: newTeam2,
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

  it('new batsman modal should be open when batsman gets out', () => {
    const localState = { ...initialState };
    expect(reducer(
      localState,
      recordScore(undefined, true),
    ).appState.isNewBatsmanModalOpen).toEqual(true);
  });

  it('new batsman modal should be close when new batsman is selected', () => {
    const localState = {
      ...initialState,
      appState: {
        isNewBatsmanModalOpen: true,
      },
    };

    selectNewBatsmanAction.batsmanId = '3';
    expect(reducer(
      localState,
      selectNewBatsmanAction,
    ).appState.isNewBatsmanModalOpen).toEqual(false);
  });

  it('new batsman modal should not open when the last batsman gets out', () => {
    const localState = {
      ...initialState,
      team1: {
        ...initialState.team1,
        totalWickets: 9,
      },
    };

    expect(reducer(
      localState,
      recordScore(undefined, true),
    ).appState.isNewBatsmanModalOpen).toEqual(false);
  });
});

describe('record score/reducer', () => {
  it('should return initial state of 11 players in each team', () => {
    expect(reducer(undefined, { CREATE_GAME })).toEqual(initialState);
  });

  it('test total score updated for the batting team', () => {
    const localState = { ...initialState };
    expect(reducer(localState, recordScore(4)).team1.totalRun).toEqual(4);
  });

  it('test total score not updated for the bowling team', () => {
    const localState = { ...initialState };
    expect(reducer(localState, recordScore(4)).team2.totalRun).toEqual(initialState.team2.totalRun);
  });

  it('test the current score of the batsman', () => {
    const localState = { ...initialState };
    expect(reducer(localState, recordScore(2)).team1.players[0].runsScored).toEqual(2);
  });

  it('test the current ball faced by current player', () => {
    const localState = { ...initialState };
    expect(reducer(localState, recordScore(2)).team1.players[0].ballsFaced).toEqual(1);
  });

  it('test the current player 4s updated', () => {
    const localState = { ...initialState };
    expect(reducer(localState, recordScore(4)).team1.players[0].numberOfFours).toEqual(1);
  });

  it('test the current player 6s updated', () => {
    const localState = { ...initialState };
    expect(reducer(localState, recordScore(6)).team1.players[0].numberOfSixes).toEqual(1);
  });

  it('current bowler run given', () => {
    const localState = { ...initialState };
    expect(reducer(localState, recordScore(4)).team2.players[0].runsGiven).toEqual(4);
  });

  it('Current bowler ball bowled', () => {
    const localState = { ...initialState };
    expect(reducer(localState, recordScore(2)).team2.players[0].ballsBowled).toEqual(1);
  });

  it('Current over score of first ball', () => {
    const localState = { ...initialState };
    expect(reducer(localState, recordScore(2)).currentOverScore[0]).toEqual(2);
  });
});

describe('Batsman Out/reducer', () => {
  it('should update the wicket for team1 only when team1 is batting', () => {
    const localState = { ...initialState };

    expect(reducer(localState, recordScore(0, true)).team1.totalWickets)
      .toEqual(initialState.team1.totalWickets + 1);

    expect(reducer(localState, recordScore(0, true)).team2.totalWickets)
      .toEqual(initialState.team2.totalWickets);
  });

  it('should update the wicket for team2 only when team2 is batting', () => {
    const newTeam1 = { ...initialState.team2 };
    const newTeam2 = { ...initialState.team1 };
    const localState = {
      ...initialState,
      team1: newTeam1,
      team2: newTeam2,
    };

    expect(reducer(localState, recordScore(0, true)).team1.totalWickets)
      .toEqual(newTeam1.totalWickets);

    expect(reducer(localState, recordScore(0, true)).team2.totalWickets)
      .toEqual(newTeam2.totalWickets + 1);
  });

  it('should change the current batsman status to OUT when team1 is batting', () => {
    const localState = { ...initialState };

    const currentBatsman = localState.team1.players.filter(player =>
      player.status === PlayerStatus.STRIKER)[0];

    const actualValueReturned = reducer(localState, recordScore(0, true));

    expect(actualValueReturned.team1.players.filter(player =>
      player.id === currentBatsman.id)[0].status)
      .toEqual(PlayerStatus.OUT);
  });

  it('should update the wickets for bowler in bowling team', () => {
    const localState = { ...initialState };

    const currentBowler = localState.team2.players.filter(player =>
      player.status === PlayerStatus.BOWLING)[0];

    const actualValueReturned = reducer(localState, recordScore(0, true));

    expect(actualValueReturned.team2.players.filter(player =>
      player.id === currentBowler.id)[0].wicketsTaken).toEqual(currentBowler.wicketsTaken + 1);
  });

  it('should update the wicket in current over details', () => {
    const localState = { ...initialState };
    const actualValueReturned = reducer(localState, recordScore(0, true));
    expect(actualValueReturned.currentOverScore[actualValueReturned.currentOverScore.length - 1])
      .toEqual('W');
  });

  it('should update the wicket and runs in current over details', () => {
    const localState = { ...initialState };
    const actualValueReturned = reducer(localState, recordScore(2, true));
    expect(actualValueReturned.currentOverScore[actualValueReturned.currentOverScore.length - 1])
      .toEqual('2W');
  });

  it('should update the Wide in current over details', () => {
    const localState = { ...initialState };
    const actualValueReturned = reducer(localState, recordScore(0, false, ExtraTypes.WIDE));
    expect(actualValueReturned.currentOverScore[actualValueReturned.currentOverScore.length - 1])
      .toEqual('Wd');
  });

  it('should update the Wide and runs in current over details', () => {
    const localState = { ...initialState };
    const actualValueReturned = reducer(localState, recordScore(2, false, ExtraTypes.WIDE));
    expect(actualValueReturned.currentOverScore[actualValueReturned.currentOverScore.length - 1])
      .toEqual('2Wd');
  });

  it('should update the No Ball in current over details', () => {
    const localState = { ...initialState };
    const actualValueReturned = reducer(localState, recordScore(0, false, ExtraTypes.NO_BALL));
    expect(actualValueReturned.currentOverScore[actualValueReturned.currentOverScore.length - 1])
      .toEqual('Nb');
  });

  it('should update the No ball and runs in current over details', () => {
    const localState = { ...initialState };
    const actualValueReturned = reducer(localState, recordScore(2, false, ExtraTypes.NO_BALL));
    expect(actualValueReturned.currentOverScore[actualValueReturned.currentOverScore.length - 1])
      .toEqual('2Nb');
  });

  it('should update the Bies in current over details', () => {
    const localState = { ...initialState };
    const actualValueReturned = reducer(localState, recordScore(0, false, ExtraTypes.BIES));
    expect(actualValueReturned.currentOverScore[actualValueReturned.currentOverScore.length - 1])
      .toEqual('B');
  });

  it('should update the Bies and runs in current over details', () => {
    const localState = { ...initialState };
    const actualValueReturned = reducer(localState, recordScore(2, false, ExtraTypes.BIES));
    expect(actualValueReturned.currentOverScore[actualValueReturned.currentOverScore.length - 1])
      .toEqual('2B');
  });

  it('should update the Leg Bies in current over details', () => {
    const localState = { ...initialState };
    const actualValueReturned = reducer(localState, recordScore(0, false, ExtraTypes.LB));
    expect(actualValueReturned.currentOverScore[actualValueReturned.currentOverScore.length - 1])
      .toEqual('Lb');
  });

  it('should update the Leg Bies and runs in current over details', () => {
    const localState = { ...initialState };
    const actualValueReturned = reducer(localState, recordScore(2, false, ExtraTypes.LB));
    expect(actualValueReturned.currentOverScore[actualValueReturned.currentOverScore.length - 1])
      .toEqual('2Lb');
  });

  it('should update the batsman score even if he took run and got out', () => {
    const localState = { ...initialState };
    const actualValueReturned = reducer(localState, recordScore(2, true));

    const currentBatsman = localState.team1.players.filter(player =>
      player.status === PlayerStatus.STRIKER)[0];

    expect(actualValueReturned.team1.players.filter(player =>
      player.id === currentBatsman.id)[0].runsScored).toEqual(currentBatsman.runsScored + 2);
  });

  it('Current ball is wide with no run', () => {
    const localState = { ...initialState };
    expect(reducer(localState, recordScore(0, false, ExtraTypes.WIDE)).team1.totalRun).toEqual(1);
    expect(reducer(localState, recordScore(0, false, ExtraTypes.WIDE)).team1.totalBalls).toEqual(0);
    expect(reducer(localState, recordScore(0, false, ExtraTypes.WIDE))
      .team1.players[0].runsScored).toEqual(0);
    expect(reducer(localState, recordScore(0, false, ExtraTypes.WIDE))
      .team1.players[0].ballsFaced).toEqual(0);
    expect(reducer(localState, recordScore(0, false, ExtraTypes.WIDE))
      .team1.players[0].numberOfSixes).toEqual(0);
    expect(reducer(localState, recordScore(0, false, ExtraTypes.WIDE))
      .team1.players[0].numberOfFours).toEqual(0);
    expect(reducer(localState, recordScore(0, false, ExtraTypes.WIDE))
      .team2.players[0].ballsBowled).toEqual(0);
    expect(reducer(localState, recordScore(0, false, ExtraTypes.WIDE))
      .team2.players[0].runsGiven).toEqual(1);
  });

  it('Current ball is wide with totalRun as 2', () => {
    const localState = { ...initialState };
    localState.team1.totalRun = 2;
    localState.team1.totalBalls = 2;
    localState.team1.players[0].runsScored = 2;
    localState.team1.players[0].ballsFaced = 2;
    localState.team1.players[0].numberOfFours = 1;

    expect(reducer(localState, recordScore(0, false, ExtraTypes.WIDE)).team1.totalRun).toEqual(3);
    expect(reducer(localState, recordScore(0, false, ExtraTypes.WIDE)).team1.totalBalls).toEqual(2);
    expect(reducer(localState, recordScore(0, false, ExtraTypes.WIDE)).team1.players[0].runsScored)
      .toEqual(2);
    expect(reducer(localState, recordScore(0, false, ExtraTypes.WIDE))
      .team1.players[0].ballsFaced)
      .toEqual(2);
    expect(reducer(localState, recordScore(0, false, ExtraTypes.WIDE))
      .team1.players[0].numberOfSixes).toEqual(0);
    expect(reducer(localState, recordScore(4, false, ExtraTypes.WIDE))
      .team1.players[0].numberOfFours).toEqual(1);
    expect(reducer(localState, recordScore(0, false, ExtraTypes.WIDE))
      .team2.players[0].ballsBowled).toEqual(0);
    expect(reducer(localState, recordScore(0, false, ExtraTypes.WIDE))
      .team2.players[0].runsGiven).toEqual(1);
  });

  it('Current ball is No Ball with totalRun as 2', () => {
    const localState = { ...initialState };
    localState.team1.totalRun = 2;
    localState.team1.totalBalls = 2;
    localState.team1.players[0].runsScored = 2;
    localState.team1.players[0].ballsFaced = 2;
    localState.team1.players[0].numberOfFours = 1;
    localState.team2.players[0].ballsBowled = 2;
    localState.team2.players[0].runsGiven = 2;

    expect(reducer(localState, recordScore(1, false, ExtraTypes.NO_BALL))
      .team1.totalRun).toEqual(4);
    expect(reducer(localState, recordScore(1, false, ExtraTypes.NO_BALL))
      .team1.totalBalls).toEqual(2);
    expect(reducer(localState, recordScore(1, false, ExtraTypes.NO_BALL))
      .team1.players[0].runsScored).toEqual(4);
    expect(reducer(localState, recordScore(1, false, ExtraTypes.NO_BALL))
      .team1.players[0].ballsFaced).toEqual(2);
    expect(reducer(localState, recordScore(6, false, ExtraTypes.NO_BALL))
      .team1.players[0].numberOfSixes).toEqual(1);
    expect(reducer(localState, recordScore(4, false, ExtraTypes.NO_BALL))
      .team1.players[0].numberOfFours).toEqual(2);
    expect(reducer(localState, recordScore(1, false, ExtraTypes.NO_BALL))
      .team2.players[0].ballsBowled).toEqual(2);
    expect(reducer(localState, recordScore(0, false, ExtraTypes.NO_BALL))
      .team2.players[0].runsGiven).toEqual(3);
  });

  it('Current ball is LB with totalRun as 2', () => {
    const localState = { ...initialState };
    localState.team1.totalRun = 2;
    localState.team1.totalBalls = 2;
    localState.team1.players[0].runsScored = 2;
    localState.team1.players[0].ballsFaced = 2;
    localState.team1.players[0].numberOfFours = 1;
    localState.team2.players[0].ballsBowled = 2;
    localState.team2.players[0].runsGiven = 2;

    expect(reducer(localState, recordScore(2, false, ExtraTypes.LB))
      .team1.totalRun).toEqual(4);
    expect(reducer(localState, recordScore(2, false, ExtraTypes.LB))
      .team1.totalBalls).toEqual(3);
    expect(reducer(localState, recordScore(1, false, ExtraTypes.LB))
      .team1.players[0].runsScored).toEqual(2);
    expect(reducer(localState, recordScore(1, false, ExtraTypes.LB))
      .team1.players[0].ballsFaced).toEqual(3);
    expect(reducer(localState, recordScore(6, false, ExtraTypes.LB))
      .team1.players[0].numberOfSixes).toEqual(0);
    expect(reducer(localState, recordScore(4, false, ExtraTypes.LB))
      .team1.players[0].numberOfFours).toEqual(1);
    expect(reducer(localState, recordScore(1, false, ExtraTypes.LB))
      .team2.players[0].ballsBowled).toEqual(3);
    expect(reducer(localState, recordScore(0, false, ExtraTypes.LB))
      .team2.players[0].runsGiven).toEqual(2);
  });

  it('Current ball is Byes with totalRun as 2', () => {
    const localState = { ...initialState };
    localState.team1.totalRun = 2;
    localState.team1.totalBalls = 2;
    localState.team1.players[0].runsScored = 2;
    localState.team1.players[0].ballsFaced = 2;
    localState.team1.players[0].numberOfFours = 1;
    localState.team2.players[0].ballsBowled = 2;
    localState.team2.players[0].runsGiven = 2;

    expect(reducer(localState, recordScore(0, false, ExtraTypes.BIES)).team1.totalRun).toEqual(2);
    expect(reducer(localState, recordScore(0, false, ExtraTypes.BIES)).team1.totalBalls).toEqual(3);
    expect(reducer(localState, recordScore(1, false, ExtraTypes.BIES))
      .team1.players[0].runsScored).toEqual(2);
    expect(reducer(localState, recordScore(1, false, ExtraTypes.BIES))
      .team1.players[0].ballsFaced).toEqual(3);
    expect(reducer(localState, recordScore(6, false, ExtraTypes.BIES))
      .team1.players[0].numberOfSixes).toEqual(0);
    expect(reducer(localState, recordScore(4, false, ExtraTypes.BIES))
      .team1.players[0].numberOfFours).toEqual(1);
    expect(reducer(localState, recordScore(1, false, ExtraTypes.BIES))
      .team2.players[0].ballsBowled).toEqual(3);
    expect(reducer(localState, recordScore(0, false, ExtraTypes.BIES))
      .team2.players[0].runsGiven).toEqual(2);
  });
});
