export interface PortalModule {
  key: string
  title: string
  icon: string
  tag: string
  desc: string
  meta: string
  to: string
}

export const modules: PortalModule[] = [
  {
    key: 'printer',
    title: '打印机安装中心',
    icon: '🖨️',
    tag: '常用',
    desc: '查看常用打印机安装入口和操作说明。',
    meta: '办公打印机、标签打印机、驱动安装',
    to: '/printer',
  },
  {
    key: 'erp',
    title: 'ERP 入口',
    icon: '📦',
    tag: '系统',
    desc: '查看 ERP 系统入口、登录说明和使用提示。',
    meta: '系统地址、登录步骤、常见说明',
    to: '/erp',
  },
  {
    key: 'network',
    title: '办公网络',
    icon: '🌐',
    tag: '网络',
    desc: '查看有线网络和无线网络的接入方式与使用说明。',
    meta: '有线网络、无线网络、办公接入',
    to: '/network',
  },
  {
    key: 'overseas-network',
    title: '海外网络',
    icon: '🚀',
    tag: '网络',
    desc: '查看海外网络的客户端使用、系统代理和路由模式说明。',
    meta: '海外节点、代理客户端、系统代理',
    to: '/overseas-network',
  },
  {
    key: 'software',
    title: '常用软件安装',
    icon: '💽',
    tag: '软件',
    desc: '查找常用软件安装地址和使用说明。',
    meta: '办公软件、浏览器、工具软件',
    to: '/software',
  },
]