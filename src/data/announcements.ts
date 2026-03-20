export interface Announcement {
  id: number
  title: string
  date: string
  tag: string
  tagColor: 'blue' | 'orange' | 'green'
}

export const announcements: Announcement[] = [
  {
    id: 1,
    title: '语雀 IT 知识库已上线，常见问题可直接查阅',
    date: '2026-03-20',
    tag: '新上线',
    tagColor: 'green',
  },
  {
    id: 2,
    title: '本周五 22:00 - 24:00 核心交换机维护，届时内网短暂中断',
    date: '2026-03-18',
    tag: '维护通知',
    tagColor: 'orange',
  },
  {
    id: 3,
    title: '2栋2F 新增 EPSON L15160 打印机，已可正常使用',
    date: '2026-03-10',
    tag: '设备更新',
    tagColor: 'blue',
  },
]
