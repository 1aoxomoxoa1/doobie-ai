// //**
//  * 
//  * @param {*} io -- socket object to use to check the rooms
//  * @param {*} playersMap -- map we have that stores all the players in the Game
//  * @param {*} room -- roomId of the room we are getting
//  * @returns {undefined || lst [] } -- undefined if the room doesnt exist || lst if there are players in the room
//  */
const getFilteredMapWithRealRooms = (io, playersMap, room) => { 

    let currentRoomInMap = playersMap.get(room)
    console.log(currentRoomInMap);
    console.log('current room in map above');

    console.log(io.sockets.adapter.rooms);
    console.log('all rooms above')

    //currentRoom is a set containing all the ids in the room
    let currentRoom = io.sockets.adapter.rooms.get(room);
    console.log(currentRoom);
    console.log("current room above");

    //if there is no room, then return undefined
    if(currentRoom === undefined){
        return undefined
    }else{
        let filteredCurrentRoomInMap = currentRoomInMap.filter(element => currentRoom.has(element.id))
        return filteredCurrentRoomInMap    
    }
}


// //**
//  * 
//  * @param {*} io 
//  * @param {*} players 
//  * @param {*} userData 
//  * @param {*} roomNumber 
//  * @returns {bool} -- True if userSession uid (unique id) os already in playersMap || False if is is not
//  */
const isUserSessionInRoom = (io, players, userData, roomNumber) => {
    let currentRoom = io.sockets.adapter.rooms.get(roomNumber);
    console.log(currentRoom);
    console.log("current room from io.sockets above");

    let currentRoomMap = players.get(roomNumber);
    console.log(currentRoomMap);
    console.log("current room from map above");

    console.log(`userData.uid : ${userData.uid}`);
    console.log(`player.user.uid : ${currentRoomMap[0].user.uid}`);
    console.log(currentRoomMap.some(player => player.user.uid === userData.uid));

    return currentRoomMap.some(player => player.user.uid === userData.uid)
}


module.exports = {getFilteredMapWithRealRooms, isUserSessionInRoom}