export interface NetworkNode {
  id: string
  label: string
  type: 'core' | 'switch' | 'ap' | 'server' | 'overseas' | 'firewall' | 'printer'
  status: 'online' | 'degraded' | 'offline'
  ip?: string
  desc?: string
  floor?: string
  latency?: string
  children?: string[]  // child node ids
}

export const networkNodes: NetworkNode[] = [
  {
    id: 'internet',
    label: '互联网',
    type: 'core',
    status: 'online',
    desc: '运营商宽带接入',
  },
  {
    id: 'firewall',
    label: '防火墙',
    type: 'firewall',
    status: 'online',
    ip: '192.168.1.1',
    desc: '边界防火墙，NAT 出口',
    children: ['core-switch'],
  },
  {
    id: 'core-switch',
    label: '核心交换机',
    type: 'switch',
    status: 'online',
    ip: '192.168.120.1',
    desc: '三层核心交换，VLAN 汇聚',
    children: ['file-server', 'erp-server', 'switch-1f', 'switch-2f', 'switch-3f', 'overseas-node'],
  },
  {
    id: 'file-server',
    label: '文件服务器',
    type: 'server',
    status: 'online',
    ip: '192.168.120.252',
    desc: '共享盘 \\\\192.168.120.252',
  },
  {
    id: 'erp-server',
    label: 'ERP 服务器',
    type: 'server',
    status: 'online',
    ip: '192.168.120.100',
    desc: '金蝶 ERP 应用服务器',
    latency: '12ms',
  },
  {
    id: 'switch-1f',
    label: '1楼接入交换机',
    type: 'switch',
    status: 'online',
    ip: '192.168.120.11',
    floor: '1F',
    desc: '1号楼1楼，24口千兆',
    children: ['ap-1f', 'printer-1f'],
  },
  {
    id: 'switch-2f',
    label: '2楼接入交换机',
    type: 'switch',
    status: 'online',
    ip: '192.168.120.12',
    floor: '2F',
    desc: '2号楼2楼，24口千兆',
    children: ['ap-2f', 'printer-2f'],
  },
  {
    id: 'switch-3f',
    label: '3楼接入交换机',
    type: 'switch',
    status: 'degraded',
    ip: '192.168.120.13',
    floor: '3F',
    desc: '3号楼，部分端口异常',
    children: ['ap-3f', 'printer-3f'],
  },
  {
    id: 'ap-1f',
    label: 'AP · 1F',
    type: 'ap',
    status: 'online',
    ip: '192.168.120.21',
    floor: '1F',
    desc: 'Wi-Fi 6 无线接入点',
  },
  {
    id: 'ap-2f',
    label: 'AP · 2F',
    type: 'ap',
    status: 'online',
    ip: '192.168.120.22',
    floor: '2F',
    desc: 'Wi-Fi 6 无线接入点',
  },
  {
    id: 'ap-3f',
    label: 'AP · 3F',
    type: 'ap',
    status: 'online',
    ip: '192.168.120.23',
    floor: '3F',
    desc: 'Wi-Fi 6 无线接入点',
  },
  {
    id: 'printer-1f',
    label: '打印机 · 1F',
    type: 'printer',
    status: 'online',
    ip: '192.168.120.31',
    floor: '1F',
    desc: 'EPSON L15160',
  },
  {
    id: 'printer-2f',
    label: '打印机 · 2F',
    type: 'printer',
    status: 'online',
    ip: '192.168.120.32',
    floor: '2F',
    desc: 'EPSON L15160',
  },
  {
    id: 'printer-3f',
    label: '打印机 · 3F',
    type: 'printer',
    status: 'degraded',
    ip: '192.168.120.33',
    floor: '3F',
    desc: 'EPSON L15160，响应超时',
  },
  {
    id: 'overseas-node',
    label: '海外节点',
    type: 'overseas',
    status: 'online',
    desc: '代理服务节点，延迟 68ms',
    latency: '68ms',
  },
]

export const nodeTypeConfig: Record<string, { color: string; bg: string; icon: string }> = {
  core:     { color: '#1e40af', bg: '#dbeafe', icon: '🌐' },
  firewall: { color: '#b91c1c', bg: '#fee2e2', icon: '🔥' },
  switch:   { color: '#0f766e', bg: '#ccfbf1', icon: '🔀' },
  ap:       { color: '#7c3aed', bg: '#ede9fe', icon: '📶' },
  server:   { color: '#b45309', bg: '#fef3c7', icon: '🖥️' },
  overseas: { color: '#0369a1', bg: '#e0f2fe', icon: '🚀' },
  printer:  { color: '#475569', bg: '#f1f5f9', icon: '🖨️' },
}
