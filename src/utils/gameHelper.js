export function updatePlayerStatus(players, playerId, newStatus) {
    let updatedPlayers = [];
    players.forEach(player => {
        let newPlayer = { ...player };
        
        if(newPlayer.id === playerId) {
            newPlayer.status = newStatus;
        }
        updatedPlayers.push(newPlayer);
    });

    return updatedPlayers;
};