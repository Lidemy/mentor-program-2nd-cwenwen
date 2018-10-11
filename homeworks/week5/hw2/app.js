// from npm
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// from db.js
const conn = require('./db').conn;
const usersTable = require('./db').usersTable;
const commentsTable = require('./db').commentsTable;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'ejs');
// static files
app.use(express.static('public'));

// session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 60 * 60 * 1000} // 1hr
}));

/* 
Basic routing:
app.METHOD(PATH, HANDLER)
*/

// route: login
app.get('/login', (req, res) => {
  res.render('login');
});

// login check
app.post('/login', (req, res) => {
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
});

// route: register
app.get('/register', (req, res) => {
  res.render('register');
});

// register check
app.post('/register', (req, res) => {
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
});

// route: home
app.get('/', (req, res) =>{
  res.redirect('/pages/1');
})

// show comments ; handle pages
app.get('/pages/:page', (req, res) => {

  let totalPages,
      currentPage,
      commentStartNumber;

  // check if user has logged in
  if (typeof(req.session.user_id) !== 'undefined') {
    res.locals.user = { user_id: req.session.user_id, nickname: req.session.nickname };
  } else {
    res.locals.user = { user_id: undefined, nickname: undefined };
  }

  // get the number of main comments
  conn.query({ 
    sql: 'SELECT COUNT(parent_id) AS datanum FROM ?? WHERE parent_id = 0',
    values: [ commentsTable ]

  }, (error, results) => { 
    if (error) throw error;

    // calculate the number of pages
    totalPages = Math.ceil(results[0].datanum / 10); 
    res.locals.totalPages = totalPages;

    // handle invalid page number
    if (parseInt(req.params.page) < 0 || parseInt(req.params.page) > totalPages || isNaN(parseInt(req.params.page))) {
      res.redirect('/pages/1');

    } else {
      // set current page
      currentPage = parseInt(req.params.page);
      res.locals.currentPage = currentPage;

      // find the first comment of each page
      commentStartNumber = ( currentPage - 1 ) * 10;
    };

    // get 10 comments for current page
    conn.query({ 
      sql: 'SELECT c.id AS comment_id, user_id, nickname, created_at, content FROM ?? AS c INNER JOIN ?? AS u ON parent_id = 0 AND user_id = u.id ORDER BY created_at DESC LIMIT ?, 10',
      values: [ commentsTable, usersTable, commentStartNumber ]

    }, (error, results) => {
      if (error) throw error;

      res.locals.comment = results;
      
      // set multiple sql statement for subcomments
      let sql = '';
      for (let i = 0; i < res.locals.comment.length; i++) {
        sql += `SELECT c.id AS comment_id, user_id, nickname, created_at, content, parent_id FROM ${commentsTable} AS c INNER JOIN ${usersTable} AS u WHERE parent_id = ${res.locals.comment[i].comment_id} AND user_id = u.id ORDER BY created_at ASC`;
      }

      // get subcomments
      conn.query({ sql }, (error, results) => {
        if (error) throw error;
        
        // show subcomments
        for (let i = 0; i < res.locals.comment.length; i++) {
          res.locals.comment[i].subComment = results[i];
        }
        
        res.render('index');
      });
    });
  });
});

// route: modify comment
app.post('/modify_comment', (req, res) => {

  conn.query({
    sql: 'UPDATE ?? SET content = ? WHERE id = ?',
    values: [commentsTable, req.body.content, req.body.comment_id]
  },(error, results)=>{

    if (error) res.send('error');
    else res.send('modified');
  });
});

// route: delete comment
app.delete('/delete_comment',  (req, res) => {

  conn.query({
    sql: 'DELETE FROM ?? WHERE id = ? OR parent_id = ?',
    values: [commentsTable, req.body.comment_id, req.body.comment_id]
  }, (error, results) => {

    if (error) res.send('error');
    else res.send('comment deleted');
  });
});

// route: logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/pages/1');
})

// route: add comment
app.post('/insert_comment', (req, res) => {

  const sql = 'INSERT INTO ?? ( user_id, parent_id, topic, content ) VALUES (?, ?, ?, ?)';
  const inserts = [commentsTable, req.session.user_id, req.body.parent_id, req.body.topic, req.body.content];
  sql = mysql.format(sql, inserts);

  conn.query({ sql }, (error, results) =>{
    if (error) throw error;

    // get id
    const comment_id = results.insertId;

    // get created_at
    conn.query({
      sql: 'SELECT created_at FROM ?? AS c WHERE c.id = ?',
      values: [commentsTable, comment_id]

    }, (error, results) => {
      if (error) throw error;

      res.json({
        "nickname": req.session.nickname,
        "comment_id": comment_id,
        "created_at": results[0].created_at
      });

    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));