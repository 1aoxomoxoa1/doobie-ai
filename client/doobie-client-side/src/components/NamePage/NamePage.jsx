import '../../css/NamePage/namepage.css';
import { useState, useEffect } from 'react';
import { namePageLoader, handleChangePic, handleStart } from '../../api/namepage';
import { useNavigate } from 'react-router-dom';
import AVATARS from '../../api/resources/avatars';
import replayIcon from '../../images/misc/replayarrow.png';
import axios from 'axios';

function NamePage({socket}){

    const navigate = useNavigate();


    //states for the user -- avatar (img) & username 
    const [avatar, setAvatar] = useState("");
    const [username, setUsername] = useState("");

    //room will be set here if user arrives to page from a link
    const [roomQuery, setRoomQuery] = useState("");

    //this state stores if there is an existing session that must be replaced when START pressed
    const [userSession, setUserSession]  = useState("");


    useEffect(() => {
        namePageLoader(setRoomQuery, setAvatar, setUserSession);
    }, []);

    
    return(    
        <>
            <h2> DoobieOrNotDoobie.ai </h2>

            <div className='user-settings'>
                <h2> Please select a character and nickname: </h2>
                <div className='details'> 
                    <div className='pic-icon'> 
                        <img src={AVATARS[`${avatar}`]} id="avatar" alt="avatar" />
                        <img src={replayIcon} onClick={() => handleChangePic(setAvatar)} className="replay-icon" alt="relay"/>
                    </div>
                    <input type="text" onChange={(event) => setUsername(event.target.value)} className="name-ipt" placeholder='JohhnyAppleseed1774'/>
                </div>
                <button className='start-btn' onClick={(event) => handleStart(event, navigate, {name: username, avatar})}> Start </button>
            </div>
        </> 

    )
}

export default NamePage;