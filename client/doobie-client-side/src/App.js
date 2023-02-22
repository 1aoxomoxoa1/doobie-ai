import './App.css';
import io from "socket.io-client"
import { useEffect, useState } from 'react';
import AppRouter from './components/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';

//connecting the socket to the server
const socket = io.connect(process.env.REACT_APP_SERVER_URL);

function App() {
  
  //room state
  const [room, setRoom] = useState("")

  //state for message
  const [message, setMessage] = useState("");
  const [messageRecv, setMessageRecv] = useState("");


  const joinRoom = () => {
    if(room !== ""){
      socket.emit("join_room", {room: room});
    }
  }

  const sendMessage = () => { 
    socket.emit("send_message", {message, room})
  }

  // useEffect(() => {
  //   socket.on('receive_message', (data) => {
  //     setMessageRecv(data.message)
  //   })
  // }, [socket])


  return (
    <div className="App">
      {/* <input placeholder='room to join' onChange={(event) => setRoom(event.target.value)}/>     
      <button onClick={joinRoom}> Join Room</button>
      <br></br>
      <input placeholder='message' onChange={(event) => setMessage(event.target.value)}/>     
      <button onClick={sendMessage}> Send Message</button> 
      <h1> Message: </h1>
      {messageRecv}  */}
      <AppRouter socket={socket} > </AppRouter>
    </div>
  );
}

export default App;
