import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NamePage from './NamePage/NamePage'
import LobbyPage from "./Lobby/Lobby";
import GameRoom from "./Lobby/GameRoom";

function AppRouter({socket}){ 

    console.log(socket)
    return( 
        <BrowserRouter>
            <Routes> 
                <Route path='/' element={<NamePage socket={socket}/>} /> 
                <Route path='/lobby' element={<LobbyPage socket={socket} />} />
                <Route path='/room' element={<GameRoom socket={socket} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;