(function($) {
  if (typeof($) === 'undefined') { $ = window.jQuery; }

  function Annotator(options) {
    if (typeof(options) === 'undefined') { var options = {} }

    var annotator = this;

    var config = {}
    var annotations = this.annotations = options.annotations || [];
    var formDisplayed = false;

    config.db = options.db;
    config.target = options.target || window.location.href;
    config.selector = options.selector || 'body';

    var form = $('<div>', { id: 'annotator-form', class: 'annotator-form'});
    form.append($('<div>', { class: 'annotator-close', text: 'X' }));
    form.append($('<div>', { class: 'clearfix' }));
    form.append($('<input>', { class: 'annotator-body-input', type: 'text' }));
    form.append($('<input>', { class: 'annotator-name-input', type: 'text' }));
    form.append($('<input>', { class: 'annotator-email-input', type: 'text' }));
    form.append($('<input>', { class: 'annotator-submit', type: 'submit' }));
    form.append($('<div>', { class: 'clearfix' }));

    $(config.selector).prepend(form);

    this.push = function(annotation) {
      annotation.target = config.target;
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

    $('#annotator-form input[type="submit"]').click(function(e) {
      e.preventDefault();
      $submit = $(this);
      var annotationData = {};
      $submit.siblings('input').each(function(index) {
        var $input = $(this);
        if ($input.attr('class').match(/body/)) {
          annotationData.body = $input.val();
        } else if ($input.attr('class').match(/name/)) {
          annotationData.name = $input.val();
        } else if ($input.attr('class').match(/email/)) {
          annotationData.email = $input.val();
        }
      });

      annotator.push(new Annotation(annotationData));

      $submit.parent().fadeOut(100);
      formDisplayed = false;
    });

    function updateDb() {
      $.ajax({ 
        url: config.db
      }).done(function() {

      });
    }

    $(config.selector).mousedown(function(e) {
      if (!e.target.toString().match(/http/) && !formDisplayed) {
        e.preventDefault();
        formDisplayed = true;
        if (e.which === 1) {
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
