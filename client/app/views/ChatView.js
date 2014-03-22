// AppView.js - Defines a backbone view class for the message app.
var ChatView = Backbone.View.extend({

  tagName: 'li',

  template: _.template(
    '<%= username %>: <%= message %>'
  ),

  initialize: function (params) {
    this.render();
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }
});
