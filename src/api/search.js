import { jsonpRequest } from './jsonp.js'

let suggest = {
    query: '',
    result: []
}

export function getSearchSuggest(keyword) {
    return new Promise((resolve, reject) => {
        let getSearchSuggestUrl = 'https://www.baidu.com/sugrec?prod=pc&wd=' + keyword;
        let callbackName = 'jsonpCallback_getSearchSuggest';
        jsonpRequest(getSearchSuggestUrl, callbackName)
            .then(data => {
                suggest.query = '';
                suggest.result.splice(0, suggest.result.length);
                if (data.g !== undefined) {
                    suggest.query = data.q;
                    data.g.forEach(element => {
                        suggest.result.push(element.q)
                    });
                }
                resolve(suggest)
            })
            .catch(error => {
                reject(error);
            });
    })
};

export function doSearch(url, value, mode) {
    if (mode === 'current') {
        window.location.href = url + value;
    } else if (mode === 'new') {
        window.open(url + value, '_blank');
    }
}