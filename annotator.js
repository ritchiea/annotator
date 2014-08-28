(function() {

  function Annotator(options) {
    this.annotations = [];

    this.push = function(annotation) {
      this.annotations.push(annotation);
      return annotation;
    }

    this.getAllAnnotations = function(options) {
      return JSON.stringify(annotations);
    } 
  }

  function Annotation(properties) {
    //       EXAMPLE
    //      { target: 'h1.title', 
    //        body: 'Iama annotation', 
    //        author: 'Andrew Ritchie',
    //        email: 'hello@andrewritchie.info'  }

    for (var prop in properties) {
      this[prop] = properties[prop];
    }

  }

  window.Annotator = Annotator;
})();
