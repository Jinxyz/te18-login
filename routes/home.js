var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const { query } = require('../models/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.loggedin) {
    res.render('home');
  } else {
    res.redirect('/login');
  }
});

router.get('/edit', (req, res, next) => {
  res.render('useredit')
});

router.post('/edit', 
    body('newusername').notEmpty().trim(), 
    (req, res, next) => {
      if (req.session.loggedin) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).render('register', { errors: errors.array() });
      }
  
    // edit user
    const sql = 'UPDATE users SET name = ? HWERE id = session.id';
    const result = await query(sql, [req.body.newusername, req.session.userid]);
  
      if (result.changedRows = 1) {
        req.session.username = req.body.newusername
        return res.render('/home', {
        username: req.session.username
        });
      } else {
        return res.send('fail');
      }
  } else {
    res.redirect('/login');
  }
});
module.exports = router;