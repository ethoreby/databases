/* global require, exports */
var httpHelpers = require('./http-helpers');
// var db = require('../SQL/persistent_server'); // SQL Helper Functions
// var userHelpers = require('./user-helpers'); // SQL Helper Functions
var sequelize = require('../SQL/sqlize');

var getMessages = function(request, response){
  // SQLize
  var messages = sequelize.Chat.find();
  console.log(JSON.stringify(messages));

  httpHelpers.sendResponse(response, { results: messages });

  // SQL
  // var queryStr = 'SELECT * FROM chats';
  // db.dbConnection.query(queryStr, function(err, output) {
  //   if(err) { throw err; }
  //   httpHelpers.sendResponse(response, {results: output} );
  // });
};

// SQL Helper Function
// var saveMessage = function(request, response, message) {
//   userHelpers.getUser(message.username, function(user) {
//     message['userid'] = user.id;

//     var queryStr = 'INSERT INTO chats (message, username, roomname, user_id)';
//     queryStr += ' VALUES ("' + message.message + '","' + message.username + '","' + message.roomname + '",' + message.userid + ');';

//     console.log(queryStr);

//     db.dbConnection.query(queryStr, function(err) {
//       if (err) {
//         console.log('Error: Could not save message');
//         httpHelpers.sendResponse(response,null, 500);
//         throw err;
//       } else {
//         httpHelpers.sendResponse(response, null, 201);
//       }
//     });
//   });
// };

var postMessage = function(request, response){
  // SQLize
  httpHelpers.collectData(request, function(data) {
    console.log(data);
    var message = JSON.parse(data);

    sequelize.sequelize.sync();
    sequelize.User.findOrCreate({ username: message.username })
      .success(function(user) {
        message.UserId = user.id;
        sequelize.Chat.create(message)
          .success(function() {
            httpHelpers.sendResponse(response, null, 201);
          })
          .error(function(error) {
            httpHelpers.sendResponse(response, error, 500);
          });
      });
  });

  // SQL
  // // listen for chunks, assemble them
  // httpHelpers.collectData(request, function(data){
  //   // parse the data
  //   var message = JSON.parse(data);

  //   userHelpers.checkUser(message.username, function(exists) {
  //     if (!exists) {
  //       userHelpers.createUser(message.username, function(created) {
  //         if (created) {
  //           saveMessage(request, response, message);
  //         }
  //       });
  //     } else {
  //       saveMessage(request, response, message);
  //     }
  //   });
  // });
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
