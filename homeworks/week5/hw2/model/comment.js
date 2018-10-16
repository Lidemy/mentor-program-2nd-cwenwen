const Sequelize = require('sequelize');
const sequelize = require('./db');

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  parentId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  topic: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  createAt: {
    type: Sequelize.DATE
  }
}, {
  timestamps: false,
  tableName: 'cwenwen_comments',
})

Comment.sync();

module.exports = Comment;