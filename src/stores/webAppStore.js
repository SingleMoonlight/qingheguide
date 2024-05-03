import { defineStore } from 'pinia'

export const useWebAppStore = defineStore('webAppStore', {
    state: () => ({
        app: [
            {
                groupId: 0,
                groupName: '工具',
                groupApps: [
                    {
                        name: "网易邮箱",
                        url: "https://mail.163.com/",
                    },
                    {
                        name: "知乎",
                        url: "https://www.zhihu.com/",
                    },
                    {
                        name: "百度",
                        url: "https://www.baidu.com/",
                    },
                ]
            },
            {
                groupId: 1,
                groupName: '编程',
                groupApps: [
                    {
                        name: "Github",
                        url: "https://github.com/",
                    },
                    {
                        name: "Gitee",
                        url: "https://gitee.com/",
                    },
                    {
                        name: "Gitlab",
                        url: "https://gitlab.com/",
                    },
                ]
            },
            {
                groupId: 2,
                groupName: '设计',
                groupApps: [
                    {
                        name: "Sketch",
                        url: "https://sketch.com/",
                    },
                    {
                        name: "Photoshop",
                        url: "https://photoshop.com/",
                    },
                    {
                        name: "Illustrator",
                        url: "https://www.adobe.com/products/illustrator.html",
                    },
                ]
            },
            {
                groupId: 3,
                groupName: '学术',
                groupApps: [
                    {
                        name: "CSDN",
                        url: "https://blog.csdn.net/",
                    },
                    {
                        name: "掘金",
                        url: "https://juejin.im/",
                    },
                    {
                        name: "知乎",
                        url: "https://www.zhihu.com/",
                    },
                ]
            },
            {
                groupId: 4,
                groupName: '娱乐',
                groupApps: [
                    {
                        name: "爱奇艺",
                        url: "https://www.iqiyi.com/",
                    },
                    {
                        name: "腾讯视频",
                        url: "https://v.qq.com/",
                    },
                    {
                        name: "爱奇艺",
                        url: "https://www.iqiyi.com/",
                    },
                ]
            },
        ]
    }),
})