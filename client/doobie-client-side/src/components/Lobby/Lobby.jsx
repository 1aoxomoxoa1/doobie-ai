import '../../css/Lobby/lobby.css'
import CreateOption from './CreateOption';
import { useState, useEffect } from 'react'
import {useNavigate, useLocation} from 'react-router-dom';
import JoinOption from './JoinOption';
import { toggleLobby } from '../../api/lobby/lobby';
import { validateSessionInLobby } from '../../api/lobby/lobby';


function LobbyPage({socket}){

    const navigate = useNavigate();

    //for switching between the tabs
    const [createHidden, setCreateHidden] = useState(false);
    const [joinHidden, setJoinHidden] = useState(true);

    //for keeping the user (from session)
    const [user, setUser] = useState({});


    //need a useEffect here checking if the person has a session started on the server with a name and related img
    useEffect(() => {
        validateSessionInLobby(navigate, setUser);
    }, [])

    return (
        <div>
            <h2> DoobieOrNotDoobie.ai </h2>

            <div className="lobby-settings"> 
                <div className="options"> 
                    <div className="flex-options">
                        <div 
                            className={`flex-option${!createHidden ? " active" : " inactive"}`} 
                            onClick={(event) => toggleLobby(event, createHidden, joinHidden, setCreateHidden, setJoinHidden)}
                            > 
                            <span> Create Game </span> 
                        </div> 
                        <div 
                            className={`flex-option${!joinHidden ? " active" : " inactive"}`}
                            onClick={(event) => toggleLobby(event, createHidden, joinHidden, setCreateHidden, setJoinHidden)}
                            >
                            <span> Join Game </span> 
                        </div>
                    </div> 
                    <div hidden={createHidden}> 
                        <CreateOption socket={socket} user={user}> </CreateOption>
                    </div> 
                    <div hidden={joinHidden}> 
                        <JoinOption socket={socket} user={user}> </JoinOption>
                    </div> 
                </div>
            </div>
        </div> 
    )

}


export default LobbyPage