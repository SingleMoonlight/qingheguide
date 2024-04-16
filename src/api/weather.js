import axios from "axios"

export function searchLocation(searchText) {
    return new Promise((resolve, reject) => {
        axios.get('/geo/' + searchText
        ).then(res => {
            if (res.data.code === '200') {
                resolve(res.data.location);
            } else {
                reject(res);
            }
        }).catch(err => {
            reject(err);
        })
    })
}

export function getNowWeather(locationId) {
    return new Promise((resolve, reject) => {
        axios.get('/nowWeather/' + locationId
        ).then(res => {
            if (res.data.code === '200') {
                resolve(res.data.now);
            } else {
                reject(res);
            }
        }).catch(err => {
            reject(err);
        })
    })
}

export function getNowAir(locationId) {
    return new Promise((resolve, reject) => {
        axios.get('/nowAir/' + locationId
        ).then(res => {
            if (res.data.code === '200') {
                resolve(res.data.now);
            } else {
                reject(res);
            }
        }).catch(err => {
            reject(err);
        })
    })
}

export function getFutureWeather(locationId) {
    return new Promise((resolve, reject) => {
        axios.get('/futureWeather/' + locationId
        ).then(res => {
            if (res.data.code === '200') {
                resolve(res.data.daily);
            } else {
                reject(res);
            }
        }).catch(err => {
            reject(err);
        })
    })
}

export function getFutureAir(locationId) {
    return new Promise((resolve, reject) => {
        axios.get('/futureAir/' + locationId
        ).then(res => {
            if (res.data.code === '200') {
                resolve(res.data.daily);
            } else {
                reject(res);
            }
        }).catch(err => {
            reject(err);
        })
    })
}
