export interface PolicyItem {
  icon: string
  title: string
  desc: string
}

export const policyItems: PolicyItem[] = [
  {
    icon: '🔒',
    title: '账号安全',
    desc: '不得将 Windows 登录密码、ERP 账号等告知他人，定期更换密码。',
  },
  {
    icon: '💾',
    title: '数据备份',
    desc: '重要文件请定期备份至公司共享盘或个人云存储，避免因硬件故障丢失数据。',
  },
  {
    icon: '🛡️',
    title: '安全软件',
    desc: '电脑已预装火绒安全，请勿自行卸载。发现异常弹窗或病毒提示，及时联系 IT。',
  },
  {
    icon: '📥',
    title: '软件安装',
    desc: '请勿自行安装来源不明的软件，需要安装软件请联系 IT 评估后协助处理。',
  },
  {
    icon: '🖥️',
    title: '离开锁屏',
    desc: '离开工位时请按 Win + L 锁定屏幕，防止他人误操作或信息泄露。',
  },
  {
    icon: '🔌',
    title: '下班关机',
    desc: '下班后请正常关机，不建议长期休眠，有助于系统更新和硬件保护。',
  },
]
