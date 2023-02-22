import axios from 'axios';

axios.defaults.withCredentials = true;

//this toggles the UI togglable element in the lobby
export function toggleLobby(event, createHidden, joinHidden, setCreateHidden, setJoinHidden){
    //this will store either active or inactive from the css classname
    let isParentActive = "";

    if(event.target.tagName === "SPAN"){
        const parentDivClass = event.target.parentElement.className;
        isParentActive = parentDivClass.replace("flex-option ", "");

    }else if(event.target.tagName === "DIV"){
        const className =  event.target.className;
        isParentActive = className.replace("flex-option ", "");
    }

    //if the  
    if(isParentActive === 'active'){
        return;
    }

    if(createHidden && !joinHidden){
        setCreateHidden(false);
        setJoinHidden(true);
    }

    if(joinHidden && !createHidden){
        setCreateHidden(true);
        setJoinHidden(false);
    }
}



//**
//  * 
//  * @returns {data} if session is started & {undefined} is session is not started
//  */ 
export async function checkSession(){
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/lobby`);
    console.log(response.data.sessionData);
    return response.data
}


// //**
//  * 
//  * @param {*} navigate -- this is the react-router-dom navigate object
//  * @param {*} setUser -- setUser with the req.session.user object if it is found
//  */ IF NOT FOUND -- navigate back to lobby
export async function validateSessionInLobby(navigate, setUser){
    let sessionObj = await checkSession();
    console.log('continuing');
    console.log(sessionObj);
    if(sessionObj.sessionStarted === false){
        navigate('/');
    }else{
        setUser(sessionObj.sessionData);
    }
}


