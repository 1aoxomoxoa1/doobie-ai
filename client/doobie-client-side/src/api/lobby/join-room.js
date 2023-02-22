import axios from "axios";

axios.defaults.withCredentials = true;



export async function joinRoom(socket, room, user, setAuthStyle, authRef, navigate){
    //join the room with the code entered
    socket.emit('join-room', {room: room, user: user});

    console.log(room);


    socket.on('join-room-resp', async (data) => {
        console.log(data);
        if(data.roomExists){
            navigate(`/room?room=${data.joinData.room}`);
        }else{
            let finished = await showError(setAuthStyle);
            authRef.current.clear();
        }
    })

    let response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/join-room`, {
        room: room
    })


}

async function showError(setAuthStyle){
    let count = 4;
    let animation = setInterval(() => {
            if(count <= 1){
                clearInterval(animation);
            }

            if(count % 2 === 0){
                setAuthStyle('err-auth');
            }else{
                setAuthStyle('def-auth');            
            }

            count--;
    }, 200);
}