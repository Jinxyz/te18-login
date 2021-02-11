var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET sekret page. */
router.get('/sekret', function(req, res, next) {
  if (req.session.loggedin) {
    res.send('Du är inloggad. TOPSEKURITAS!!'); 
  } else {
      res.send('Please login to view this page!');
  }
});

module.exports = router;
