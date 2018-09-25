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

export default updatePlayerStatus;
