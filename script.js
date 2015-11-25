var rTemplate =
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

var config = {
    'template': rTemplate,                  //used to render the result
    'useHistory': true,                     //every search result is from the sever
    'input': '.search-input',               //search input form
    'url': 'search.php?q=',                 //ajax request url via GET returns JSON array
    'resultsHolder': '.result-stream'       //templates will be appended
};

window.onload = function () {
    searchAjax.init(config);
};