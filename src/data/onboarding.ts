export interface OnboardingItem {
  step: number
  title: string
  desc: string
  icon: string
}

export const onboardingItems: OnboardingItem[] = [
  {
    step: 1,
    title: '领取设备',
    desc: '向 IT 领取电脑，确认设备型号和配件齐全。',
    icon: '💻',
  },
  {
    step: 2,
    title: '设置 Windows 账号',
    desc: '首次开机设置登录账号和密码，建议使用强密码并妥善保管。',
    icon: '🔑',
  },
  {
    step: 3,
    title: '接入办公网络',
    desc: '连接有线网络或对应楼层 Wi-Fi，确认可正常访问内部系统。',
    icon: '🌐',
  },
  {
    step: 4,
    title: '安装打印机驱动',
    desc: '根据所在楼层，按打印机安装说明完成驱动安装。',
    icon: '🖨️',
  },
  {
    step: 5,
    title: '申请 ERP 账号',
    desc: '联系 IT 或 ERP 管理员（王文林）开通金蝶系统账号和对应权限。',
    icon: '📦',
  },
  {
    step: 6,
    title: '安装常用软件',
    desc: '根据岗位需要，联系 IT 协助安装所需办公软件。',
    icon: '💿',
  },
  {
    step: 7,
    title: '安装企业微信',
    desc: '下载并登录企业微信，加入对应部门群组，这是联系 IT 支持的主要渠道。',
    icon: '💬',
  },
]
