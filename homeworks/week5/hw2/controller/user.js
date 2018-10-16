// from npm
const bcrypt = require('bcrypt');
const saltRounds = 10;

// from ../model
const User = require('../model/user');

module.exports =  {

  register: (req, res) => {
    User
      .create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, saltRounds),
        nickname: req.body.nickname
      })
      .then(() => {
        req.session.username = req.body.username;
        req.session.nickname = req.body.nickname;
        res.send('ok');
      })
      .catch((error) => {
        console.log(error);
        res.send('error');
      })
  },
/*
  login : (req, res) => {
    conn.query({  
      sql: 'SELECT id, username, password, nickname FROM ?? WHERE username = ?',
      values: [ usersTable, req.body.username ]
  
    }, (error, results) => {
      if (error) console.log(error);
  
      // username found
      if (results.length !== 0){
  
        // login succeeded
        if (bcrypt.compareSync(req.body.password, results[0].password)) {
  
          // set session
          req.session.user_id = results[0].id;
          req.session.nickname = results[0].nickname;
          res.send('ok');
  
        // wrong password
        } else {
          res.send('error');
        }
  
      // username not exist
      } else {
        res.send('error');
      }
    });
  },
*/
  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/');
  }
}