var XMLHTTPObject=new XMLHttpRequest();
var History={};




function render(template,values){
     var tags=template.match(/{([a-z1-9\s]+)+}/g);
     var keys=tags.map(function (v) {
        return v.replace(/{|}/g,'');
     });

    //tags.forEach(function (tag) {
        for(var i=0;i<tags.length;i++) {
            template=template.replace(tags[i], values[keys[i].trim()] );
        }
    //});

    return htmlDom(template);
}

var rTemplate=
    '<section class="opener">'+
        '<div class="avatar user3">' +
        '</div> ' +
        '<div class="postmeta"> ' +'last seen '+
            '<span class="time">{time}</span>  ' +
        '</div>   ' +
        '<span class="name">{name }</span>' +
        '<span class="location">from {location}</span>  ' +
        '<p>{about}</p> ' +
    '</section>';

//var resultTemplate=document.createElement('section');
//resultTemplate.classList.add('opener');
//resultTemplate.innerHTML=rTemplate;

var htmlDom= function (html) {
    var el=document.createElement('div');
    el.innerHTML=html;
    return el.childNodes[0];
};


var form;
var input;
var resultStream;
window.onload= function () {
    form=document.querySelector('#search');
    resultStream=document.querySelector('.stream');

    //rTemplate=document.querySelector('#template').cloneNode(true);
    //rTemplate.removeAttribute('style');
    //form.addEventListener('submit',search);

    input=form.querySelector('input');
    //input.addEventListener('change',textChange);
    input.addEventListener('input',textChange);
    input.addEventListener('blur', function (evt) {
        //clear history
    });


};
function updateDisplay(data){
    resultStream.innerHTML='';
    data.forEach(function (rst) {
        resultStream.appendChild(render(rTemplate,rst));
    });
}

function textChange(evt){
    var q=input.value.trim();
    if(q=='')return updateDisplay([]);
    if(History[q]===undefined){
        search(q);
    }else{
        console.log('rendering from history');
       updateDisplay(History[q])
    }
}
 function search (q) {

    if(XMLHTTPObject.readyState==0||XMLHTTPObject.readyState==4){
        XMLHTTPObject.open('GET','search.php?q='+q);
        XMLHTTPObject.onreadystatechange= function () {
          if(XMLHTTPObject.status==200 && XMLHTTPObject.readyState==4){
              var response=JSON.parse(XMLHTTPObject.responseText);
              History[q]=response;
              updateDisplay(response);
          }
        };
        XMLHTTPObject.send();
    }
}


