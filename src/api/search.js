import { useJsonpRequest } from './jsonp.js'

let suggestResult = []

export const getSearchSuggest = async (keyword) => {
    return new Promise((resolve, reject) => {
        const { fetchJsonp } = useJsonpRequest(
            'https://www.baidu.com/sugrec', // 确保这个 URL 支持 JSONP
            'jsonpCallback', // 这里指定的前缀会被用来生成回调函数名称
            { prod: "pc", wd: keyword }
        );

        fetchJsonp().then(data => {
            suggestResult.splice(0, suggestResult.length);
            if (data.g !== undefined) {
                data.g.forEach(element => {
                    suggestResult.push(element.q)
                });
            }
            resolve(suggestResult)
        }).catch(err => {
            reject(err.data);
        })
    })
};

export function doSearch(url, value, mode) {
    if (mode === 'current') {
        window.location.href = url + value;
    } else if (mode === 'new') {
        window.open(url + value, '_blank');
    }
}