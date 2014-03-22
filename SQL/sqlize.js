/* global require, exports */

var Sequelize = require('sequelize');

// Create database connection
var sequelize = exports.sequelize = new Sequelize('chat', 'root', '');

// Define models
var User = exports.User = sequelize.define('User', {
  username: Sequelize.STRING
});

var Chat = exports.Chat = sequelize.define('Chat', {
  username: Sequelize.STRING(30),
  message: Sequelize.STRING,
  roomname: Sequelize.STRING(30),
});

var Room = exports.Room = sequelize.define('Room', {
  roomname: Sequelize.STRING(30),
});

// Define relationships
// Chat relationships
Chat.belongsTo(User);
Chat.belongsTo(Room);

// User relationships
User.hasMany(Chat);
User.hasMany(User, {as: 'Friend', through: 'Friendships'});
User.hasMany(Room, {through: 'Participants'});

// Room relationships
Room.hasMany(Chat);
Room.hasMany(User, {through: 'Participants'});

// Sync database
sequelize.sync();
