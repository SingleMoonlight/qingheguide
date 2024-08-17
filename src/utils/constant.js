export const defaultBackgroundUrl = 'https://cdn.ifback.com/website/qhGuide/guide_default_bg.jpg'
export const defaultImgPlaceHolder = 'https://cdn.ifback.com/website/websiteIcon/default.svg'

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
    { iconName: 'baidu', settingValue: 'baidu', name: '百度', url: 'https://www.baidu.com/s?ie=utf-8&wd=' },
    { iconName: 'bing', settingValue: 'bing', name: '必应', url: 'https://www.bing.com/search?q=' },
    { iconName: 'google', settingValue: 'google', name: '谷歌', url: 'https://www.google.com/search?q=' },
    { iconName: 'custom', settingValue: 'custom', name: '自定义', url: '' }
]

// 天气数据获取刷新间隔，单位分钟
export const weatherUpdateInterval = {
    nowWeather: 10,
    nowAir: 30,
    futureWeather: 60,
    futureAir: 8 * 60,
}

export const weatherLocationModeList = [
    { settingValue: 'auto', name: '自动定位' },
    { settingValue: 'custom', name: '自定义' },
]

export const otherMenuList = [
    { iconName: 'setting', name: '设置', emit: 'openSetting' },
    { iconName: 'about', name: '关于', emit: 'openAbout' },
]

export const themeList = [
    { settingValue: 'default', name: '默认' },
    { settingValue: 'dark', name: '深色' },
    { settingValue: 'light', name: '浅色' },
]

export const bgSourceList = [
    { settingValue: 'default', name: '默认' },
    { settingValue: 'custom', name: '自定义' },
]

export const timeFontWeightList = [
    { settingValue: 'normal', name: '粗体' },
    { settingValue: 'light', name: '细体' },
]

export const searchOpenModeList = [
    { settingValue: 'current', name: '当前标签页' },
    { settingValue: 'new', name: '新标签页' },
]

export const webAppOpenModeList = [
    { settingValue: 'current', name: '当前标签页' },
    { settingValue: 'new', name: '新标签页' },
]

export const flippingInterval = 500
export const flippingEffectList = [
    { settingValue: 'fade', name: '渐隐' },
    { settingValue: 'slide', name: '滑动' },
    { settingValue: 'toggle', name: '弹性' },
    { settingValue: 'windmill', name: '风车' },
]

export const webAppMenuList = [
    { iconName: 'editApp', name: '编辑App' },
    { iconName: 'deleteApp', name: '删除App' },
]

export const webAppGroupMenuList = [
    { iconName: 'addApp', name: '添加App' },
    { iconName: 'addGroup', name: '添加分组' },
    { iconName: 'editGroup', name: '编辑分组' },
    { iconName: 'deleteGroup', name: '删除分组' },
]

export const backupFileName = 'QingheGuideBackup.json'
export const backupOptionList = [
    { option: '自定义设置', name: 'setting', value: true },
    { option: '导航分组和图标', name: 'webApp', value: true },
    { option: '天气地理位置', name: 'weather', value: true },
]

