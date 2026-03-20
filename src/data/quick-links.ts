export interface QuickLink {
  label: string
  url: string
  desc: string
  icon: string
}

export const quickLinks: QuickLink[] = [
  {
    label: '网速测试',
    url: 'https://www.speedtest.cn',
    desc: '测试当前网络速度',
    icon: '⚡',
  },
  {
    label: '火绒安全',
    url: 'https://www.huorong.cn',
    desc: '轻量杀毒安全软件',
    icon: '🛡️',
  },
  {
    label: '向日葵远程',
    url: 'https://sunlogin.oray.com',
    desc: '远程控制与协助',
    icon: '🖥️',
  },
  {
    label: 'PDF 转换',
    url: 'https://smallpdf.com/cn',
    desc: 'PDF 在线处理工具',
    icon: '📄',
  },
  {
    label: '微软官网',
    url: 'https://www.microsoft.com/zh-cn',
    desc: 'Office、系统激活等',
    icon: '🪟',
  },
  {
    label: '金蝶官网',
    url: 'https://www.kingdee.com',
    desc: '金蝶 ERP 官方支持',
    icon: '📦',
  },
]
