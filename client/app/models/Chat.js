// Chat.js - Defines a backbone model class for messages.
var Chat = Backbone.Model.extend({

  url: 'http://127.0.0.1:3000/classes/messages',

  defaults: {
    username: 'username',
    message: 'text',
    roomname: 'roomname'
  }
});