// 顺序：fix opt add del
export const updateHistory = [
    {
        time: '2024-8-17',
        version: 'V3.0.2',
        item: [
            { type: 'fix', des: '修复移动端进入导航等二级页面时背景显示异常的问题' },
            { type: 'fix', des: '修复更新标签在Safari浏览器中显示异常的问题' },
            { type: 'opt', des: '移除移动端触屏点击元素时显示的默认背景' },
        ]
    },
    {
        time: '2024-6-15',
        version: 'V3.0.1',
        item: [
            { type: 'fix', des: '修复因天气图标加载过慢导致的首页长时间白屏问题' },
        ]
    },
    {
        time: '2024-5-18',
        version: 'V3.0.0',
        des: '系统全面重构',
        item: [
            { type: 'fix', des: '修复拼音输入时点击搜索建议，搜索输入框文字错误的问题' },
            { type: 'fix', des: '修复App图标拖动时显示异常的问题' },
            { type: 'opt', des: '优化UI，修改部分页面动画、样式' },
            { type: 'opt', des: '修改按键逻辑，首页按空格键自动聚焦搜索框，按Esc键取消聚焦搜索。在搜索建议或历史页面，按方向键上下切换搜索建议或历史，按Tab键切换搜索引擎' },
            { type: 'opt', des: '修改天气组件，支持自动定位和自定义地点' },
            { type: 'opt', des: '修改导航页面分组切换方式，支持点击切换和鼠标滑动切换' },
            { type: 'opt', des: '修改导航页面拖拽逻辑，支持分组拖拽，支持图标跨分组拖拽' },
            { type: 'opt', des: '取消自定义背景的文件大小限制' },
            { type: 'del', des: '移除智能推荐处理功能' },
            { type: 'del', des: '移除部分不常用的搜索引擎' },
            { type: 'del', des: '移除部分不常用的App图标' },
            { type: 'del', des: '移除Docker栏功能' },
        ]
    },
    {
        time: '2024-1-21',
        version: 'V2.1.6',
        item: [
            { type: 'fix', des: '修复图标链接打开错误的问题' },
            { type: 'fix', des: '修复新增图标再次点击编辑时，编辑页面确定按钮点击不生效的问题' },
            { type: 'opt', des: '优化Esc按键逻辑，在导航页面进入编辑图标或分组二级页面时，点击Esc回到主页面自动关闭二级页面' },
            { type: 'opt', des: '优化自定义图标逻辑，当获取图标成功或者失败，均可以自定义图标链接，并进行预览' },
        ]
    },
    {
        time: '2023-10-29',
        version: 'V2.1.5',
        item: [
            { type: 'fix', des: '修复翻译搜索建议错误跟随搜索建议的问题' },
        ]
    },
    {
        time: '2023-5-14',
        version: 'V2.1.4',
        item: [
            { type: 'fix', des: '修复天气组件打开后回到搜索页面或者前往设置、关于界面不会自动关闭的问题' },
        ]
    },
    {
        time: '2023-5-3',
        version: 'V2.1.3',
        item: [
            { type: 'fix', des: '修复添加图标后立即固定到Docker栏失败的问题' },
        ]
    },
    {
        time: '2023-4-22',
        version: 'V2.1.2',
        item: [
            { type: 'fix', des: '修复图标删除按钮交互显示错误的问题' },
            { type: 'fix', des: '修复浅色模式下设置描述字体颜色错误的问题' },
            { type: 'opt', des: '优化Esc按键逻辑，在移动图标阶段，按Esc键退出图标移动阶段' },
        ]
    },
    {
        time: '2023-4-12',
        version: 'V2.1.1',
        item: [
            { type: 'fix', des: '修复背景遮罩在部分比例下显示不全的问题' },
            { type: 'add', des: '增加Docker栏自动隐藏设置项，一段时间没有操作后将自动隐藏Docker栏' },
        ]
    },
    {
        time: '2023-4-8',
        version: 'V2.1.0',
        item: [
            { type: 'fix', des: '修复导航页空分组添加图标没有反应的问题' },
            { type: 'fix', des: '修复切换为全屏时，背景遮罩显示不全的问题' },
            { type: 'fix', des: '修改部分异常文案' },
            { type: 'opt', des: '优化设置项分组逻辑以及顺序，使其更符合逻辑' },
            { type: 'opt', des: '优化设置页面和关于页面弹出的动画效果' },
            { type: 'add', des: '导航页底部增加Docker栏，可以将常用图标固定至Docker栏，便于快速打开' },
            { type: 'add', des: '增加按键控制，首页按下空格进入搜索，任意页面按下Esc按键退回上一级页面' },
            { type: 'del', des: '移除导航页首页的默认分组' },
        ]
    },
    {
        time: '2023-4-2',
        version: 'V2.0.2',
        item: [
            { type: 'fix', des: '修复部分默认图标显示异常的问题' },
            { type: 'opt', des: '优化文字选中背景颜色，避免文字选中色彩不协调' },
            { type: 'add', des: '增加记住导航页设置项' },
        ]
    },
    {
        time: '2023-2-19',
        version: 'V2.0.1',
        item: [
            { type: 'fix', des: '修复开启自动聚焦时导致的首次加载或刷新时的闪屏问题' },
            { type: 'opt', des: '开启服务端资源压缩，提升加载速度' },
        ]
    },
    {
        time: '2023-2-18',
        version: 'V2.0.0',
        des: '重构代码以提升性能',
        item: [
            { type: 'fix', des: '修复若干已知问题' },
            { type: 'opt', des: '优化UI，包括排版、样式、动画等，使整体风格更简约美观' },
            { type: 'add', des: '增加部分设置项' },
            { type: 'del', des: '移除PC端通过键盘左右按键切换导航页面的方式' },
        ]
    },
    {
        time: '2022-11-20',
        version: 'V1.4.1',
        item: [
            { type: 'fix', des: '修复新增分组时处理错误问题' },
            { type: 'fix', des: '修复导航页面切换时，首尾页之间动画过渡不自然的问题' },
            { type: 'opt', des: '优化指示效果' },
            { type: 'add', des: '增加图标拖动功能，可以通过鼠标或手指移动图标到指定位置，同时自动填充、对齐' },
            { type: 'add', des: '新增导航页面切换效果，包括翻转、风车' },
        ]
    },
    {
        time: '2022-11-19',
        version: 'V1.4.0',
        item: [
            { type: 'opt', des: '优化UI' },
            { type: 'add', des: '增加右键菜单，可对导航页分组和网站图标进行设置' },
        ]
    },
    {
        time: '2022-09-24',
        version: 'V1.3.3',
        item: [
            { type: 'fix', des: '修复导航页右键菜单显示异常的问题' },
        ]
    },
    {
        time: '2022-09-18',
        version: 'V1.3.2',
        item: [
            { type: 'fix', des: '修复设置菜单显示异常的问题' },
            { type: 'opt', des: '优化UI' },
        ]
    },
    {
        time: '2022-08-14',
        version: 'V1.3.1',
        item: [
            { type: 'add', des: '增加版本更新检查功能，版本更新时自动同步设置' },
        ]
    },
    {
        time: '2022-08-13',
        version: 'V1.3.0',
        item: [
            { type: 'opt', des: '优化导航图标名称显示，鼠标悬停可显示全称' },
            { type: 'opt', des: '优化设置，修改设置后能够即时生效' },
            { type: 'add', des: '增加部分自定义设置' },
        ]
    },
    {
        time: '2022-07-12',
        version: 'V1.2.3',
        item: [
            { type: 'add', des: '增加部分自定义设置' },
            { type: 'add', des: '增加导航页面的切换效果，包括经典、弹性、渐隐' },
        ]
    },
    {
        time: '2022-07-09',
        version: 'V1.2.2',
        item: [
            { type: 'fix', des: '修复首次加载时，获取不到导航网站图标的问题' },
            { type: 'opt', des: '优化UI' },
            { type: 'add', des: '导航页面增加循环滑动功能' },
            { type: 'add', des: 'PC端增加通过键盘左右按键切换导航页面的方式' },
        ]
    },
    {
        time: '2022-07-07',
        version: 'V1.2.1',
        item: [
            { type: 'fix', des: '修复安卓端通过屏幕滑动切换导航页面失效的问题' },
            { type: 'opt', des: '优化内置导航网站图标' },
            { type: 'del', des: '移除PC端通过鼠标滚轮滑动切换导航页面的方式' },
        ]
    },
    {
        time: '2022-07-06',
        version: 'V1.2.0',
        item: [
            { type: 'fix', des: '修复iOS端无法选择本地文件的问题' },
            { type: 'fix', des: '修复iOS端时间在隐藏和显示状态切换时，动画过渡不自然的问题' },
            { type: 'fix', des: '修复移动端点击导航条切换导航页面时，导航页分类名称不会消失的问题' },
            { type: 'opt', des: '优化导航页面的切换方式，PC端新增鼠标滚轮滑动和鼠标点击拖动方式，移动端新增屏幕滑动方式' },
            { type: 'add', des: '增加导航功能，内置几种常用类型的网站' },
        ]
    },
    {
        time: '2022-07-05',
        version: 'V1.1.9',
        item: [
            { type: 'opt', des: '优化不同主题的字体颜色' },
            { type: 'opt', des: '优化不同界面间的的切换效果' },
        ]
    },
    {
        time: '2022-07-04',
        version: 'V1.1.8',
        item: [
            { type: 'fix', des: '修复首次加载页面、刷新页面以及跳转至本页面时画面白屏的问题' },
            { type: 'opt', des: '优化UI' },
        ]
    },
    {
        time: '2022-07-03',
        version: 'V1.1.7',
        item: [
            { type: 'opt', des: '优化UI' },
            { type: 'opt', des: '修改天气数据源，天气数据来自和风天气' },
        ]
    },
    {
        time: '2022-07-02',
        version: 'V1.1.6',
        item: [
            { type: 'opt', des: '优化UI' },
            { type: 'add', des: '增加关于页面，包括网站介绍、更新时间线以及更新内容' },
        ]
    },
    {
        time: '2022-07-01',
        version: 'V1.1.5',
        item: [
            { type: 'opt', des: '优化UI' },
            { type: 'add', des: '增加设置备份和导入备份功能' },
        ]
    },
    {
        time: '2022-06-30',
        version: 'V1.1.4',
        item: [
            { type: 'add', des: '增加搜索历史功能' },
        ]
    },
    {
        time: '2022-06-21',
        version: 'V1.1.3',
        item: [
            { type: 'add', des: '增加天气显示功能' },
            { type: 'add', des: '增加智能推荐处理功能，包括翻译、IP地址查询、颜色展示、公式计算' },
        ]
    },
    {
        time: '2022-06-20',
        version: 'V1.1.2',
        item: [
            { type: 'add', des: '增加部分自定义设置' },
            { type: 'add', des: '增加时间、日期显示功能' },
        ]
    },
    {
        time: '2022-06-19',
        version: 'V1.1.1',
        item: [
            { type: 'opt', des: '优化UI' },
            { type: 'add', des: '增加部分自定义设置' },
            { type: 'add', des: '增加主题功能，包括默认（毛玻璃）、浅色以及深色主题' },
            { type: 'add', des: '增加弹出对话框，在部分场景下提供提示' },
        ]
    },
    {
        time: '2022-06-15',
        version: 'V1.1.0',
        item: [
            { type: 'opt', des: '提高默认背景加载速度' },
            { type: 'opt', des: '优化系统架构' }
        ]
    },
    {
        time: '2022-01-27',
        version: 'V1.0.0',
        des: '青何导航正式上线',
    }
]
