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
    // kolla om login stämmer
    req.session.loggedin = true;
    req.session.username = username;
    res.redirect('/sekret');

  }
    else {
      // kommentera ut vid felsökning
      res.render('login', 
      {
        title: 'skolfoft',
        error: 'FEL!'
      });
    }

});


module.exports = router;
