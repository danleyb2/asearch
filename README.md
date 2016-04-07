#Simple Ajax search

You only need to provide a search url and create a template for the response
###usage
insert before end of body tag  
`<script type="text/javascript" src="<path to aserch.js>"></script>`

create a result template.<br>
The JSON result keys values will replace the brackets

```js
    var resultTemplate =
        '<section class="opener">' +
        '<div class="avatar user3">' +
        '</div> ' +
        '<div class="postmeta"> ' + 'last seen ' +
        '<span class="time">{time}</span>  ' +
        '</div>   ' +
        '<span class="name">{name }</span>' +
        '<span class="location">from {location}</span>  ' +
        '<p>{about}</p> ' +
        '</section>';
```

create a config object

```js
    var config = {
        'template': resultTemplate,             //used to render the result
        'useHistory': true,                     //if false, every search result is got from the sever
        'input': '.search-input',               //search input form id or class
        'url': 'search.php?q=',                 //ajax request url via GET returns JSON array
        'resultsHolder': '.result-stream'       //DOM element that templates will be appended to
        'useLocalStorage':true                  //Use local storage to store search history
    };
```


then init `asearch.js`  
`searchAjax.init(config);`  
it will do the rest.
