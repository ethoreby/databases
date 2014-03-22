var App = Backbone.Model.extend({
  initialize: function (params) {
    window.app = this;

    this.set('chats', new Chats());
  }
});