export class IndexedDB {
    // 构造函数
    constructor(dbName, tableName, tableOption) {
        this.db = null;
        this.transaction = null;
        this.request = null;
        this.dbName = dbName;
        this.tableName = tableName;
        this.tableOption = tableOption; // 主键等自定义设置
        this.dbversion = 1;
    }

    initDB() {
        return new Promise((resolve, reject) => {
            this.request = window.indexedDB.open(this.dbName, this.dbversion);
            this.request.onsuccess = (event) => {
                this.db = this.request.result;
                resolve(event);
            };
            this.request.onerror = (event) => {
                reject(event);
            };
            // 数据库初次创建或更新时会触发
            this.request.onupgradeneeded = (event) => {
                let db = this.request.result;
                if (!db.objectStoreNames.contains(this.tableName)) {
                    db.createObjectStore(this.tableName, this.tableOption);
                }
                resolve(event);
            };
        });
    }

    closeDB() {
        this.db.close();
    }

    addData(params) {
        return new Promise((resolve, reject) => {
            let transaction = this.db.transaction(this.tableName, "readwrite");
            let store = transaction.objectStore(this.tableName);
            let response = store.add(params);

            response.onsuccess = (event) => {
                resolve(event);
            };
            response.onerror = (event) => {
                reject(event);
            };
        });
    }

    getDataByKey(key) {
        return new Promise((resolve, reject) => {
            let transaction = this.db.transaction(this.tableName, "readonly");
            let objectStore = transaction.objectStore(this.tableName);
            // 通过主键读取数据
            let request = objectStore.get(key);

            request.onsuccess = () => {
                resolve(request.result);
            };
            request.onerror = (event) => {
                reject(event);
            };
        });
    }

    updateData(params) {
        return new Promise((resolve, reject) => {
            let transaction = this.db.transaction(this.tableName, "readwrite");
            let store = transaction.objectStore(this.tableName);
            let response = store.put(params);

            response.onsuccess = (event) => {
                resolve(event);
            };
            response.onerror = (event) => {
                reject(event);
            };
        });
    }

    deleteData(params) {
        return new Promise((resolve, reject) => {
            let transaction = this.db.transaction(this.tableName, "readwrite");
            let store = transaction.objectStore(this.tableName);
            let response = store.delete(params);

            response.onsuccess = (event) => {
                resolve(event);
            };
            response.onerror = (event) => {
                reject(event);
            };
        });
    }

    clearDB() {
        return new Promise((resolve, reject) => {
            let transaction = this.db && this.db.transaction(this.tableName, "readwrite");
            let store = transaction && transaction.objectStore(this.tableName);
            let response = store && store.clear();

            response.onsuccss = (event) => {
                resolve(event);
            };
            response.onerror = (event) => {
                reject(event);
            };
        });
    }

    deleteDBAll() {
        let request = window.indexedDB.deleteDatabase(this.dbName);
        return new Promise((resolve, reject) => {
            request.onsuccess = function (event) {
                resolve(event);
            };
            request.onerror = function (event) {
                reject(event);
            };

        });
    }
}

// 目前仅有图片放在indexed数据库中，以下接口不在另分文件
import { useSettingStore } from '@/stores/settingStore'
import { useFlagStore } from '@/stores/flagStore'
import { useWebAppStore } from '@/stores/webAppStore'
import { printLog } from '@/utils/common'
import { defaultBackgroundUrl } from '@/utils/constant'

let imageDB = null

export function initImageDB() {
    imageDB = new IndexedDB('qingheguide', 'image', {
        keyPath: 'name' // 设置图片名称为主键
    });
    imageDB.initDB().then(res => {
        getBackgroundImg();
        getWebAppIconImg();
        printLog('result', 'initImageDB initDB', res);
    }).catch((err) => {
        printLog('error', 'initImageDB initDB', err);
    });
}

export function deleteImageDB() {
    imageDB.deleteDBAll().then(res => {
        printLog('result', 'deleteImageDB deleteDBAll', res);
    }).catch((err) => {
        printLog('error', 'deleteImageDB deleteDBAll', err);
    });
}

export function setBackgroundImg(imageData) {
    const settingStore = useSettingStore();
    let data = { 'name': 'background', 'data': imageData };

    imageDB.updateData(data).then(res => {
        // 创建指向图片文件的url并保存
        let imgURL = window.URL.createObjectURL(imageData);
        settingStore.$state.bgUrl = imgURL;

        printLog('result', 'setBackgroundImg updateData', res);
    }).catch((err) => {
        settingStore.$state.bgUrl = defaultBackgroundUrl;
        settingStore.$state.bgSource = 'default';

        printLog('error', 'setBackgroundImg updateData', err);
    });
}

export function getBackgroundImg() {
    const settingStore = useSettingStore();
    const flagStore = useFlagStore();

    if (settingStore.$state.bgSource === 'default') {
        flagStore.$state.bgImgIsGot = true;
        return;
    }

    imageDB.getDataByKey('background').then(res => {
        // 创建指向图片文件的url并保存
        let imgURL = window.URL.createObjectURL(res.data);
        settingStore.$state.bgUrl = imgURL;
        flagStore.$state.bgImgIsGot = true;

        printLog('result', 'getBackgroundImg getDataByKey', res);
    }).catch((err) => {
        settingStore.$state.bgUrl = defaultBackgroundUrl;
        settingStore.$state.bgSource = 'default';
        flagStore.$state.bgImgIsGot = true;

        printLog('error', 'getBackgroundImg getDataByKey', err);
    });
}

export function deleteBackgroundImg() {
    imageDB.deleteData('background').then(res => {
        printLog('result', 'deleteBackgroundImg deleteData', res);
    }).catch((err) => {
        printLog('error', 'deleteBackgroundImg deleteData', err);
    });
}

export function setWebAppIconImg(webAppId, imageData) {
    let data = { 'name': webAppId, 'data': imageData };

    imageDB.updateData(data).then(res => {
        printLog('result', 'setWebAppIconImg updateData', res);
    }).catch((err) => {
        printLog('error', 'setWebAppIconImg updateData', err);
    });
}

export function getWebAppIconImg() {
    const webAppStore = useWebAppStore();

    webAppStore.$state.webAppGroups.forEach(group => {
        group.groupApps.forEach(app => {
            if (app.iconSource === 'custom') {
                imageDB.getDataByKey(app.id).then(res => {
                    // 创建指向图片文件的url并保存
                    let imgURL = window.URL.createObjectURL(res.data);
                    app.icon = imgURL;
                    printLog('result', 'getWebAppIconImg getDataByKey', res);
                }).catch((err) => {
                    printLog('error', 'getWebAppIconImg getDataByKey', err);
                });
            }
        })
    });
}

export function deleteWebAppIconImg(webAppId) {
    imageDB.deleteData(webAppId).then(res => {
        printLog('result', 'deleteWebAppIconImg deleteData', res);
    }).catch((err) => {
        printLog('error', 'deleteWebAppIconImg deleteData', err);
    });
}
