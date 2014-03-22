/* global require, exports */
/* exported httpHelpers, checkUser, postUser, createUser */

var httpHelpers = require('./http-helpers');
var db = require('../SQL/persistent_server');

//== Create new user in db ======================================
exports.createUser = function(username, callback) {
  var queryStr = 'INSERT INTO users (username)';
  queryStr += ' VALUES ("' + username + '");';

  db.dbConnection.query(queryStr, function(err) {
    console.log('creating new user %s', username);
    if (err) {
      console.log('Error: Could not create user');
      callback(false);
      throw err;
    }else {
      callback(true);
    }
  });
};

//== Check for user in db ======================================
exports.checkUser = function(username, callback) {
  var queryStr = 'SELECT id FROM users WHERE username="' + username + '"';

  db.dbConnection.query(queryStr, function(err, output) {
    console.log('checking user ' + username);
    if (err) { throw err; }

    if (output.length === 0) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

//== Get user data from db ======================================
exports.getUser = function(username, callback) {
  var queryStr = 'SELECT * FROM users WHERE username="' + username + '"';

  db.dbConnection.query(queryStr, function(err, output) {
    console.log('checking: ' + username);
    console.log('output: ' + JSON.stringify(output[0]));

    callback(output[0]);
  });
};
