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
    resultStream=document.querySelector('.result-stream');
    //document.onkeydown=keyListener;

    //rTemplate=document.querySelector('#template').cloneNode(true);
    //rTemplate.removeAttribute('style');
    //form.addEventListener('submit',search);

    input=form.querySelector('input');
    input.onkeydown=keyListener;
    //input.addEventListener('change',textChange);
    input.addEventListener('input',textChange);
    input.addEventListener('blur', function (evt) {
        //clear history
    });


};
function keyListener(evt){
    switch (evt.keyCode){
        case 38:
            evt.preventDefault();
            activePrev(evt);
            break;
        case 40:
            evt.preventDefault();
            activeNext(evt);
            //return true;
            break;
    }
}
function activePrev(evt){
    var active=resultStream.querySelector('.active');
    var prev=active.previousSibling;
    if(prev===null){}else {
        active.classList.remove('active');
        prev.classList.add('active');
        //updateInput();
        prev.scrollIntoView(false);

    }


}
function activeNext(evt){
    var active=resultStream.querySelector('.active');
    var next=active.nextSibling;
    if(next===null){}else {
        active.classList.remove('active');
        next.classList.add('active');
        next.scrollIntoView(false);

    }


}
function updateDisplay(data){
    resultStream.innerHTML='';
    data.forEach(function (rst) {
        resultStream.appendChild(render(rTemplate,rst));
    });
    if(data.length)resultStream.firstChild.classList.add('active');
}

function textChange(evt){
    var q=input.value.trim();
    if(q=='')return updateDisplay([]);
    if(History[q]===undefined){
        search(q);
    }else{
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


