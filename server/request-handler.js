/* global require, exports */
var httpHelpers = require('./http-helpers');
var db = require('../SQL/persistent_server');

messages = {

};

var getMessages = function(request, response){
  httpHelpers.sendResponse(response, {results: messages} );
};

var postMessage = function(request, response){
  // listen for chunks, assemble them
  httpHelpers.collectData(request, function(data){
    // parse the data
    var message = JSON.parse(data);
    console.log(message);

    // add to database
    var queryStr = 'INSERT INTO chats (chat_text, username, roomname)';
    queryStr += ' VALUES ("' + message.text + '","' + message.username + '","' + message.roomname + '");';

    console.log(queryStr);

    db.dbConnection.query(queryStr, function(err) {
      if (err) throw err;
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
