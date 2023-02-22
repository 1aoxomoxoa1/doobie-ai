import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import '../../css/Lobby/create-option.css';
import GameRoom from "./GameRoom";
import { createRoom, sendToRoom } from "../../api/lobby/create-room";
import { useNavigate } from "react-router-dom";

function CreateOption({socket, user}){

    const [gameStarted, setGameStarted] = useState(false);
    const [roomNumber, setRoomNumber] = useState("");
    const navigate = useNavigate();



    useEffect(() => {
        sendToRoom(roomNumber, navigate);
    }, [roomNumber])
    

    return( 
        <> 
        {!gameStarted //show create-details div when gameStarted === false
        ? 
            <div className="create-details"> 
                <div> 
                    <h2> Create a game hosting up to 10 people! </h2>
                    <Button 
                        variant="info" 
                        className="create-btn"
                        onClick={() => createRoom(socket, setRoomNumber, user)}
                        > 
                        Create Room 
                    </Button>
                </div>
            </div>
        :
            <GameRoom/>
        }
        </>
    )
}

export default CreateOption;