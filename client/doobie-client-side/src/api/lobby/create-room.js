import { getRandomString } from "../utils";

import axios from "axios";

axios.defaults.withCredentials = true;


export function createRoom(socket, setRoomNumber, user){
    console.log('within createRoom')
    //join the room
    socket.emit('create-room', {room: 100, user: user});
    
    socket.on('recv-room', (data) => {
        console.log(`in recv-room ${data.roomNumber}`)
        setRoomNumber(data.roomNumber)
    })
}

export async function sendToRoom(roomNumber, navigate){
    if(roomNumber !== ""){

        let response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/join-room`, {
            room: roomNumber
        });

        if(response.data.success){
            navigate(`/room?room=${roomNumber}`);
        }
    }
}