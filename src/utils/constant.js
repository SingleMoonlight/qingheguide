export const version = '3.0.0'
export const defaultBackground = 'https://cdn.ifback.com/website/qhGuide/guide_default_bg.jpg'

export const copyrightInfo = {
    ownerInfo: 'ifback.com',
    ownerUrl: 'https://ifback.com/',
    beianProvince: '豫',
    gonanBeianNum: '41152402000212号',
    gonanBeianUrl: 'http://www.beian.gov.cn/',
    icpBeianNum: '2021014629号-2',
    icpBeianUrl: 'https://beian.miit.gov.cn/',
}

export const searchHistoryNum = 10
export const searchEngineList = [
    { iconName: 'baidu', engine: 'baidu', name: '百度', url: 'https://www.baidu.com/s?ie=utf-8&wd=' },
    { iconName: 'bing', engine: 'bing',name: '必应', url: 'https://www.bing.com/search?q=' },
    { iconName: 'google', engine: 'google',name: '谷歌', url: 'https://www.google.com/search?q=' },
    { iconName: 'custom', engine: 'custom',name: '自定义', url: '' }
]

export const otherMenuList = [
    { iconName: 'setting',  name: '设置', emit: 'openSetting'},
    { iconName: 'about',  name: '关于', emit: 'openAbout'},
]

export const themeList = [
    {theme: 'default', name: '默认'},
    {theme: 'dark', name: '深色'},
    {theme: 'light', name: '浅色'},
]

export const timeFontWeight = [
    {weight: 'normal', name: '粗体'},
    {weight: 'light', name: '细体'},
]

export const searchOpenMode = [
    {mode: 'currentPage', name: '当前标签页'},
    {mode: 'newPage', name: '新标签页'},
]
