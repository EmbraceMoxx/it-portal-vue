export type AssetStatus = 'in-use' | 'idle' | 'repair' | 'retired'
export type AssetType = 'desktop' | 'laptop' | 'monitor' | 'printer' | 'network' | 'other'

export interface AssetItem {
  id: string
  name: string
  type: AssetType
  brand: string
  model: string
  sn: string
  location: string
  assignedTo?: string
  department?: string
  purchaseYear: number
  status: AssetStatus
  ip?: string
  notes?: string
}

export const assetList: AssetItem[] = [
  { id: 'A001', name: '台式机 #1', type: 'desktop', brand: 'Dell', model: 'OptiPlex 7090', sn: 'DL7090-001', location: '1号楼 2F', assignedTo: '张三', department: '财务部', purchaseYear: 2022, status: 'in-use', ip: '192.168.1.101' },
  { id: 'A002', name: '台式机 #2', type: 'desktop', brand: 'Dell', model: 'OptiPlex 7090', sn: 'DL7090-002', location: '1号楼 2F', assignedTo: '李四', department: '采购部', purchaseYear: 2022, status: 'in-use', ip: '192.168.1.102' },
  { id: 'A003', name: '台式机 #3', type: 'desktop', brand: 'Lenovo', model: 'ThinkCentre M720', sn: 'LV720-003', location: '2号楼 1F', assignedTo: '王五', department: '销售部', purchaseYear: 2021, status: 'in-use', ip: '192.168.1.103' },
  { id: 'A004', name: '笔记本 #1', type: 'laptop', brand: 'Lenovo', model: 'ThinkPad E14', sn: 'LVE14-004', location: '1号楼 3F', assignedTo: '赵六', department: '管理层', purchaseYear: 2023, status: 'in-use', ip: '192.168.1.104' },
  { id: 'A005', name: '笔记本 #2', type: 'laptop', brand: 'HP', model: 'EliteBook 840', sn: 'HP840-005', location: '3号楼 1F', assignedTo: '陈七', department: '运营部', purchaseYear: 2022, status: 'in-use', ip: '192.168.1.105' },
  { id: 'A006', name: '台式机 #4', type: 'desktop', brand: 'Dell', model: 'OptiPlex 5090', sn: 'DL5090-006', location: 'IT 机房', purchaseYear: 2021, status: 'idle', notes: '备用机，可调配' },
  { id: 'A007', name: '台式机 #5', type: 'desktop', brand: 'Lenovo', model: 'ThinkCentre M720', sn: 'LV720-007', location: '维修中', purchaseYear: 2020, status: 'repair', notes: '主板故障，送修中' },
  { id: 'A008', name: '显示器 #1', type: 'monitor', brand: 'Dell', model: 'P2422H', sn: 'DLP2422-001', location: '1号楼 2F', assignedTo: '张三', department: '财务部', purchaseYear: 2022, status: 'in-use' },
  { id: 'A009', name: '显示器 #2', type: 'monitor', brand: 'Dell', model: 'P2422H', sn: 'DLP2422-002', location: '1号楼 2F', assignedTo: '李四', department: '采购部', purchaseYear: 2022, status: 'in-use' },
  { id: 'A010', name: '显示器 #3', type: 'monitor', brand: 'LG', model: '27UK850', sn: 'LG27UK-003', location: '1号楼 3F', assignedTo: '赵六', department: '管理层', purchaseYear: 2023, status: 'in-use' },
  { id: 'A011', name: '打印机 · 1F', type: 'printer', brand: 'EPSON', model: 'L15160', sn: 'EP15160-1F', location: '1号楼 1F', department: '公用', purchaseYear: 2023, status: 'in-use', ip: '192.168.120.10' },
  { id: 'A012', name: '打印机 · 2F', type: 'printer', brand: 'EPSON', model: 'L15160', sn: 'EP15160-2F', location: '2号楼 2F', department: '公用', purchaseYear: 2023, status: 'in-use', ip: '192.168.120.11' },
  { id: 'A013', name: '打印机 · 3F', type: 'printer', brand: 'EPSON', model: 'L15160', sn: 'EP15160-3F', location: '3号楼', department: '公用', purchaseYear: 2023, status: 'repair', ip: '192.168.120.12', notes: '响应超时，已重启处理中' },
  { id: 'A014', name: '核心交换机', type: 'network', brand: 'H3C', model: 'S5560-54C-EI', sn: 'H3CS5560-001', location: 'IT 机房', department: 'IT', purchaseYear: 2021, status: 'in-use', ip: '192.168.1.1' },
  { id: 'A015', name: '无线 AP · 1F', type: 'network', brand: 'TP-Link', model: 'EAP670', sn: 'TLEAP-1F', location: '1号楼 1F', department: 'IT', purchaseYear: 2022, status: 'in-use' },
  { id: 'A016', name: '无线 AP · 2F', type: 'network', brand: 'TP-Link', model: 'EAP670', sn: 'TLEAP-2F', location: '1号楼 2F', department: 'IT', purchaseYear: 2022, status: 'in-use' },
  { id: 'A017', name: '旧台式机 #1', type: 'desktop', brand: 'Dell', model: 'OptiPlex 3060', sn: 'DL3060-OLD', location: 'IT 仓库', purchaseYear: 2018, status: 'retired', notes: '已淘汰，待报废处理' },
]
