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
    label: 'ToDesk 远程',
    url: 'https://www.todesk.com',
    desc: '远程控制工具',
    icon: '🔗',
  },
  {
    label: '金蝶云社区',
    url: 'https://vip.kingdee.com',
    desc: '金蝶产品支持与社区',
    icon: '📦',
  },
]
