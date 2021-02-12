const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { query } = require('../models/db');

/* GET login form */
router.get('/', function(req, res, next) {
  res.render('login', {title: 'skolfoft'});
});

/* GET login form */
router.get('/kryptan/:pwd', function(req, res, next) {
  
  const myPlaintextPassword = req.params.pwd;

  bcrypt.hash(myPlaintextPassword, 10, function(err, hash) {
    // Store hash in your password DB.
    res.json({
      pwd: hash
    });
  });
});

/* POST login */
router.post('/', async function(req, res, next) {
  
  console.log(req.body);

  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    try{
      const sql = 'SELECT password FROM users WHERE name = ?';
      const result = await query(sql, username);
      

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, function(err, result) {
          if (result = true) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/sekret')
          } else {
            res.render('login', {error : 'Wrong username or password!'});
          }
        });
      } else {
        res.render('login', {error : 'Wrong username or password!'});
      } 
    } catch (e) {
      next(e);
      console.error(e);
    } 
  } else {
    res.render('login', {error : 'Wrong username or password!'});
  } 
});
//     if {
//     // kolla om login stämmer
//     req.session.loggedin = true;
//     req.session.username = username;
//     res.redirect('/sekret');

//   }
//     else {
//       // kommentera ut vid felsökning
//       res.render('login', 
//       {
//         title: 'skolfoft',
//         error: 'FEL!'
//       });
//     }


module.exports = router;
