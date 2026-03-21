export type DeviceType = 'laptop' | 'desktop' | 'monitor' | 'keyboard' | 'mouse' | 'headset' | 'webcam' | 'dock' | 'other'
export type RequestStatus = 'pending' | 'approved' | 'processing' | 'done' | 'rejected'
export type RequestUrgency = 'urgent' | 'normal' | 'low'

export interface DeviceRequestRecord {
  id: string
  deviceType: DeviceType
  deviceLabel: string
  applicant: string
  department: string
  purpose: string
  urgency: RequestUrgency
  status: RequestStatus
  submittedAt: string
  updatedAt: string
  note?: string
}

export const deviceTypeOptions: { value: DeviceType; label: string; icon: string }[] = [
  { value: 'laptop',   label: '笔记本电脑', icon: '💻' },
  { value: 'desktop',  label: '台式电脑',   icon: '🖥️' },
  { value: 'monitor',  label: '显示器',     icon: '🖥️' },
  { value: 'keyboard', label: '键盘',       icon: '⌨️' },
  { value: 'mouse',    label: '鼠标',       icon: '🖱️' },
  { value: 'headset',  label: '耳机/耳麦',  icon: '🎧' },
  { value: 'webcam',   label: '摄像头',     icon: '📷' },
  { value: 'dock',     label: '扩展坞',     icon: '🔌' },
  { value: 'other',    label: '其他',       icon: '📦' },
]

export const urgencyOptions = [
  { value: 'urgent', label: '紧急', desc: '影响正常工作，需 1 个工作日内处理' },
  { value: 'normal', label: '普通', desc: '3-5 个工作日内处理' },
  { value: 'low',    label: '不急', desc: '按库存情况安排' },
]

// 历史申请记录（示例数据）
export const requestHistory: DeviceRequestRecord[] = [
  {
    id: 'REQ-2026-008',
    deviceType: 'monitor',
    deviceLabel: '显示器',
    applicant: '张三',
    department: '财务部',
    purpose: '双屏办公，提升工作效率',
    urgency: 'normal',
    status: 'processing',
    submittedAt: '2026-03-20',
    updatedAt: '2026-03-21',
    note: 'IT 已确认库存，预计本周内分配',
  },
  {
    id: 'REQ-2026-007',
    deviceType: 'laptop',
    deviceLabel: '笔记本电脑',
    applicant: '李四',
    department: '销售部',
    purpose: '新员工入职配机',
    urgency: 'urgent',
    status: 'done',
    submittedAt: '2026-03-15',
    updatedAt: '2026-03-16',
    note: '已分配 ThinkPad E14，资产编号 SWS-NB-024',
  },
  {
    id: 'REQ-2026-006',
    deviceType: 'keyboard',
    deviceLabel: '键盘',
    applicant: '王五',
    department: '技术部',
    purpose: '原键盘按键失灵',
    urgency: 'normal',
    status: 'done',
    submittedAt: '2026-03-10',
    updatedAt: '2026-03-12',
  },
]
