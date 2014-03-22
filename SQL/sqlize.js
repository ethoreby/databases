/* global require */

var Sequelize = require('sequelize');

// Create database connection
var sequelize = new Sequelize('chat', 'root', '');

// Define models
var User = sequelize.define('User', {
  username: Sequelize.STRING
});

var Chat = sequelize.define('Chat', {
  username: Sequelize.STRING(30),
  message: Sequelize.STRING,
  roomname: Sequelize.STRING(30),
});

var Room = sequelize.define('Room', {
  roomname: Sequelize.STRING(30),
});

// Define relationships
Chat.belongsTo(User);
Chat.belongsTo(Room);
User.hasMany(User, {as: 'Friend'});

// Sync database
sequelize.sync();
