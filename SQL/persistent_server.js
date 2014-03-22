/* global require, exports */
var mysql = require('mysql');

var dbConnection = exports.dbConnection = mysql.createConnection({
  user: 'root',
  password: 'password',
  database: 'chat'
});

dbConnection.connect();
