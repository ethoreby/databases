// ChatsView.js - Defines a backbone view class for the message app.
var ChatsView = Backbone.View.extend({

  el: '.chatList',

  initialize: function(){
    var context = this;

    this.timer = setInterval(function () {
      context.collection.getChats();
    }, 4000);

    this.collection.on('add', this.render, this);
  },

  close: function () {
    clearInterval(this.timer);
  },

  render: function(){
    this.$el.html('');

    this.$el.append(
      this.collection.map(function(chat){
        return new ChatView({model: chat}).render();
      }, this)
    );
  }
});
