// from npm
const mysql = require('mysql');

// from db.js
const conn = require('../db').conn;
const usersTable = require('../db').usersTable;
const commentsTable = require('../db').commentsTable;

module.exports = {
  
  showComments: (req, res) => {

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
  },

  modifyComment: (req, res) => {

    conn.query({
      sql: 'UPDATE ?? SET content = ? WHERE id = ?',
      values: [commentsTable, req.body.content, req.body.comment_id]
    },(error, results)=>{
  
      if (error) res.send('error');
      else res.send('modified');
    });
  },

  deleteComment: (req, res) => {

    conn.query({
      sql: 'DELETE FROM ?? WHERE id = ? OR parent_id = ?',
      values: [commentsTable, req.body.comment_id, req.body.comment_id]
    }, (error, results) => {
  
      if (error) res.send('error');
      else res.send('comment deleted');
    });
  },

  insertComment: (req, res) => {

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
  }
}