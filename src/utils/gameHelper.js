import PlayerStatus from '../newGame/gameConstants';

function updatePlayerStatus(players, playerId, newStatus) {
  return [...players].map((player) => {
    const newPlayer = { ...player };
    if (newPlayer.id === playerId) {
      newPlayer.status = newStatus;
    }
    return newPlayer;
  });
}

function updateBattingPlayerScore(players, currentRun) {
  return [...players].map((player) => {
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
    return newPlayer;
  });
}

function updateBowlingPlayerScore(players, currentRun, isBatsmanOut) {
  return [...players].map((player) => {
    const newPlayer = { ...player };
    if (player.status === PlayerStatus.BOWLING) {
      newPlayer.runsGiven += currentRun;
      newPlayer.ballsBowled += 1;

      if (isBatsmanOut) {
        newPlayer.wicketsTaken += 1;
      }
    }
    return newPlayer;
  });
}

function updatePlayer(isBattingTeam, players, currentRun, isBatsmanOut) {
  const updatedPlayersList = isBattingTeam ?
    updateBattingPlayerScore(players, currentRun) :
    updateBowlingPlayerScore(players, currentRun, (!isBattingTeam && isBatsmanOut));

  if (isBatsmanOut && isBattingTeam) {
    const selectedPlayerId = updatedPlayersList.filter(player =>
      player.status === PlayerStatus.STRIKER)[0].id;
    return updatePlayerStatus(updatedPlayersList, selectedPlayerId, PlayerStatus.OUT);
  }

  return updatedPlayersList;
}

function getCurrentOverScore(currentOverArray, currentRun, battingTeamTotalBalls) {
  if ((battingTeamTotalBalls + 1) % 6 === 0) {
    return [];
  }

  return [...currentOverArray].concat([currentRun]);
}

export { updatePlayerStatus, updatePlayer, getCurrentOverScore };
