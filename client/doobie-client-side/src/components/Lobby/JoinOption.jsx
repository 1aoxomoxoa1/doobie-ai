import '../../css/Lobby/join-option.css';
import { Button } from 'react-bootstrap';
import { joinRoom } from '../../api/lobby/join-room';
import { useState, useRef } from 'react';
import AuthCode, {AuthCodeRef} from 'react-auth-code-input';
import { useNavigate } from 'react-router-dom';

function JoinOption({socket, user}){

    const navigate = useNavigate();

    //code for the AuthCode
    const [authStyle, setAuthStyle] = useState('def-auth')
    const [room, setRoom] = useState("");
    const authRef = useRef(null)
    const handleOnChange = (res) => {
        setRoom(res);
    };

    return( 
        <> 
            <div className="join-details-flex"> 
                <div className='join-details'> 
                    <h2> Enter room number to join a game! </h2>
                    <div className='code-holder'> 
                        <AuthCode 
                            onChange={handleOnChange} 
                            inputClassName={`auth-inputs ${authStyle}`}
                            containerClassName='auth-ctr'
                            ref={authRef}
                            > 
                        </AuthCode>
                    </div>
                    <Button 
                        variant="info" 
                        className="join-btn"
                        onClick={() => joinRoom(socket, room, user, setAuthStyle, authRef, navigate) }
                        >
                        Join Room 
                    </Button>
                </div>
            </div>
        </>
    )
}

export default JoinOption;