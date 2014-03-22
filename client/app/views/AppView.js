// AppView.js - Defines a backbone view class for the message app.
var AppView = Backbone.View.extend({

  initialize: function (params) {
    var context = this;

    this.chatsView = new ChatsView({collection: this.model.get('chats')});

    // this.model.on('all', this.render, this);
    $('.chatButton').on('click', function () {
      console.log('clicked');
      context.model.get('chats').sendChat();
    });
  },

  render: function(){
    return this.$el.html([this.chatsView.$el]);
  }

});
