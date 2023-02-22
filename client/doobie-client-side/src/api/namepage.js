import axios from "axios";
import { checkSession } from "./lobby/lobby";
import { getQueryParam } from "./utils";

axios.defaults.withCredentials = true;


//** This function picks a random number out of 13, to represent one of the 13 avatars
//  * 
//  * @returns {STR} picSelection -- indicating which avatar was randomly selected
//  */
export function pickProfilePic(){
    const selection = Math.floor((Math.random() * 13)) + 1
    let picSelection = `pic${selection}`;
    return picSelection;   
}

//** This function handles when the replay arrow is clicked bnext to Avatar image
//  * 
//  * @param {*} setAvatar 
//  */
export function handleChangePic(setAvatar){
    setAvatar(pickProfilePic());
}



//thus checks that the username is filled out and calls the async function to server
export async function handleStart(event, navigate, user){

    //case where there is no sessionData created
    if(user.name !== ""){ 

        console.log(user.name);

        //login to start user's session on server
        let loggedIn; 
        try{
            loggedIn = await axios.post(process.env.REACT_APP_SERVER_URL, {
                username: user.name,
                avatar: user.avatar
            }); 
        } catch (error) {
            console.log(error.response);
        }


        console.log(loggedIn)

        //once they are logged in navigate to the lobby
        if(loggedIn.data.loggedIn){
            navigate("/lobby");
        }


    }
    //case where there is session data and it needs to be replaced in the server's playersMap
    // else if(user.name !== "" && prevSession !== undefined){
    //     console.log(prevSession);
    //     console.log('prevSession found-- need to replace above values in server');

    //     let loggendIn = await axios.post(process.env.REACT_APP_SERVER_URL, {
    //         username: user.name,
    //         avatar: user.avatar,
    //     });
        
    // }
    else{
        alert('Please enter a username');
    }
}

export async function namePageLoader(setRoomQuery, setAvatar, setUserSession){
    let sessionData = await checkSession();

    if(sessionData !== undefined){ //if a session object is existing currently
        setUserSession(sessionData); //then store that state so we can override it if the user puts in new info
    }else{ 
        setUserSession("");
    }

    //set the roomNumber if it exists from a query
    setRoomQuery(getQueryParam('room'));

    //set a random avatar
    setAvatar(pickProfilePic());



}
