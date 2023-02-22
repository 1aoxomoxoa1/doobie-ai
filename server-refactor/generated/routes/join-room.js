var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {

  if(req.session.user){
    let session = req.session.user;

    let updatedSession = {
        ...session, 
        roomEntered: req.body.room
    }

    req.session.user = updatedSession
    
    res.send({success: true});
  }

})

module.exports = router;