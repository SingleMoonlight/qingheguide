import { defineStore } from 'pinia'

export const useWebAppStore = defineStore('webAppStore', {
    state: () => ({
        app: [
            {
                groupId: '50524eb2-c604-4f74-a0a2-a0b13aa8ef16',
                groupName: '工具',
                groupApps: [
                    {
                        id: '91f1c924-32aa-4e2c-a8c2-77e62aa678c9',
                        name: '网易邮箱',
                        url: 'https://mail.163.com/',
                        iconSource: 'auto',
                        icon: '/svg/mail-163.svg',
                    },
                    {
                        id: 'dd419343-0856-4bbe-a619-1032634deedb',
                        name: '羽雀',
                        url: 'https://www.yuque.com/',
                        iconSource: 'auto',
                        icon: '/svg/yuque.svg',
                    },
                    {
                        id: '18cc9360-4b96-4ef3-9906-388418575b06',
                        name: 'Covertio',
                        iconSource: 'auto',
                        icon: '/svg/covertio.svg',
                        url: 'https://convertio.co/'
                    },
                    {
                        id: 'e9a5551b-82e5-4fd1-867a-679cae45adf5',
                        name: 'TinyPNG',
                        url: 'https://tinypng.com/',
                        iconSource: 'auto',
                        icon: '/svg/tinypng.svg',
                    },
                    {
                        id: 'b6bc880b-3201-4384-b7ea-d7605f92afd7',
                        name: 'Processon',
                        url: 'https://www.processon.com/',
                        iconSource: 'auto',
                        icon: '/svg/processon.svg',
                    }
                ]
            },
            {
                groupId: 'bf14008c-bfc0-4605-a82d-5d26b22a5b01',
                groupName: '编程',
                groupApps: [
                    {
                        id: '6df16133-946b-4eff-b102-f4c9ba871948',
                        name: '力扣',
                        url: 'https://leetcode.cn/',
                        iconSource: 'auto',
                        icon: '/svg/leetcode.svg',
                    },
                    {
                        id: '4590f997-5215-46bf-8a39-aa89601b73df',
                        name: 'Github',
                        url: 'https://github.com/',
                        iconSource: 'auto',
                        icon: '/svg/github.svg',
                    },
                    {
                        id: '07a9f9fe-4f32-406b-a5c7-b4520e013578',
                        name: 'Stack Overflow',
                        url: 'https://stackoverflow.com/',
                        iconSource: 'auto',
                        icon: '/svg/stackoverflow.svg',
                    },
                    {
                        id: '2d2b231c-56e7-4809-8282-221b9b43c1d9',
                        name: 'Vue',
                        url: 'https://vuejs.org/',
                        iconSource: 'auto',
                        icon: '/svg/vue.svg',
                    },
                ]
            },
            {
                groupId: '78787554-1fde-4a72-aa96-70184d09607c',
                groupName: '设计',
                groupApps: [
                    {
                        id: '7994097f-4c44-44a0-87a8-8b45004f76a8',
                        name: '即时设计',
                        url: 'https://js.design/',
                        iconSource: 'auto',
                        icon: '/svg/js-design.svg',
                    },
                    {
                        id: '5a0420fe-c86c-45b5-891d-18c35e64e479',
                        name: '稿定设计',
                        url: 'https://www.gaoding.com/',
                        iconSource: 'auto',
                        icon: '/svg/gaoding.svg',
                    },
                    {
                        id: '6856776e-ec77-4c72-9c50-800e8ba4b52d',
                        name: 'Unsplash',
                        url: 'https://unsplash.com/',
                        iconSource: 'auto',
                        icon: '/svg/unsplash.svg',
                    },
                    {
                        id: '7f129794-fec7-42d5-9f4a-bee0ecdb44c6',
                        name: 'Iconfont',
                        url: 'https://www.iconfont.cn/',
                        iconSource: 'auto',
                        icon: '/svg/iconfont.svg',
                    },
                ]
            },
            {
                groupId: '4cec8bf0-0d52-4d48-9094-78b54336ad1b',
                groupName: '学术',
                groupApps: [
                    {
                        id: '66c25238-401e-4a68-bc35-fc689182caf3',
                        name: '中国知网',
                        url: 'https://www.cnki.net/',
                        iconSource: 'auto',
                        icon: '/svg/cnki.svg',
                    },
                    {
                        id: 'a582c531-c9d4-422b-a2ef-b9dd43e018e0',
                        name: '万方数据',
                        url: 'https://www.wanfangdata.com.cn/',
                        iconSource: 'auto',
                        icon: '/svg/wanfangdata.svg',
                    },
                    {
                        id: '14a62bfe-343a-4f45-91d1-eeaa3f35c6f2',
                        name: '维普网',
                        url: 'https://www.cqvip.com/',
                        iconSource: 'auto',
                        icon: '/svg/cqvip.svg',
                    },
                    {
                        id: 'bf561c82-5897-4857-8711-65ff7e9ea175',
                        name: '中国国家图书馆',
                        url: 'http://www.nlc.cn/',
                        iconSource: 'auto',
                        icon: '/svg/nlc.svg',
                    },
                    {
                        id: '2aba3df9-76a5-4e96-9ebc-a596c077e7e7',
                        name: '谷歌学术',
                        url: 'https://scholar.google.com/',
                        iconSource: 'auto',
                        icon: '/svg/google-scholar.svg',
                    },
                    {
                        id: '1e5d2ca9-1746-45fe-bbd0-1ffdebf2c755',
                        name: 'Nature',
                        url: 'https://www.nature.com/',
                        iconSource: 'auto',
                        icon: '/svg/nature.svg',
                    },
                    {
                        id: '769f369e-3c2f-4bb4-bc99-851883353219',
                        name: 'IEEE',
                        url: 'https://www.ieee.org/',
                        iconSource: 'auto',
                        icon: '/svg/ieee.svg',
                    },
                ]
            },
            {
                groupId: '9d9e1127-f166-4df6-bcf4-bc27c1bd9ca5',
                groupName: '娱乐',
                groupApps: [
                    {
                        id: '1dfef7ad-ab64-46c3-b41f-03abc7e88949',
                        name: '爱奇艺',
                        url: 'https://www.iqiyi.com/',
                        iconSource: 'auto',
                        icon: '/svg/iqiyi.svg',
                    },
                    {
                        id: '80fa2525-d1ec-4bfb-9962-967fb4ba4f68',
                        name: '优酷',
                        url: 'https://www.youku.com/',
                        iconSource: 'auto',
                        icon: '/svg/youku.svg',
                    },
                    {
                        id: '6b0aa197-900b-490e-9048-d74c69a56ebc',
                        name: '腾讯视频',
                        url: 'https://v.qq.com/',
                        iconSource: 'auto',
                        icon: '/svg/tencentvideo.svg',
                    },
                    {
                        id: '3f7793d7-8dae-4b2e-aa0d-b7f50ae61b30',
                        name: '哔哩哔哩',
                        url: 'https://www.bilibili.com/',
                        iconSource: 'auto',
                        icon: '/svg/bilibili.svg',
                    },
                    {
                        id: '7d838953-c384-4895-8417-3ed108eecc48',
                        name: '虎牙直播',
                        url: 'https://www.huya.com/',
                        iconSource: 'auto',
                        icon: '/svg/huya.svg',
                    },
                    {
                        id: '1dc5db6e-7c41-40ac-8e2e-e08900d14411',
                        name: 'Steam',
                        url: 'https://store.steampowered.com/',
                        iconSource: 'auto',
                        icon: '/svg/steam.svg',
                    },
                    {
                        id: 'f38590af-511e-4e4d-a542-98214abfdcd6',
                        name: 'Epic',
                        url: 'https://www.epicgames.com/',
                        iconSource: 'auto',
                        icon: '/svg/epic.svg',
                    },
                ]
            },
        ]
    }),
})