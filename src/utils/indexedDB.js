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

    deleteDBAll(dbName) {
        console.log(dbName);
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
import { useSettingStore } from '@/stores/setting'
import { useFlagStore } from '@/stores/flag'

let imageDB = null

export function initImageDB() {
    imageDB = new IndexedDB('qingheguide', 'image', {
        keyPath: 'name' // 设置图片名称为主键
    });
    imageDB.initDB().then(res => {
        getBackgroundImg();
    }).catch((err) => {
    });
}

export function deleteImageDB() {
    imageDB.deleteDatabase().then(res => {
    }).catch((err) => {
    });
}

export function setBackgroundImg(imageData) {
    let data = { 'name': 'background', 'data': imageData };

    imageDB.updateData(data).then(res => {
        const settingStore = useSettingStore();

        // 创建指向图片文件的url并保存
        let imgURL = window.URL.createObjectURL(imageData);
        settingStore.$state.backgroundUrl = imgURL;
    }).catch((err) => {
    });
}

export function getBackgroundImg() {
    imageDB.getDataByKey('background').then(res => {
        const settingStore = useSettingStore();
        const flagStore = useFlagStore();

        flagStore.$state.bgImgIsGet = true;
        // 创建指向图片文件的url并保存
        let imgURL = window.URL.createObjectURL(res.data);
        settingStore.$state.backgroundUrl = imgURL;
    }).catch((err) => {
    });
}

