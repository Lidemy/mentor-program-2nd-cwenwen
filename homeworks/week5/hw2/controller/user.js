module.exports =  {

  register: (req, res) => {
    conn.query({
      sql: 'SELECT username FROM ?? WHERE username=?',
      values: [ usersTable, req.body.username ]
    
    }, (error, results) => {
      if (error) throw error;
  
      // usable username, insert into db
      if( results.length === 0) {
  
        conn.query({
          sql: 'INSERT INTO ?? (username, password, nickname) VALUES (?, ?, ?)',
          values: [ usersTable, req.body.username, bcrypt.hash(req.body.password, saltRounds), req.body.nickname ]
  
        }, (error, results) => {
          if (error) throw error;
  
          // set session
          req.session.user_id = results.insertId;
          req.session.nickname = req.body.nickname;
          res.send('ok');
        });
  
      // username has been used
      }else{
        res.send('error');
      };
    });
  },

  login : (req, res) => {
    conn.query({  
      sql: 'SELECT id, username, password, nickname FROM ?? WHERE username = ?',
      values: [ usersTable, req.body.username ]
  
    }, (error, results) => {
      if (error) throw error;
  
      // username found
      if (results.length !== 0){
  
        // login succeeded
        if (bcrypt.compare(req.body.password, results[0].password)) {
  
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

  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/pages/1');
  }
}