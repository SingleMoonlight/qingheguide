import { defineStore } from 'pinia'

export const useWebAppStore = defineStore('webAppStore', {
    state: () => ({
        app: [
            {
                groupId: '0',
                groupName: '工具',
                groupApps: [
                    {
                        id: '0',
                        name: '网易邮箱',
                        url: 'https://mail.163.com/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/mail-163.svg',
                    },
                    {
                        id: '1',
                        name: '羽雀',
                        url: 'https://www.yuque.com/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/yuque.svg',
                    },
                    {
                        id: '2',
                        name: 'Covertio',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/covertio.svg',
                        url: 'https://convertio.co/'
                    },
                    {
                        id: '3',
                        name: 'TinyPNG',
                        url: 'https://tinypng.com/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/tinypng.svg',
                    },
                    {
                        id: '4',
                        name: 'Processon',
                        url: 'https://www.processon.com/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/processon.svg',
                    }
                ]
            },
            {
                groupId: '1',
                groupName: '编程',
                groupApps: [
                    {
                        id: '5',
                        name: '力扣',
                        url: 'https://leetcode.cn/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/leetcode.svg',
                    },
                    {
                        id: '6',
                        name: 'Github',
                        url: 'https://github.com/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/github.svg',
                    },
                    {
                        id: '7',
                        name: 'Stack Overflow',
                        url: 'https://stackoverflow.com/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/stackoverflow.svg',
                    },
                    {
                        id: '8',
                        name: 'Vue',
                        url: 'https://vuejs.org/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/vue.svg',
                    },
                ]
            },
            {
                groupId: '2',
                groupName: '设计',
                groupApps: [
                    {
                        icon: '9',
                        name: '即时设计',
                        url: 'https://js.design/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/js-design.svg',
                    },
                    {
                        icon: '10',
                        name: '稿定设计',
                        url: 'https://www.gaoding.com/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/gaoding.svg',
                    },
                    {
                        icon: '11',
                        name: 'Unsplash',
                        url: 'https://unsplash.com/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/unsplash.svg',
                    },
                    {
                        icon: '12',
                        name: 'Iconfont',
                        url: 'https://www.iconfont.cn/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/iconfont.svg',
                    },
                ]
            },
            {
                groupId: '3',
                groupName: '学术',
                groupApps: [
                    {
                        id: '13',
                        name: '中国知网',
                        url: 'https://www.cnki.net/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/cnki.svg',
                    },
                    {
                        id: '14',
                        name: '万方数据',
                        url: 'https://www.wanfangdata.com.cn/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/wanfangdata.svg',
                    },
                    {
                        id: '15',
                        name: '维普网',
                        url: 'https://www.cqvip.com/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/cqvip.svg',
                    },
                    {
                        id: '16',
                        name: '中国国家图书馆',
                        url: 'http://www.nlc.cn/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/nlc.svg',
                    },
                    {
                        id: '17',
                        name: '谷歌学术',
                        url: 'https://scholar.google.com/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/google-scholar.svg',
                    },
                    {
                        id: '18',
                        name: 'Nature',
                        url: 'https://www.nature.com/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/nature.svg',
                    },
                    {
                        id: '19',
                        name: 'IEEE',
                        url: 'https://www.ieee.org/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/ieee.svg',
                    },
                ]
            },
            {
                groupId: '4',
                groupName: '娱乐',
                groupApps: [
                    {
                        id: '20',
                        name: '爱奇艺',
                        url: 'https://www.iqiyi.com/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/iqiyi.svg',
                    },
                    {
                        id: '21',
                        name: '优酷',
                        url: 'https://www.youku.com/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/youku.svg',
                    },
                    {
                        id: '22',
                        name: '腾讯视频',
                        url: 'https://v.qq.com/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/tencentvideo.svg',
                    },
                    {
                        id: '23',
                        name: '哔哩哔哩',
                        url: 'https://www.bilibili.com/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/bilibili.svg',
                    },
                    {
                        id: '24',
                        name: '虎牙直播',
                        url: 'https://www.huya.com/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/huya.svg',
                    },
                    {
                        id: '25',
                        name: 'Steam',
                        url: 'https://store.steampowered.com/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/steam.svg',
                    },
                    {
                        id: '26',
                        name: 'Epic',
                        url: 'https://www.epicgames.com/',
                        icon: 'https://cdn.ifback.com/website/websiteIcon/epic.svg',
                    },
                ]
            },
        ]
    }),
})