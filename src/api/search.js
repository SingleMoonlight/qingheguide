import axios from "axios"

let searchRequestCancel = null
let suggestResult = []

export function getSearchSuggest(keyword) {
    return new Promise((resolve, reject) => {
        if (searchRequestCancel !== null) {
            searchRequestCancel();
        }
        axios.get('/sug', {
            params: {
                prod: "pc",
                wd: keyword
            },
            cancelToken: new axios.CancelToken((cancel) => {
                // 这里cancel就是取消当前请求的方法
                searchRequestCancel = cancel;
            })
        }).then(res => {
            suggestResult.splice(0, suggestResult.length);
            if (res.data.g !== undefined) {
                res.data.g.forEach(element => {
                    suggestResult.push(element.q)
                });
            }
            resolve(suggestResult);
        }).catch(err => {
            if (axios.isCancel(err)) {
                // 请求被取消
            } else {
                reject(err.data);
            }
        })
    })
}

export function startSearch(url, value, mode) {
    if (mode === 'currentPage') {
        window.location.href = url + value;
    } else if (mode === 'newPage') {
        window.open(url + value, '_blank');
    }
}