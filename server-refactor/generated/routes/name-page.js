var express = require('express');
var router = express.Router();

//this route is responsible for starting the express session for user's data
router.post("/", (req, res) => { 
    const name = req.body.username; 
    const avatarSelection = req.body.avatar; 
    const prevSession = req.session.user;

    //this gets us a unique id for each session 
    let uid = (new Date()).getTime();
    console.log(uid);

    if(prevSession === undefined){ 

        //start a new session
        req.session.user = { 
            name: name, 
            avatar: avatarSelection,
            uid: uid,
            roomEntered: undefined
        };

    }else{
        const prevUid = prevSession.uid; 
        const prevRoomEntered = prevSession.roomEntered

        console.log(`prevUId: ${prevUid}`);

        //keep the same uid
        req.session.user = { 
            name: name, 
            avatar: avatarSelection, 
            uid: prevUid,
            roomEntered: prevRoomEntered
        }

    }

    


    //send info back to the client
    res.send({loggedIn: true, userSession: req.session.user})
})

module.exports = router;