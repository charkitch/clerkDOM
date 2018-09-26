# clerkDOM

**Still working on AJAX promises, some elements in library(test file, window declaration, still, not readly for production.**

clerkDOM is inspired by jQuery's ability to abstract away the syntax of DOM manipulation. 
The mission of clerkDOM is to leverage advancements in browser specifications to mimic 
jQuery core functionality using modern browser native functions such as the Selectors API. 
clerkDOM is able, by taking advantage of these advancements, to provide a light foot 
print tool to search and manipulate the element tree while performing asynchronous functions such as building 
an execution queue and issuing AJAX request and performing success callbacks.

## API

```$l(selector)```

provide the clerkDOM function with a css selector and a DOMNodeCollection of matching objects is returned.

```$l(function)```

Add the function to the queu to await invocation upon the Document being loaded. 
If the document is loaded immediately invoke the function. 

```$l.ajax```

Merges supplied options params, overwriting defaults if necessery, and issues an XHR request. 
If a 200 or 304 or other sub 400 status code is received the functions specified under the success keys are executed. 
Otherwise, error callbacks are. 

```$l(html element)```

```empty``` 

Sets the inner HTML of each object in the node to an empty string. 

```html```(with argument)

The argument is set as the inner html on each object in the collection. 

```html```(without argument)

Return the inner html of the first object in the collection

```attr```(with only an attribute as an argument)

Return the value of the attribute for the first item in the collection.

```attr```(with an attribute and a new value)

Sets the attribute value for each elemnent in the collection the new value provided. 

```append```
Accepts either a DOMNodeCollection, an html element, or a string. 

```addClass```

adds a class or classes to each element in the collection upon which it is invoked. 

```removeClass```

Removes a class or classes from each element in the collection upon which it was invoked.

```children```

Returns a new DNC collection of the children of every element in the collection. 

```Parent```
Returns a new collection consisting of the parents of each node in the collection. 

```find```
return a collection of every child that matches the supplies selector.

```remove```

Eliminate the collection.

```on```

Add an event listener to each member of the collection of a given type with a callabkack to
performed upon activation. Record listener on object so that it can be cancelled with ```off```.

```off```

Remove the event listener of the given type from each element. 

```$l.extend```

Merge two JS objects.


