export interface Announcement {
  id: number
  title: string
  date: string
  tag: string
  tagColor: 'blue' | 'orange' | 'green' | 'red'
  pinned?: boolean
  content?: string   // 详情正文
  category: 'maintain' | 'update' | 'notice' | 'alert'
}

export const announcements: Announcement[] = [
  {
    id: 1,
    title: '语雀 IT 知识库已上线，常见问题可直接查阅',
    date: '2026-03-20',
    tag: '新上线',
    tagColor: 'green',
    category: 'update',
    pinned: true,
    content: '语雀 IT 知识库正式上线，涵盖网络接入、打印机安装、账号申请、软件安装等常见问题的详细操作说明。员工可通过 IT 服务门户首页"IT 知识库"入口直接访问，也可通过搜索功能快速定位所需内容。如有文档缺失或内容有误，请通过企业微信联系 IT 反馈。',
  },
  {
    id: 2,
    title: '本周五 22:00 - 24:00 核心交换机维护，届时内网短暂中断',
    date: '2026-03-18',
    tag: '维护通知',
    tagColor: 'orange',
    category: 'maintain',
    pinned: true,
    content: '计划于本周五（2026-03-20）22:00 至 24:00 对核心交换机进行例行维护升级，维护期间内网将短暂中断约 15 分钟。请提前保存工作文件，避免在维护时间段内进行重要操作。ERP 系统、文件服务器等内网服务将同步不可用。如有紧急需求请提前联系 IT。',
  },
  {
    id: 3,
    title: '2栋2F 新增 EPSON L15160 打印机，已可正常使用',
    date: '2026-03-10',
    tag: '设备更新',
    tagColor: 'blue',
    category: 'update',
    content: '2号楼2楼新增一台 EPSON L15160 彩色打印机，IP 地址 192.168.120.32，已完成网络配置。员工可通过 IT 服务门户"打印机安装"页面按步骤安装驱动。如安装过程中遇到问题，请通过企业微信联系 IT。',
  },
  {
    id: 4,
    title: '3楼打印机响应超时，IT 正在处理中',
    date: '2026-03-21',
    tag: '故障告警',
    tagColor: 'red',
    category: 'alert',
    pinned: false,
    content: '3号楼打印机（IP: 192.168.120.33）出现响应超时，打印任务可能失败。IT 已介入排查，预计今日内恢复。临时方案：请使用 1楼或 2楼打印机。如有紧急打印需求请联系 IT 协助。',
  },
  {
    id: 5,
    title: '软件下载中心上线，内网软件统一从门户下载',
    date: '2026-03-05',
    tag: '新功能',
    tagColor: 'green',
    category: 'update',
    content: 'IT 服务门户新增"软件下载中心"，整合了公司常用软件的内网下载地址，包括 Office、Chrome、微信、企业微信、金蝶客户端等。请统一从门户下载，避免从外网下载带来的安全风险。',
  },
  {
    id: 6,
    title: '提醒：离开工位请锁屏，保护数据安全',
    date: '2026-02-28',
    tag: '安全提醒',
    tagColor: 'orange',
    category: 'notice',
    content: '近期发现部分员工离开工位时未锁屏，存在数据安全隐患。请养成离开工位即锁屏的习惯（快捷键：Win+L）。公司电脑已设置 5 分钟无操作自动锁屏，请勿修改此设置。',
  },
]
