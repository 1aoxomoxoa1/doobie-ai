// //**
//  * 
//  * @param {*} room -- room to remove player from
//  * @param {*} players -- map that contains all players
//  */
const leaveRoom = (room, players, userSocketId) => {
    let roomSelected = players.get(room);
    console.log(roomSelected);
    
    let roomWithoutPlayer = roomSelected.filter(player => player.id !== userSocketId);
    console.log(roomWithoutPlayer);

    players.set(room, roomWithoutPlayer);

}


module.exports = {leaveRoom};