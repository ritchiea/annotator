(function($) {
  if (typeof($) === 'undefined') { $ = window.jQuery; }

  function Annotator(options) {
    if (typeof(options) === 'undefined') { var options = {} }

    var annotator = this;

    var config = {};
    var formDisplayed = false;

    config.db = options.db || 'https://brilliant-torch-2878.firebaseio.com/';
    config.target = options.target || window.location.href;
    config.selector = options.selector || 'body';

    var fireBaseStore = new Firebase(config.db);
    var data_from_firebase = [];

    fireBaseStore.on('value', function (snapshot) {
      data_from_firebase = snapshot.val();
      annotator.annotations = data_from_firebase;
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code);
    });

    var form = $('<div>', { id: 'annotator-form', class: 'annotator-form'});
    form.append($('<div>', { class: 'annotator-close', text: 'X' }));
    form.append($('<div>', { class: 'clearfix' }));
    form.append($('<textarea>', { class: 'annotator-body-input', placeholder: 'Comment' }));
    form.append($('<input>', { class: 'annotator-name-input', type: 'text', placeholder: 'Name' }));
    form.append($('<input>', { class: 'annotator-email-input', type: 'text', placeholder: 'Email' }));
    form.append($('<input>', { class: 'annotator-submit', type: 'submit' }));
    form.append($('<input>', { class: 'annotator-annotated-content', type: 'hidden' }));
    form.append($('<div>', { class: 'clearfix' }));

    $(config.selector).prepend(form);

    this.push = function(annotation) {
      annotation.target = config.target;
      updateDb(annotation);
      return annotation;
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
        if ($input.attr('class').match(/name/)) {
          annotationData.name = $input.val();
        } else if ($input.attr('class').match(/email/)) {
          annotationData.email = $input.val();
        } else if ($input.attr('class').match(/content/)) {
          annotationData.annotatedContent = JSON.parse($input.val());
        }
        $input.val('')

      });

      $body = $($submit.siblings('textarea')[0]);
      annotationData.body = $body.val();
      $body.val('');

      annotator.push(new Annotation(annotationData));

      $submit.parent().fadeOut(100);
      formDisplayed = false;
    });

    function updateDb(data) {
      fireBaseStore.push(data);
    }

    $(config.selector).mousedown(function(e) {
      if (!e.target.toString().match(/http/) && !formDisplayed) {
        e.preventDefault();
        var annotatedContent = {
          id: e.target.id,
          classList: e.target.classList,
          innerHTML: e.target.innerHTML,
          tagName: e.target.tagName
        };
        formDisplayed = true;
        if (e.which === 1) {
          $('.annotator-form')
            .css({top: e.pageY, left: e.pageX })
            .fadeIn(100)
            .find('input[type="hidden"]').val(JSON.stringify(annotatedContent));
        }
      }

    });
  }

  function Annotation(properties) {
    //       EXAMPLE
    //      { annotatedContent: { ... }, 
    //        body: 'Iama annotation', 
    //        author: 'Andrew Ritchie',
    //        email: 'hello@andrewritchie.info'  }

    for (var prop in properties) {
      this[prop] = properties[prop];
    }
    
    // added this function before implementing firebase, can be eliminated
    function getGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      })
    }

    this.id = getGuid();

  }

  window.Annotator = Annotator;
})(jQuery);
