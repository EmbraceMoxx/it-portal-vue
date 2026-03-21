export type ProjectPhase = '调研' | '方案' | '实施' | '上线' | '完成' | '暂停'
export type ProjectStatus = 'normal' | 'warning' | 'blocked' | 'done'

export interface Project {
  id: string
  name: string
  phase: ProjectPhase
  status: ProjectStatus
  progress: number
  owner: string
  category: string
  thisWeek: string[]
  nextWeek: string[]
  risk?: string
  startDate: string
  updatedAt: string
  desc?: string
}

export const REPORT_WEEK = '2026-03-21'

export const projects: Project[] = [
  {
    id: 'factory-digital',
    name: '调研工厂数字化',
    phase: '调研',
    status: 'normal',
    progress: 20,
    owner: '黎灿',
    category: '数字化转型',
    desc: '调研工厂生产、仓储、质检等环节的数字化现状与需求，输出数字化建设方案。',
    thisWeek: ['完成工厂现场调研走访', '收集各部门痛点清单'],
    nextWeek: ['整理调研报告初稿', '与工厂负责人对齐需求优先级'],
    risk: '工厂部门配合度待提升，需管理层协调',
    startDate: '2026-03-10',
    updatedAt: '2026-03-21',
  },
  {
    id: 'cross-border-erp',
    name: '调研跨境ERP系统',
    phase: '调研',
    status: 'normal',
    progress: 35,
    owner: '黎灿',
    category: '系统选型',
    desc: '调研适合跨境业务的ERP系统，对比主流供应商，输出选型建议报告。',
    thisWeek: ['完成旺店通、马帮、聚水潭初步调研', '收集业务部门核心需求'],
    nextWeek: ['安排2家供应商产品演示', '输出需求对比矩阵'],
    startDate: '2026-03-01',
    updatedAt: '2026-03-21',
  },
  {
    id: 'tax-system',
    name: '调研税账系统',
    phase: '调研',
    status: 'warning',
    progress: 15,
    owner: '曹杰珲',
    category: '财税合规',
    desc: '调研税务申报、账务处理一体化系统，满足多主体、多税种管理需求。',
    thisWeek: ['与财务部初步沟通需求', '收集现有税务处理流程'],
    nextWeek: ['调研畅捷通、金蝶云星空税务模块'],
    risk: '财务部需求尚未明确，等待财务总监确认范围',
    startDate: '2026-03-15',
    updatedAt: '2026-03-21',
  },
  {
    id: 'finance-shared',
    name: '调研财务共享中心',
    phase: '调研',
    status: 'normal',
    progress: 10,
    owner: '王文林',
    category: '财税合规',
    desc: '调研财务共享中心建设方案，实现多主体财务集中处理、标准化管控。',
    thisWeek: ['收集各子公司财务现状', '了解行业财务共享最佳实践'],
    nextWeek: ['与财务部讨论共享中心建设目标', '调研用友、金蝶相关产品'],
    startDate: '2026-03-18',
    updatedAt: '2026-03-21',
  },
  {
    id: 'travel-expense',
    name: '调研差旅报销系统',
    phase: '调研',
    status: 'normal',
    progress: 25,
    owner: '曹杰珲',
    category: '费控管理',
    desc: '调研差旅报销自动化系统，覆盖申请、审批、报销、对账全流程。',
    thisWeek: ['调研易快报、分贝通、钉钉费控', '整理各系统功能对比'],
    nextWeek: ['安排易快报产品演示', '与行政部确认报销流程规范'],
    startDate: '2026-03-08',
    updatedAt: '2026-03-21',
  },
  {
    id: 'expense-mgmt',
    name: '费用管理系统',
    phase: '方案',
    status: 'warning',
    progress: 45,
    owner: '黎灿',
    category: '费控管理',
    desc: '建立统一的费用预算、申请、审批、报销管控体系，与财务系统对接。',
    thisWeek: ['完成系统选型报告', '提交管理层审批'],
    nextWeek: ['等待管理层决策', '准备实施方案草稿'],
    risk: '管理层审批中，预计下周有结论',
    startDate: '2026-02-01',
    updatedAt: '2026-03-21',
  },
  {
    id: 'bank-enterprise',
    name: '银企直连',
    phase: '实施',
    status: 'normal',
    progress: 65,
    owner: '王文林',
    category: '财税合规',
    desc: '打通银行与ERP系统的数据通道，实现付款指令自动下发、回单自动入账。',
    thisWeek: ['完成工商银行接口联调', '测试付款指令下发功能'],
    nextWeek: ['完成招商银行接口对接', '开展UAT测试'],
    startDate: '2026-01-15',
    updatedAt: '2026-03-21',
  },
  {
    id: 'biz-process',
    name: '梳理业务流程规范',
    phase: '实施',
    status: 'normal',
    progress: 50,
    owner: '黎灿',
    category: '流程管理',
    desc: '梳理公司核心业务流程，建立标准化操作规范文档，为系统化奠定基础。',
    thisWeek: ['完成采购流程规范初稿', '完成销售流程规范初稿'],
    nextWeek: ['组织各部门评审采购流程', '启动仓储流程梳理'],
    startDate: '2026-02-10',
    updatedAt: '2026-03-21',
  },
]

export interface WeeklySnapshot {
  week: string
  summary: string
  highlights: string[]
}

export const weeklyArchive: WeeklySnapshot[] = [
  {
    week: '2026-03-14',
    summary: '本周重点推进银企直连联调，费用管理系统完成选型，新启动工厂数字化调研。',
    highlights: [
      '银企直连：完成工商银行沙箱环境搭建',
      '费用管理系统：完成3家供应商评估，确定易快报为首选',
      '工厂数字化：完成项目立项，启动现场调研',
    ],
  },
]
