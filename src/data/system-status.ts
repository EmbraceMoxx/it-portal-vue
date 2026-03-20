export interface SystemStatus {
  id: string
  name: string
  desc: string
  icon: string
  status: 'online' | 'degraded' | 'offline'
  latency?: string
  lastChecked: string
}

export const systemStatusList: SystemStatus[] = [
  {
    id: 'erp',
    name: '金蝶 ERP',
    desc: '企业资源管理系统',
    icon: '📦',
    status: 'online',
    latency: '12ms',
    lastChecked: '刚刚',
  },
  {
    id: 'intranet',
    name: '内网服务',
    desc: '公司内部网络访问',
    icon: '🌐',
    status: 'online',
    latency: '3ms',
    lastChecked: '刚刚',
  },
  {
    id: 'printer-1f',
    name: '打印机 · 1F',
    desc: 'EPSON L15160 · 1号楼1楼',
    icon: '🖨️',
    status: 'online',
    lastChecked: '2分钟前',
  },
  {
    id: 'printer-2f',
    name: '打印机 · 2F',
    desc: 'EPSON L15160 · 2号楼2楼',
    icon: '🖨️',
    status: 'online',
    lastChecked: '2分钟前',
  },
  {
    id: 'printer-3f',
    name: '打印机 · 3F',
    desc: 'EPSON L15160 · 3号楼',
    icon: '🖨️',
    status: 'degraded',
    lastChecked: '5分钟前',
  },
  {
    id: 'wifi',
    name: 'Wi-Fi 网络',
    desc: '办公无线网络',
    icon: '📶',
    status: 'online',
    lastChecked: '刚刚',
  },
  {
    id: 'overseas',
    name: '海外网络节点',
    desc: '代理服务节点',
    icon: '🚀',
    status: 'online',
    latency: '68ms',
    lastChecked: '1分钟前',
  },
  {
    id: 'fileserver',
    name: '共享文件服务器',
    desc: '\\\\192.168.120.252',
    icon: '💾',
    status: 'online',
    lastChecked: '刚刚',
  },
]
