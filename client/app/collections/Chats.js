// Chats.js - Defines a backbone collection class for messages.
var Chats = Backbone.Collection.extend({

  model: Chat,

  initialize: function (params) {
    this.url = this.model.prototype.url;

    this.getChats();
  },

  sendChat: function (chat) {
    chat = _.extend({
      text: $('.chatInput').val()
    });

    this.create(new Chat(chat));
  },

  getChats: function (options) {
    // options = _.extend({
    //   data: {
    //     limit: 10,
    //     order: '-updatedAt'
    //   }
    // }, options || {});

    this.fetch();
    // this.fetch(options);
  },

  parse: function (response) {
    return response.results;
  }
});
