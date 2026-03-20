export interface SoftwareItem {
  id: string
  name: string
  desc: string
  icon: string
  category: string
  version?: string
  size?: string
  source: 'intranet' | 'internet'
  url: string
  recommended?: boolean
}

export const softwareCategories = ['全部', '办公软件', '安全工具', '远程协助', '开发工具', '浏览器']

export const softwareList: SoftwareItem[] = [
  {
    id: 'wps',
    name: 'WPS Office',
    desc: '文档、表格、演示一体化办公套件',
    icon: '📝',
    category: '办公软件',
    version: '2024',
    size: '210MB',
    source: 'internet',
    url: 'https://www.wps.cn',
    recommended: true,
  },
  {
    id: 'huorong',
    name: '火绒安全',
    desc: '轻量级杀毒软件，已预装，可在此更新',
    icon: '🛡️',
    category: '安全工具',
    version: '6.0',
    size: '85MB',
    source: 'internet',
    url: 'https://www.huorong.cn',
    recommended: true,
  },
  {
    id: 'sunlogin',
    name: '向日葵远程',
    desc: '远程控制与协助工具',
    icon: '🌻',
    category: '远程协助',
    version: '15.0',
    size: '62MB',
    source: 'internet',
    url: 'https://sunlogin.oray.com',
  },
  {
    id: 'todesk',
    name: 'ToDesk',
    desc: '流畅稳定的远程控制工具',
    icon: '🔗',
    category: '远程协助',
    version: '4.7',
    size: '58MB',
    source: 'internet',
    url: 'https://www.todesk.com',
  },
  {
    id: 'chrome',
    name: 'Google Chrome',
    desc: '高性能浏览器，推荐日常使用',
    icon: '🌐',
    category: '浏览器',
    version: '124',
    size: '95MB',
    source: 'internet',
    url: 'https://www.google.cn/chrome/',
    recommended: true,
  },
  {
    id: 'edge',
    name: 'Microsoft Edge',
    desc: '系统内置浏览器，兼容性好',
    icon: '🔷',
    category: '浏览器',
    version: '124',
    size: '内置',
    source: 'internet',
    url: 'https://www.microsoft.com/edge',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    desc: '轻量代码编辑器，IT 运维常用',
    icon: '💻',
    category: '开发工具',
    version: '1.89',
    size: '92MB',
    source: 'internet',
    url: 'https://code.visualstudio.com',
  },
  {
    id: 'notepad',
    name: 'Notepad++',
    desc: '轻量文本编辑器，查看日志配置文件',
    icon: '📄',
    category: '开发工具',
    version: '8.6',
    size: '4MB',
    source: 'internet',
    url: 'https://notepad-plus-plus.org',
  },
  {
    id: 'pdf-reader',
    name: 'Adobe Acrobat Reader',
    desc: 'PDF 阅读与基础编辑',
    icon: '📕',
    category: '办公软件',
    version: '2024',
    size: '320MB',
    source: 'internet',
    url: 'https://get.adobe.com/reader/',
  },
  {
    id: '7zip',
    name: '7-Zip',
    desc: '免费开源压缩解压工具',
    icon: '🗜️',
    category: '办公软件',
    version: '24.05',
    size: '2MB',
    source: 'internet',
    url: 'https://www.7-zip.org',
    recommended: true,
  },
]
