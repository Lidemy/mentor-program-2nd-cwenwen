// use Sequelize
const Sequelize = require('sequelize');

const sequelize = new Sequelize('mentor_program_db', process.env.USER, process.env.PWD, {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => console.log('Connecting succeeded'))
  .catch(error => console.log(`Connecting error: ${error}`))

module.exports = sequelize;

/*
const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PWD, 
  database: "mentor_program_db",
  multipleStatements: true
});

conn.connect((error) => {
  if (error) return console.log(`Connecting error: ${error}`);
  console.log('Connecting succeeded');
});

module.exports = {
  conn: conn,
  usersTable: 'cwenwen_users',
  commentsTable: 'cwenwen_comments'
}
*/