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

export { updatePlayerStatus, updateBattingPlayerScore, updateBowlingPlayerScore };
