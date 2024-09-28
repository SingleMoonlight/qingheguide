import { jsonpRequest } from './jsonp.js'

let suggestResult = []

export const getSearchSuggest = async (keyword) => {  
    return new Promise((resolve, reject) => {
        let getSearchSuggestUrl = 'https://www.baidu.com/sugrec?prod=pc&wd=' + keyword;
        let callbackName = 'jsonpCallback_getSearchSuggest';
        jsonpRequest(getSearchSuggestUrl, callbackName)
            .then(data => {
                suggestResult.splice(0, suggestResult.length);
                if (data.g !== undefined) {
                    data.g.forEach(element => {
                        suggestResult.push(element.q)
                    });
                }
                resolve(suggestResult)
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