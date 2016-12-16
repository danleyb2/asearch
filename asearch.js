var searchAjax = {
    History: {},
    useHistory:true,
    useLocalStorage:true,

    init: function (config) {

        this.input = document.querySelector(config.input);
        this.resultStream = document.querySelector(config.resultsHolder);
        this.template = config.template;
        this.url=config.url;
        if(config.useLocalStorage==false)this.useLocalStorage=false;

        if (this.input == null || this.resultStream == null || this.template == null || this.url == null) {
            console.error("Initialization error!!");

        }
        else {
            this.XMLHTTPObject = new XMLHttpRequest();
            this.input.onkeydown = this.keyListener;
            this.input.addEventListener('input', this.textInput);
            this.input.addEventListener('blur', function (evt) {
                //clear history
            });
        }
    },
    keyListener: function (evt) {
        switch (evt.keyCode) {
            case 38:
                evt.preventDefault();
                searchAjax.activePrev(evt);
                break;
            case 40:
                evt.preventDefault();
                searchAjax.activeNext(evt);
                //return true;
                break;
        }
    },
    textInput: function (evt) {
        var q = evt.target.value.trim();
        if (q == '')return searchAjax.updateDisplay([]);
        if (searchAjax.useHistory) {
            if (searchAjax.useLocalStorage) {
                if (!localStorage.hasOwnProperty(q)) {
                    searchAjax.search(q);
                } else {
                    searchAjax.updateDisplay(JSON.parse(localStorage.getItem(q)))
                }
            } else {
                if (searchAjax.History[q] === undefined) {
                    searchAjax.search(q);
                } else {
                    searchAjax.updateDisplay(searchAjax.History[q])
                }
            }
        }else{
            searchAjax.search(q);
        }
    },
    activePrev: function (evt) {
        var active = searchAjax.resultStream.querySelector('.active');
        var prev = active.previousSibling;
        if (prev === null) {
        } else {
            active.classList.remove('active');
            prev.classList.add('active');
            searchAjax.updateInput(prev);
            prev.scrollIntoView(false);
        }

    },
    activeNext: function (evt) {
        var active = searchAjax.resultStream.querySelector('.active');
        var next = active.nextSibling;
        if (next === null) {
        } else {
            active.classList.remove('active');
            next.classList.add('active');
            searchAjax.updateInput(next);
            next.scrollIntoView(false);

        }


    },
    updateInput: function (a) {
        searchAjax.input.value = a.querySelector('.name').textContent;
    },
    render: function (template, values) {
        var tags = template.match(/{\s*([\w]+)+\s*}/g);
        var keys = tags.map(function (v) {
            return v.replace(/{|}/g, '');
        });
        for (var i = 0; i < tags.length; i++) {
            template = template.replace(tags[i], values[keys[i].trim()]);
        }
        return searchAjax.toHtmlDom(template);
    },
    toHtmlDom: function (html) {
        var el = document.createElement('div');
        el.innerHTML = html;
        return el.childNodes[0];
    },

    updateDisplay: function (data) {
        searchAjax.resultStream.innerHTML = '';
        data.forEach(function (rst) {
            searchAjax.resultStream.appendChild(searchAjax.render(searchAjax.template, rst));
        });
        if (data.length)searchAjax.resultStream.firstChild.classList.add('active');
    },
    search: function (q) {

        if (searchAjax.XMLHTTPObject.readyState == 0 || searchAjax.XMLHTTPObject.readyState == 4) {
            searchAjax.XMLHTTPObject.open('GET', searchAjax.url + q);
            searchAjax.XMLHTTPObject.onreadystatechange = function () {
                if (searchAjax.XMLHTTPObject.status == 200 && searchAjax.XMLHTTPObject.readyState == 4) {
                    var response = JSON.parse(searchAjax.XMLHTTPObject.responseText);
                    if (searchAjax.useHistory) {
                        if (searchAjax.useLocalStorage) {
                            localStorage.setItem(q, JSON.stringify(response));
                        } else {
                            searchAjax.History[q] = response;
                        }
                    }
                    searchAjax.updateDisplay(response);
                }
            };
            searchAjax.XMLHTTPObject.send();
        }
    }

};