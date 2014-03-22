/* global require, exports */
var httpHelpers = require('./http-helpers');
var db = require('../SQL/persistent_server');

var getMessages = function(request, response){
  var queryStr = 'SELECT * FROM chats';
  db.dbConnection.query(queryStr, function(err, output) {
    if(err) { throw err; }
    httpHelpers.sendResponse(response, {results: output} );
  });
};

var postUser = function(username) {
  var queryStr = 'INSERT INTO users (username)';
  queryStr += ' VALUES ("' + username + '");';

  db.dbConnection.query(queryStr, function(err) {
    console.log('creating new user %s', username);
    if (err) { throw err; }
  });
};

var checkUser = function(username) {
  var queryStr = 'SELECT user_id FROM users WHERE username="' + username + '"';

  db.dbConnection.query(queryStr, function(err, output) {
    console.log('checking user ' + username);
    if (err) { throw err; }

    if (output.length === 0) {
      postUser(username);
    }
  });
};

var postMessage = function(request, response){
  // listen for chunks, assemble them
  httpHelpers.collectData(request, function(data){
    // parse the data
    var message = JSON.parse(data);

    // add to database
    var queryStr = 'INSERT INTO chats (message, username, roomname)';
    queryStr += ' VALUES ("' + message.message + '","' + message.username + '","' + message.roomname + '");';

    console.log(queryStr);

    db.dbConnection.query(queryStr, function(err) {
      if (err) { throw err; }
    });

    httpHelpers.sendResponse(response, null, 201);
  });
};

var options = function(request, response){
  httpHelpers.sendResponse(response);
};

var actions = {
  'GET': getMessages,
  'POST': postMessage,
  'OPTIONS': options
};

exports.handler = function(request, response) {
  var action = actions[request.method];
  if( action ){
    action(request, response);
  } else {
    httpHelpers.sendResponse(response, null, 404);
  }
};
