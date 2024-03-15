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
            suggestResult.splice(0, res.data.g.length);
            res.data.g.forEach(element => {
                suggestResult.push(element.q)
            });
            resolve(suggestResult);
        }).catch(err => {
            if (axios.isCancel(err)) {
                // 请求被取消
                // console.log('Search request canceled', err.data);
            } else {
                reject(err.data);
            }
        })
    })
}

export function startSearch() {

}