var Travis = {
  app: null,
  start: function() {
    Backbone.history = new Backbone.History;
    Travis.app = new ApplicationController;
    Travis.app.run();
  },
  trigger: function(event, data) {
    Travis.app.trigger(event, _.extend(data.build, { append_log: data.log }));
  }
};

if(!INIT_DATA) {
  var INIT_DATA = {};
}

$(document).ready(function() {
  if(!window.__TESTING__) {
    Travis.start();
    Backbone.history.start();
  }

  var channels = ['repositories', 'jobs'];
  // _.map(INIT_DATA.repositories || [], function(repository) { channels.push('repository_' + repository.id); });
  _.each(channels, function(channel) { pusher.subscribe(channel).bind_all(Travis.trigger); })


  // fake github pings
  $('.github_ping').click(function(event) {
    $.post($(this).attr('href'), { payload: $(this).attr('data-payload') });
    event.preventDefault();
  });
});

Pusher.log = function() {
  if (window.console) {
    // window.console.log.apply(window.console, arguments);
  }
};


