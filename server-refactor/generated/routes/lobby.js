var express = require('express');
var router = express.Router();

//This function checks if the session has started and allows the user to continue in the lobby
router.get('/', (req, res) => {
  if(req.session.user){
    res.send({sessionStarted: true, sessionData: req.session.user});
  }else{
    res.send({sessionStarted: false});
  }

})

module.exports = router;
