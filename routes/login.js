var express = require('express');
var router = express.Router();

/* GET login form */
router.get('/', function(req, res, next) {
  res.render('login', {title: 'skolfoft'});
});

/* POST login */
router.post('/', function(req, res, next) {
  
  console.log(req.body);

  const username = req.body.username;
  const password = req.body.password;

  if (password == "ABCD"){
    res.send('Victory!')
  }
    else {
      res.send('You lose! LOSER');
    }

});


module.exports = router;
