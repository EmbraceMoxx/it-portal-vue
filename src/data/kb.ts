/** 图文步骤，支持文字 + 截图 + 提示 */
export interface KbStep {
  title: string
  body: string
  /** 相对于 /public 的图片路径，可选 */
  image?: string
  /** 提示/警告文字 */
  tip?: string
  tipType?: 'info' | 'warning' | 'success'
}

export interface KbArticle {
  id: string
  title: string
  desc: string
  category: string
  icon: string
  tags: string[]
  /**
   * 图文步骤列表（静态演示）。
   * 接入语雀/数据库后优先使用 body 字段渲染富文本，steps 作为降级。
   */
  steps?: KbStep[]
  /** 兼容旧格式纯文字步骤 */
  content: string[]
  /**
   * 富文本正文 HTML（语雀 body_html 或数据库字段直接赋值）。
   * 有值时优先渲染，忽略 steps/content。
   */
  body?: string
  /** 语雀原文链接，有值时底部显示"在语雀中查看" */
  sourceUrl?: string
  updatedAt: string
  views?: number
}

export const kbCategories = ['全部', '网络', '打印机', '账号权限', '软件', '硬件', 'ERP', '安全']

export const kbArticles: KbArticle[] = [
  {
    id: 'wifi-connect',
    title: '如何连接办公室 Wi-Fi',
    desc: '办公室无线网络连接步骤，包含账号密码和常见问题处理',
    category: '网络',
    icon: '📶',
    tags: ['Wi-Fi', '无线网络', '网络接入'],
    steps: [
      {
        title: '打开 Wi-Fi 设置',
        body: '点击任务栏右下角的网络图标，或进入「设置 → 网络和 Internet → WLAN」，确保 Wi-Fi 已开启。',
        image: '/images/network/wifi-step-1.png',
      },
      {
        title: '选择对应楼层的 SSID',
        body: '在可用网络列表中找到对应楼层的 Wi-Fi 名称并点击连接：\n• 1/2号楼一楼：seaways-5G-1F\n• 1/2号楼二楼：seaways-5G\n• 1/2号楼三楼：seaways-5G-3F\n• 3号楼：seaways-5G',
        image: '/images/network/wifi-step-2.png',
      },
      {
        title: '输入 Wi-Fi 密码',
        body: '在密码框中输入统一密码，然后点击「连接」。',
        image: '/images/network/wifi-step-3.png',
        tip: 'Wi-Fi 密码：SWS88888888（全大写，共10位）',
        tipType: 'success',
      },
      {
        title: '确认连接成功',
        body: '连接成功后，任务栏网络图标会显示已连接状态，此时可正常访问内网和互联网资源。',
        tip: '如果连接后无法上网，尝试「断开 → 重新连接」，或联系 IT 检查账号状态。',
        tipType: 'info',
      },
    ],
    content: [
      '打开系统 Wi-Fi 设置，搜索对应楼层 SSID',
      '输入密码：SWS88888888',
      '连接成功后可访问内网资源',
      '如连接失败，检查是否在覆盖范围内，或联系 IT 重置账号',
    ],
    updatedAt: '2026-03-20',
    views: 128,
  },
  {
    id: 'wired-connect',
    title: '有线网络接入配置',
    desc: '通过网线连接内网，IP 自动获取或手动配置说明',
    category: '网络',
    icon: '🔌',
    tags: ['有线网络', 'IP配置', '内网'],
    steps: [
      {
        title: '连接网线',
        body: '将网线一端插入电脑网口（RJ45 接口），另一端插入工位旁的墙面网口或交换机端口。',
        image: '/images/network/wired-step-1.png',
      },
      {
        title: '等待自动获取 IP',
        body: '系统默认开启 DHCP，插上网线后约 5-10 秒会自动获取 IP 地址（192.168.120.x 网段），无需手动配置。',
        image: '/images/network/wired-step-2.png',
        tip: '可在「设置 → 网络 → 以太网 → 属性」中确认 IP 地址已分配。',
        tipType: 'info',
      },
      {
        title: '验证网络连通性',
        body: '打开浏览器访问任意网页，或在命令提示符中执行 ping 192.168.120.1 确认内网连通。',
        tip: '如需固定 IP（服务器、打印机等），请联系 IT 分配并手动填写。',
        tipType: 'warning',
      },
    ],
    content: [
      '将网线插入电脑网口和墙面网口',
      '系统默认 DHCP 自动获取 IP，无需手动配置',
      '如需固定 IP，联系 IT 分配并手动填写',
      '内网网段：192.168.120.x',
    ],
    updatedAt: '2026-03-15',
    views: 89,
  },
  {
    id: 'overseas-vpn',
    title: '海外网络客户端配置',
    desc: '访问海外资源的代理客户端安装与配置步骤',
    category: '网络',
    icon: '🚀',
    tags: ['海外网络', 'VPN', '代理'],
    steps: [
      {
        title: '获取客户端安装包',
        body: '联系 IT（企业微信：黎灿 / 曹杰珲）获取代理客户端安装包，或从内网共享盘下载。',
        tip: '安装包不对外公开，请勿转发给非公司人员。',
        tipType: 'warning',
      },
      {
        title: '安装并导入配置',
        body: '运行安装包完成安装后，打开客户端，点击「导入配置」，选择 IT 提供的配置文件（.json 或 .yaml 格式）。',
        image: '/images/overseas/step-1.png',
      },
      {
        title: '选择节点并连接',
        body: '在节点列表中选择延迟较低的节点，点击「连接」，等待状态变为「已连接」。',
        image: '/images/overseas/step-2.png',
      },
      {
        title: '开启系统代理',
        body: '确认客户端中「系统代理」开关已打开，此时浏览器可直接访问海外资源，无需额外配置。',
        image: '/images/overseas/step-3.png',
        tip: '不使用时请关闭系统代理，避免影响内网访问速度。',
        tipType: 'info',
      },
      {
        title: '验证连接',
        body: '打开浏览器访问 google.com 或 youtube.com，能正常加载即表示配置成功。',
        image: '/images/overseas/step-4.png',
      },
    ],
    content: [
      '从软件下载中心获取客户端安装包',
      '安装完成后导入配置文件（联系 IT 获取）',
      '选择"系统代理"模式，点击连接',
      '连接成功后浏览器可直接访问海外资源',
    ],
    updatedAt: '2026-03-18',
    views: 76,
  },
  {
    id: 'printer-install',
    title: '打印机安装完整教程',
    desc: '通过共享盘连接并安装打印机驱动的完整步骤',
    category: '打印机',
    icon: '🖨️',
    tags: ['打印机', '驱动安装', '共享盘'],
    steps: [
      {
        title: '复制共享盘路径',
        body: '复制以下路径备用，稍后需要粘贴到文件管理器地址栏：\n\\\\192.168.120.252\\itsupport\\打印机驱动\\安装说明',
        tip: '路径以双反斜杠开头，注意不要漏掉。',
        tipType: 'warning',
      },
      {
        title: '打开文件管理器并连接共享盘',
        body: '按 Win+E 打开文件管理器，点击顶部地址栏，粘贴路径后按回车。系统会弹出凭据输入框。',
      },
      {
        title: '输入共享盘凭据',
        body: '在弹出的登录框中输入：\n• 用户名：it_ro\n• 密码：Sws888888\n\n勾选「记住凭据」可避免下次重复输入。',
        tip: '密码区分大小写，注意首字母大写。',
        tipType: 'warning',
      },
      {
        title: '找到对应楼层的安装文件',
        body: '进入共享盘后，根据你所在楼层找到对应的打印机文件夹，双击运行 .bat 安装脚本。',
        tip: '不确定楼层对应哪台打印机，可查看文件夹名称或联系 IT 确认。',
        tipType: 'info',
      },
      {
        title: '等待安装完成',
        body: '脚本会自动安装驱动并添加打印机，整个过程约 1-2 分钟。完成后在「设备和打印机」中可以看到新添加的打印机。',
        tip: '安装完成后建议打印一张测试页确认正常。',
        tipType: 'success',
      },
    ],
    content: [
      '复制共享盘路径：\\\\192.168.120.252\\IT共享',
      '在文件管理器地址栏粘贴路径并回车',
      '输入凭据：用户名 it_ro，密码 Sws888888',
      '进入 Printer 文件夹，双击对应型号的 .bat 文件',
      '等待安装完成，在打印机列表中确认',
    ],
    updatedAt: '2026-03-21',
    views: 215,
  },
  {
    id: 'printer-offline',
    title: '打印机显示离线怎么办',
    desc: '打印机状态异常、无法打印时的排查步骤',
    category: '打印机',
    icon: '🔧',
    tags: ['打印机', '故障排查', '离线'],
    content: [
      '检查打印机电源是否开启，指示灯是否正常',
      '确认电脑与打印机在同一内网网段',
      '在"设备和打印机"中右键 → 查看打印队列，清除卡住的任务',
      '尝试删除打印机并重新安装',
      '以上无效则联系 IT 处理',
    ],
    updatedAt: '2026-03-10',
    views: 143,
  },
  {
    id: 'new-account',
    title: '新员工账号开通流程',
    desc: '入职后 IT 账号、邮箱、ERP 权限的申请流程',
    category: '账号权限',
    icon: '👤',
    tags: ['新员工', '账号开通', '权限'],
    content: [
      '入职当天由 HR 通知 IT 开通 Windows 域账号',
      '企业邮箱由 IT 创建，格式：姓名拼音@sws.com',
      'ERP 账号需部门负责人提交权限申请',
      '企业微信由 HR 发送邀请链接',
      '所有账号开通后 IT 会通过企业微信通知',
    ],
    updatedAt: '2026-03-01',
    views: 98,
  },
  {
    id: 'password-reset',
    title: '忘记密码如何重置',
    desc: 'Windows 登录密码、ERP 密码、邮箱密码重置方法',
    category: '账号权限',
    icon: '🔑',
    tags: ['密码重置', '账号', '登录'],
    content: [
      'Windows 密码：联系 IT 通过域控重置',
      'ERP 密码：联系 IT 在金蝶后台重置',
      '企业邮箱密码：联系 IT 在邮件服务器重置',
      '企业微信密码：通过手机号自助找回',
    ],
    updatedAt: '2026-03-05',
    views: 167,
  },
  {
    id: 'office-install',
    title: 'Microsoft Office 安装',
    desc: '从内网共享盘安装 Office 套件的步骤',
    category: '软件',
    icon: '📄',
    tags: ['Office', '软件安装', 'Word Excel'],
    content: [
      '连接共享盘：\\\\192.168.120.252\\IT共享',
      '进入 Software → Office 文件夹',
      '运行 setup.exe，按提示安装',
      '安装完成后使用公司授权密钥激活',
      '激活密钥联系 IT 获取',
    ],
    updatedAt: '2026-03-12',
    views: 201,
  },
  {
    id: 'erp-login',
    title: '金蝶 ERP 登录说明',
    desc: 'ERP 系统地址、登录步骤和常见登录问题',
    category: 'ERP',
    icon: '📦',
    tags: ['金蝶', 'ERP', '登录'],
    content: [
      '系统地址：http://192.168.120.100（内网访问）',
      '使用 IT 分配的账号密码登录',
      '首次登录建议修改密码',
      '如提示无权限，联系 IT 检查权限配置',
      '系统维护时间：每周五 22:00-24:00',
    ],
    updatedAt: '2026-03-20',
    views: 312,
  },
  {
    id: 'laptop-policy',
    title: '笔记本电脑使用规范',
    desc: '公司笔记本的使用、携带和安全规范',
    category: '安全',
    icon: '💻',
    tags: ['笔记本', '安全', '规范'],
    content: [
      '公司电脑仅用于工作，不得安装与工作无关的软件',
      '离开工位时锁屏（Win+L）',
      '不得将公司数据存储在个人设备',
      '外出携带需填写设备借用记录',
      '发现异常立即联系 IT',
    ],
    updatedAt: '2026-02-28',
    views: 54,
  },
  {
    id: 'scan-to-email',
    title: '扫描文件发送到邮箱',
    desc: '使用 EPSON 打印机扫描并发送到指定邮箱',
    category: '打印机',
    icon: '📠',
    tags: ['扫描', '邮件', 'EPSON'],
    content: [
      '将文件放入进纸托盘或平板玻璃',
      '在打印机面板选择"扫描" → "发送至邮件"',
      '输入目标邮箱地址',
      '选择分辨率（推荐 300dpi）和格式（PDF）',
      '按开始键，等待扫描完成',
    ],
    updatedAt: '2026-03-08',
    views: 87,
  },
  {
    id: 'hardware-request',
    title: '硬件设备申请流程',
    desc: '申请新电脑、显示器、键鼠等硬件设备的流程',
    category: '硬件',
    icon: '🖥️',
    tags: ['硬件申请', '设备', '采购'],
    content: [
      '填写设备申请表（在设备申请页面提交）',
      '注明设备类型、用途、紧急程度',
      '部门负责人审批后转 IT 处理',
      'IT 评估库存，有库存直接分配，无库存走采购流程',
      '采购周期约 3-5 个工作日',
    ],
    updatedAt: '2026-03-01',
    views: 43,
  },
]
