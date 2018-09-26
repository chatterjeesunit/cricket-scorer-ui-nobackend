import PlayerStatus from '../newGame/gameConstants';

function updatePlayerStatus(players, playerId, newStatus) {
  const updatedPlayers = [];
  players.forEach((player) => {
    const newPlayer = { ...player };

    if (newPlayer.id === playerId) {
      newPlayer.status = newStatus;
    }
    updatedPlayers.push(newPlayer);
  });

  return updatedPlayers;
}

function updateBattingPlayerScore(players, currentRun) {
  const updatedPlayers = [];
  players.forEach((player) => {
    const newPlayer = { ...player };
    if (newPlayer.status === PlayerStatus.STRIKER) {
      newPlayer.runsScored += currentRun;
      newPlayer.ballsFaced += 1;
      if (currentRun === 4) {
        newPlayer.numberOfFours += 1;
      }
      if (currentRun === 6) {
        newPlayer.numberOfSixes += 1;
      }
    }
    updatedPlayers.push(newPlayer);
  });

  return updatedPlayers;
}

function updateBowlingPlayerScore(players, currentRun) {
  const updatedPlayers = [];
  players.forEach((player) => {
    const newPlayer = { ...player };
    if (newPlayer.status === PlayerStatus.BOWLING) {
      newPlayer.runsGiven += currentRun;
      newPlayer.ballsBowled += 1;
    }
    updatedPlayers.push(newPlayer);
  });

  return updatedPlayers;
}

function updatePlayer(isBattingTeam, players, currentRun, isBatsmanOut) {
  if (isBatsmanOut && isBattingTeam) {
    const selectedPlayerId = players.filter(player =>
      player.status === PlayerStatus.STRIKER)[0].id;

    return updatePlayerStatus(players, selectedPlayerId, PlayerStatus.OUT);
  }

  return isBattingTeam ?
    updateBattingPlayerScore(players, currentRun) :
    updateBowlingPlayerScore(players, currentRun);
}

function getCurrentOverScore(currentOverArray, currentRun, battingTeamTotalBalls) {
  let overArray = [];

  if ((battingTeamTotalBalls) % 6 !== 0) {
    overArray = currentOverArray;
  }
  const runsForCurrentOver = overArray.concat([currentRun]);

  return runsForCurrentOver;
}

export {
  updatePlayerStatus, updatePlayer, getCurrentOverScore,
};
