(function($) {
  if (typeof($) === 'undefined') { $ = window.jQuery; }

  function Annotator(options) {
    if (typeof(options) === 'undefined') { var options = {} }

    var config = {}
    var annotations = this.annotations = options.annotations || [];
    var formDisplayed = false;

    config.db = options.db;
    config.target = options.target || window.location.href;
    config.selector = options.selector || 'body';

    var form = $('<div>', { id: 'annotator-form', class: 'annotator-form'});
    form.append($('<div>', { class: 'annotator-close', text: 'X' }));
    form.append($('<div>', { class: 'clearfix' }));
    form.append($('<input>', { id: 'annotator-body-input', type: 'text' }));
    form.append($('<input>', { id: 'annotator-name-input', type: 'text' }));
    form.append($('<input>', { id: 'annotator-email-input', type: 'text' }));
    form.append($('<input>', { id: 'annotator-submit', type: 'submit' }));
    form.append($('<div>', { class: 'clearfix' }));

    $(config.selector).prepend(form);

    this.push = function(annotation) {
      annotations.push(annotation);
      return annotations;
    }

    this.dataToString = function(options) {
      return JSON.stringify(this.annotations);
    }

    $('.annotator-close').click(function(e) {
      $(this).parent().fadeOut(100);
      formDisplayed = false;
    });

    $(config.selector).mousedown(function(e) {
      if (!e.target.toString().match(/http/) && !formDisplayed) {
        e.preventDefault();
        formDisplayed = true;
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
