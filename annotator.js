(function($) {
  if (typeof($) === 'undefined') { $ = window.jQuery; }

  function Annotator(options) {
    this.annotations = options.annotations || [];
    this.db = options.db;
    this.target = options.target || window.location.href;
    this.selector = options.selector || 'body';

    var form = $('<div>', { id: 'annotator-form', class: 'annotator-form'});
    $(selector).prepend(form);

    this.push = function(annotation) {
      this.annotations.push(annotation);
      return annotation;
    }

    this.dataToString = function(options) {
      return JSON.stringify(annotations);
    }

    $(selector).mousedown(function(e) {
      // if right click
      if (e.which === 3) {
        e.preventDefault();
        $('.annotator-form').css({top: e.offsetY, left: e.offsetX }).fadeIn(100)
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
