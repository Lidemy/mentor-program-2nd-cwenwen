const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: "mentor_program_db",
  multipleStatements: true
});

conn.connect(function(error) {
  if (error) return console.log(`Connecting error: ${error}`);
  console.log('Connecting succeeded');
});

module.exports = {
  conn: conn,
  usersTable: 'cwenwen_users',
  commentsTable: 'cwenwen_comments'
}