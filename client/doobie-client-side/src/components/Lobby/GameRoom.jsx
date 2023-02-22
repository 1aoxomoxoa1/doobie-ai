import '../../css/Lobby/game-room.css';
import { useEffect, useState } from 'react';
import { getQueryParam, validateSessionInLobby } from '../../api/utils';
import { checkPlayersInRoom, emitStartGame, startGame, addUserLeavingListeners, checkSessionInGameRoom, backButtonCbWrapper } from '../../api/lobby/game-room';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DetectBackButton from './DetectBackButton';
import AVATARS from '../../api/resources/avatars';


function GameRoom({socket}){


    // function backButtonCbWrapper(event, socket){
    //     backButtonCallback(event, socket)
    // }
    
    const navigate = useNavigate();
   

    //states for the gameRoom id and player List
    const [gameRoom, setGameRoom] = useState("");
    const [players, setPlayers] = useState([]);
    const [user, setUser] = useState("");

    //for timer 
    const [timer, setTimer] = useState({count: 5, isTimerSet: false}); 

    //need a variable for this because state undefined when backButton is pressed
    const roomNumber = getQueryParam('room')

    function backButtonCallback(event){
        console.log('detecting back button');
        console.log(event);
        socket.emit('leave', {room: roomNumber});
        console.log('after leave-room emission')
        
        socket.on('leave-resp', (data) => {
            console.log('within leave-game-resp')
            setPlayers(data.players)
        });

        window.removeEventListener("popstate", backButtonCallback);
    
        navigate('/lobby');
    }

    
    //when the page loads set the game number, and ensure that there are no duplicate players
    useEffect(() => { 
        async function loadGamePage(){ 
            const roomNumber = getQueryParam('room');
            console.log(roomNumber);
            setGameRoom(roomNumber);
            let playersInRoom = checkPlayersInRoom(socket, roomNumber, setPlayers, navigate);
    
            //validate that the req.session is started
            let user = await checkSessionInGameRoom(navigate, setUser);
            if(user){
                console.log('user exists')
            }else{
                //here we can let them do a modal to show a screen like NamePage
            }
    
            //add listeners to the window
            addUserLeavingListeners(backButtonCallback);
        };
        loadGamePage();
    }, []);


    //check for players joining into the lobby
    useEffect(() => { 
        socket.on("player-joins", (data) => {
            console.log('socket changes because of player-join')
            console.log(data);
            setPlayers(data.room)
        });
        socket.on('start-game-resp', (data) => {
            console.log('socket changes bc of start-game--resp')
            console.log(data.room)
            startGame(data, setTimer);
        });
        socket.on('leave-resp', (data) => {
            console.log('within leave-game-resp')
            console.log(data.players);
            setPlayers(data.players)
        });
    }, [socket]);

    return (
        <div> 
            <h2 onClick={backButtonCallback}> DoobieOrNotDoobie.ai </h2>

            <div className="game-room"> 
                <div className='game-room-options'> 
                    <h2> Your Room Code Is: </h2>
                    <h1 id='game-room-id'> {gameRoom} </h1>
                </div>
                <div className='game-room-players'>
                    {
                        players.map((player) => 
                            <div> 
                                <img src={AVATARS[`${player.user.avatar}`]} id="avatar-lobby" alt="avatar" />
                                <h3> {player.user.name} </h3>
                            </div>
                        )
                    }
                </div>
                <div> 
                    <Button 
                        variant='info' 
                        className='start-game-btn'
                        onClick={() => emitStartGame(socket, gameRoom)}> 
                        {
                        !timer.isTimerSet
                        ? <span> Start Game!</span>
                        :<span> Game starting in {timer.count}...</span>
                        }
                    </Button>
                </div>
                
               
            </div>
            {/* <DetectBackButton onBackButton={backButtonCallback}> </DetectBackButton> */}
        </div>

    )
}


export default GameRoom;