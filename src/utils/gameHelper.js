import { PlayerStatus, ExtraTypes } from '../newGame/gameConstants';

function updatePlayerStatus(players, playerId, newStatus) {
  return [...players].map((player) => {
    const newPlayer = { ...player };
    if (newPlayer.id === playerId) {
      newPlayer.status = newStatus;
    }
    return newPlayer;
  });
}

function updateRuns(extras) {
  let runsScored;
  switch (extras) {
    case ExtraTypes.WIDE:
    case ExtraTypes.NO_BALL:
    {
      runsScored = 1;
      break;
    }
    default:
    {
      runsScored = 0;
    }
  }
  return runsScored;
}

function updateBalls(extras) {
  let extraBalls = 0;
  switch (extras) {
    case ExtraTypes.BIES:
    case ExtraTypes.LB:
    case undefined:
    {
      extraBalls = 1;
      break;
    }
    default:
    {
      break;
    }
  }
  return extraBalls;
}

function updateCurrentRunsWithExtras(currentRun, extras) {
  let extraBalls = 0;
  let total = 0;
  switch (extras) {
    case ExtraTypes.NO_BALL:
    {
      extraBalls = 1;
      total = extraBalls + currentRun;
      break;
    }
    case undefined:
    {
      total = currentRun;
      break;
    }
    default:
    {
      break;
    }
  }
  return total;
}

function updateBallFaced(extras) {
  let ballsFaced = 0;
  switch (extras) {
    case ExtraTypes.BIES:
    case ExtraTypes.LB:
    case undefined:
    {
      ballsFaced = 1;
      break;
    }
    default:
    {
      break;
    }
  }
  return ballsFaced;
}

function updateRunsGiven(currentRun, extras) {
  let totalRunsGiven = 0;
  switch (extras) {
    case ExtraTypes.WIDE:
    case ExtraTypes.NO_BALL:
    {
      totalRunsGiven = currentRun + 1;
      break;
    }
    case undefined:
    {
      totalRunsGiven = currentRun;
      break;
    }
    default:
    {
      break;
    }
  }
  return totalRunsGiven;
}

function isValidExtra(extra) {
  return (extra === undefined || extra === ExtraTypes.NO_BALL);
}

function updateBattingPlayerScore(players, currentRun, extras) {
  return [...players].map((player) => {
    const newPlayer = { ...player };
    if (newPlayer.status === PlayerStatus.STRIKER) {
      newPlayer.runsScored += updateCurrentRunsWithExtras(currentRun, extras);
      newPlayer.ballsFaced += updateBallFaced(extras);
      if (currentRun === 4 && isValidExtra(extras)) {
        newPlayer.numberOfFours += 1;
      }
      if (currentRun === 6 && isValidExtra(extras)) {
        newPlayer.numberOfSixes += 1;
      }
    }
    return newPlayer;
  });
}

function updateBowlingPlayerScore(players, currentRun, isBatsmanOut, extras) {
  return [...players].map((player) => {
    const newPlayer = { ...player };
    if (newPlayer.status === PlayerStatus.BOWLING) {
      newPlayer.runsGiven += updateRunsGiven(currentRun, extras);
      newPlayer.ballsBowled += updateBallFaced(extras);

      if (isBatsmanOut) {
        newPlayer.wicketsTaken += 1;
      }
    }
    return newPlayer;
  });
}

function updatePlayer(isBattingTeam, players, currentRun, isBatsmanOut, extras, totalBalls) {
  let updatedPlayersList = isBattingTeam ?
    updateBattingPlayerScore(players, currentRun, extras) :
    updateBowlingPlayerScore(players, currentRun, (!isBattingTeam && isBatsmanOut), extras);

  const isOddRuns = [1, 3, 5].indexOf(currentRun) !== -1;
  const isLastBallOfOver = (totalBalls + 1) % 6 === 0;

  if (isBatsmanOut && isBattingTeam) {
    const selectedPlayerId = updatedPlayersList.filter(player =>
      player.status === PlayerStatus.STRIKER)[0].id;
    updatedPlayersList = updatePlayerStatus(updatedPlayersList, selectedPlayerId, PlayerStatus.OUT);
  } else if (
    isBattingTeam &&
    (
      (isOddRuns && !isLastBallOfOver)
      || (!isOddRuns && isLastBallOfOver)
    )
  ) {
    const currentStrikerId = players.filter(player =>
      player.status === PlayerStatus.STRIKER)[0].id;

    const currentNonStrikerId = players.filter(player =>
      player.status === PlayerStatus.NON_STRIKER)[0].id;

    updatedPlayersList =
      updatePlayerStatus(updatedPlayersList, currentStrikerId, PlayerStatus.NON_STRIKER);

    updatedPlayersList =
      updatePlayerStatus(updatedPlayersList, currentNonStrikerId, PlayerStatus.STRIKER);
  }

  return updatedPlayersList;
}

function getCurrentOverScore(currentOverArray, currentRun, battingTeamTotalBalls, extraType) {
  if ((battingTeamTotalBalls + 1) % 6 === 0) {
    if (extraType !== ExtraTypes.WIDE && extraType !== ExtraTypes.NO_BALL) {
      return [];
    }
  }

  return [...currentOverArray].concat([currentRun]);
}

export {
  updatePlayerStatus,
  updateBattingPlayerScore,
  updateBowlingPlayerScore,
  updateRuns,
  updateBalls,
  updatePlayer,
  getCurrentOverScore,
};
