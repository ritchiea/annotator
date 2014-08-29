Annotator
=========

Dependencies
------------

* [Firebase] (https://www.firebase.com/)
* [jQuery] (http://jquery.com/)

Usage
-----

If you include annotator.js and its dependencies on a page you can instantiate an annotator with a Javascript constructor, e.g.:

```javascript
var myAnnotator = new Annotator({selector: 'body', db: 'https://brilliant-torch-2878.firebaseio.com/'});
```

You can pass the Annotator constructor options such as the address of your firebase instance and a CSS selector for the annotatable content. In this initial example I'm passing 'body' as the selector so the entire DOM is annotatable. You can imagine how it's useful to pass a more specific selector as you may have a page with navigation, a footer, etc. that is not annotatable as well as annotatable content.

Once the Annotator is instantiated any DOM element within the element selected will be annotatable with a left click (if you click on an anchor you will follow the link rather than revealing the annotation form). 

When you left click a form pops up. Clicking submit pushes a new comment to Firebase and clears the form. Right now the annotations are available in memory, e.g.:

```javascript
myAnnotator.annotations;
{ Object of annotations... }
```

Firebase handles pushing new annotations to an Annotator via an asynchronous callback. 

Future
------

In this implementation each commentable URL would need it's own Firebase instance but in the future it would be an improvement to refactor the Annotator so that the page URL is a key in a key/value store where the value is that page's annotations. 

The other key improvement that I would make next is adding a clickable DOM element to show all comments associated with that element. Currently all the relevant data (id, classList & innerHTML) is stored on an annotation so it would be straightforward to iterate through annotations and add a list of relevant annotations to a given DOM element.
