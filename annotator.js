(function($) {
  if (typeof($) === 'undefined') { $ = window.jQuery; }

  function Annotator(options) {
    if (typeof(options) === 'undefined') { var options = {} }

    var config = {}
    var annotations = this.annotations = options.annotations || [];

    config.db = options.db;
    config.target = options.target || window.location.href;
    config.selector = options.selector || 'body';

    var form = $('<div>', { id: 'annotator-form', class: 'annotator-form'});
    $(config.selector).prepend(form);

    this.push = function(annotation) {
      annotations.push(annotation);
      return annotations;
    }

    this.dataToString = function(options) {
      return JSON.stringify(this.annotations);
    }

    $(config.selector).mousedown(function(e) {
      if (!e.target.toString().match(/http/)) {
        e.preventDefault();
        if (e.which === 1) {
          console.log(e);
          $('.annotator-form').css({top: e.pageY, left: e.pageX }).fadeIn(100)
        }
      }

    });
  }

  function Annotation(properties) {
    //       EXAMPLE
    //      { selector: 'h1.title', 
    //        body: 'Iama annotation', 
    //        author: 'Andrew Ritchie',
    //        email: 'hello@andrewritchie.info'  }

    for (var prop in properties) {
      this[prop] = properties[prop];
    }

  }

  window.Annotator = Annotator;
})(jQuery);
