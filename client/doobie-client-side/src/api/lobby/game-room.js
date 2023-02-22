import { checkSession } from "./lobby";

// //** Called when player joins game-room to see who else is in the room
//  * 
//  * @param {*} socket -- need to communicate with server and check the room
//  * @param {*} roomNumber -- room that we are checking status of
//  * @param {*} setPlayers -- setPlayers() of the room if we have a room
//  * @param {*} navigate -- IF NO ROOM --> useNavigate

//  */
export function checkPlayersInRoom(socket, roomNumber, setPlayers, navigate){
    socket.emit('check-room', {room: roomNumber});

    socket.on('check-room-resp', (data) => {
        console.log(data);

        //this is case where there is no room .. e.g. if user refreshes back while in game room 
        if(data.room === undefined){ 
            navigate('/lobby');
        }else{
            setPlayers(data.room)
        }
    })
}

export function emitStartGame(socket, room){
    socket.emit('start-game', {room: room});    
}

export function startGame(data, setTimer){
    if(data.isGameStarted){
        countdown(setTimer)
    }
}

function countdown(setTimer){

    setTimer({count: 5, isTimerSet: true})
    let count = 4;

    let interval = setInterval(() => {
        if(count === 0){
            clearInterval(interval);
        }
        setTimer({count: count, isTimerSet: true})
        count--;
    }, 1000);
}

// //** CHECK THE SESSION IN THE GAME ROOM, IF IT iS FALSE LET THEM START A SESSION IN A MODAL
//  * 
//  */
export async function checkSessionInGameRoom(navigate, setUser){
    let sessionObj = await checkSession();
    console.log('session object in game room');
    console.log(sessionObj);
    if(sessionObj.sessionStarted === false){
        return undefined
    }else{
        return sessionObj.sessionData;
    }
}

//** THIS ADDS EVENT LISTENER TO GOING BACK TAB 
//  * 
//  * @param {*} backButtonCallback -- cb function used
//  */
export function addUserLeavingListeners(backButtonCallback){
    let popstateListener = window.addEventListener('popstate', backButtonCallback);
}


