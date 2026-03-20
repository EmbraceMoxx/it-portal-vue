<template>
  <div class="diag-wrap">
    <div class="diag-header">
      <span class="diag-icon">🔍</span>
      <div>
        <div class="diag-title">快速故障诊断</div>
        <div class="diag-sub">3 步定位问题，找到解决方案</div>
      </div>
      <button v-if="step > 0" class="diag-reset" @click="reset">重新开始</button>
    </div>

    <!-- 进度条 -->
    <div class="diag-progress">
      <div class="diag-progress-bar" :style="{ width: `${(step / 3) * 100}%` }"></div>
    </div>

    <!-- 步骤内容 -->
    <transition name="diag-slide" mode="out-in">

      <!-- Step 0: 问题大类 -->
      <div v-if="step === 0" key="s0" class="diag-step">
        <div class="diag-q">你遇到的是哪类问题？</div>
        <div class="diag-options">
          <button v-for="opt in step0Options" :key="opt.value" class="diag-opt" @click="pick(0, opt.value)">
            <span class="diag-opt-icon">{{ opt.icon }}</span>
            <span>{{ opt.label }}</span>
          </button>
        </div>
      </div>

      <!-- Step 1: 细化 -->
      <div v-else-if="step === 1" key="s1" class="diag-step">
        <div class="diag-q">{{ step1Q }}</div>
        <div class="diag-options">
          <button v-for="opt in step1Options" :key="opt.value" class="diag-opt" @click="pick(1, opt.value)">
            <span class="diag-opt-icon">{{ opt.icon }}</span>
            <span>{{ opt.label }}</span>
          </button>
        </div>
      </div>

      <!-- Step 2: 确认 -->
      <div v-else-if="step === 2" key="s2" class="diag-step">
        <div class="diag-q">{{ step2Q }}</div>
        <div class="diag-options diag-options-2">
          <button class="diag-opt" @click="pick(2, 'yes')">
            <span class="diag-opt-icon">✅</span><span>是</span>
          </button>
          <button class="diag-opt" @click="pick(2, 'no')">
            <span class="diag-opt-icon">❌</span><span>否</span>
          </button>
        </div>
      </div>

      <!-- 结果 -->
      <div v-else key="result" class="diag-result">
        <div class="diag-result-icon">{{ result.icon }}</div>
        <div class="diag-result-title">{{ result.title }}</div>
        <div class="diag-result-desc">{{ result.desc }}</div>
        <div class="diag-result-actions">
          <RouterLink v-if="result.to" :to="result.to" class="diag-result-btn primary">
            {{ result.btnLabel }}
          </RouterLink>
          <RouterLink to="/ticket" class="diag-result-btn secondary">提交工单</RouterLink>
        </div>
      </div>

    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const step = ref(0)
const answers = ref<string[]>([])

const step0Options = [
  { value: 'network', label: '网络问题', icon: '🌐' },
  { value: 'printer', label: '打印机', icon: '🖨️' },
  { value: 'computer', label: '电脑故障', icon: '💻' },
  { value: 'account', label: '账号 / 权限', icon: '🔑' },
  { value: 'software', label: '软件问题', icon: '💿' },
]

const step1Map: Record<string, { q: string; opts: { value: string; label: string; icon: string }[] }> = {
  network: {
    q: '网络问题具体是？',
    opts: [
      { value: 'no-connect', label: '完全无法上网', icon: '🚫' },
      { value: 'slow', label: '网速很慢', icon: '🐢' },
      { value: 'internal-only', label: '能上网但内部系统打不开', icon: '🔒' },
      { value: 'wifi', label: 'Wi-Fi 连不上', icon: '📶' },
    ],
  },
  printer: {
    q: '打印机问题具体是？',
    opts: [
      { value: 'offline', label: '显示离线', icon: '🔴' },
      { value: 'no-driver', label: '找不到打印机', icon: '❓' },
      { value: 'print-fail', label: '发送打印但没反应', icon: '⏳' },
      { value: 'quality', label: '打印质量差', icon: '🖼️' },
    ],
  },
  computer: {
    q: '电脑问题具体是？',
    opts: [
      { value: 'no-boot', label: '开不了机 / 黑屏', icon: '⚫' },
      { value: 'slow', label: '运行很慢', icon: '🐌' },
      { value: 'crash', label: '频繁蓝屏 / 崩溃', icon: '💥' },
      { value: 'peripheral', label: '外设无法识别', icon: '🔌' },
    ],
  },
  account: {
    q: '账号问题具体是？',
    opts: [
      { value: 'forgot-pw', label: '忘记密码', icon: '🔓' },
      { value: 'no-permission', label: '权限不足', icon: '🚫' },
      { value: 'new-account', label: '需要新开账号', icon: '👤' },
      { value: 'erp', label: 'ERP 账号问题', icon: '📦' },
    ],
  },
  software: {
    q: '软件问题具体是？',
    opts: [
      { value: 'install', label: '需要安装软件', icon: '📥' },
      { value: 'crash', label: '软件崩溃 / 打不开', icon: '💥' },
      { value: 'update', label: '需要更新', icon: '🔄' },
      { value: 'license', label: '授权 / 激活问题', icon: '🔑' },
    ],
  },
}

const step2Map: Record<string, Record<string, string>> = {
  'network-no-connect': '网线是否已插好，或 Wi-Fi 是否已连接？',
  'network-slow': '是否同时有多人反映网速慢？',
  'network-internal-only': '是否连接的是公司办公网络（非手机热点）？',
  'network-wifi': '是否尝试过重新输入密码连接？',
  'printer-offline': '打印机是否已开机并亮灯？',
  'printer-no-driver': '是否已按照安装说明连接共享盘？',
  'printer-print-fail': '打印队列中是否有卡住的任务？',
  'printer-quality': '是否已检查墨水余量？',
  'computer-no-boot': '是否尝试过长按电源键强制重启？',
  'computer-slow': '是否已重启电脑？',
  'computer-crash': '蓝屏是否有错误代码？',
  'computer-peripheral': '是否尝试过换一个 USB 接口？',
  'account-forgot-pw': '是否是 Windows 登录密码？',
  'account-no-permission': '是否已告知直属上级申请权限？',
  'account-new-account': '是否已填写入职手续？',
  'account-erp': '是否能正常登录但权限不足？',
  'software-install': '是否在软件下载中心找到了对应软件？',
  'software-crash': '是否尝试过重新安装？',
  'software-update': '是否有管理员权限？',
  'software-license': '是否是公司统一采购的软件？',
}

const resultMap: Record<string, Record<string, { icon: string; title: string; desc: string; to?: string; btnLabel?: string }>> = {
  'network-no-connect': {
    yes: { icon: '🌐', title: '检查网络连接', desc: '网线已插好或 Wi-Fi 已连接，但仍无法上网。请尝试重启路由器或联系 IT 检查网络配置。', to: '/network', btnLabel: '查看网络说明' },
    no: { icon: '🌐', title: '先连接网络', desc: '请先将网线插入电脑网口，或连接对应楼层的 Wi-Fi，再尝试上网。', to: '/network', btnLabel: '查看接入说明' },
  },
  'network-slow': {
    yes: { icon: '📡', title: '可能是网络拥堵', desc: '多人同时反映网速慢，可能是交换机或带宽问题，请联系 IT 排查。', to: '/ticket', btnLabel: '提交工单' },
    no: { icon: '🐢', title: '本机网络问题', desc: '仅你的设备网速慢，建议重启网卡或重新插拔网线，若无改善联系 IT。', to: '/network', btnLabel: '查看网络说明' },
  },
  'network-internal-only': {
    yes: { icon: '🔒', title: '内网访问异常', desc: '已接入公司网络但内部系统打不开，可能是 DNS 或系统故障，请联系 IT。', to: '/ticket', btnLabel: '提交工单' },
    no: { icon: '🌐', title: '请切换到办公网络', desc: '手机热点或其他网络无法访问内部系统，请连接公司有线或 Wi-Fi 网络。', to: '/network', btnLabel: '查看接入说明' },
  },
  'network-wifi': {
    yes: { icon: '📶', title: '联系 IT 处理', desc: '已尝试重新连接仍无法使用，可能是 AP 故障或账号问题，请联系 IT。', to: '/ticket', btnLabel: '提交工单' },
    no: { icon: '📶', title: '重新输入密码', desc: '请参考网络说明页面，确认楼层对应的 Wi-Fi 名称和密码后重新连接。', to: '/network', btnLabel: '查看 Wi-Fi 说明' },
  },
  'printer-offline': {
    yes: { icon: '🖨️', title: '重启打印机', desc: '打印机已开机但显示离线，请尝试关机重启，等待 30 秒后再试。若仍离线，联系 IT。', to: '/printer', btnLabel: '查看打印机说明' },
    no: { icon: '🖨️', title: '先开启打印机', desc: '请先按下打印机电源键开机，等待初始化完成后再尝试打印。', to: '/printer', btnLabel: '查看打印机说明' },
  },
  'printer-no-driver': {
    yes: { icon: '🖨️', title: '重新安装驱动', desc: '已连接共享盘但找不到打印机，请重新运行安装包，或联系 IT 协助。', to: '/printer', btnLabel: '查看安装说明' },
    no: { icon: '🖨️', title: '先连接共享盘', desc: '请按照打印机安装说明，先连接共享盘再运行安装包。', to: '/printer', btnLabel: '查看安装说明' },
  },
  'printer-print-fail': {
    yes: { icon: '🖨️', title: '清除打印队列', desc: '打开"设备和打印机"，右键打印机 → 查看打印内容，取消所有任务后重试。', to: '/printer', btnLabel: '查看打印机说明' },
    no: { icon: '🖨️', title: '检查打印机状态', desc: '打印队列正常但无反应，请确认打印机已开机且在线，或重启打印机后重试。', to: '/printer', btnLabel: '查看打印机说明' },
  },
  'printer-quality': {
    yes: { icon: '🖨️', title: '更换墨盒', desc: '墨水不足会导致打印质量下降，请联系 IT 申请更换墨盒。', to: '/ticket', btnLabel: '提交工单' },
    no: { icon: '🖨️', title: '执行打印头清洗', desc: '墨水充足但质量差，可能是打印头堵塞，请在打印机控制面板执行清洗操作。', to: '/ticket', btnLabel: '提交工单' },
  },
  'computer-no-boot': {
    yes: { icon: '💻', title: '等待或联系 IT', desc: '已强制重启仍无法开机，可能是硬件故障，请联系 IT 上门检查。', to: '/ticket', btnLabel: '提交工单' },
    no: { icon: '💻', title: '尝试强制重启', desc: '长按电源键 5 秒强制关机，等待 10 秒后再按电源键开机。', to: '/ticket', btnLabel: '仍无法解决？提交工单' },
  },
  'computer-slow': {
    yes: { icon: '💻', title: '检查后台程序', desc: '重启后仍慢，请打开任务管理器查看 CPU/内存占用，关闭不必要的程序。若持续，联系 IT。', to: '/ticket', btnLabel: '提交工单' },
    no: { icon: '💻', title: '先重启电脑', desc: '长时间未重启会导致系统变慢，请先保存工作后重启电脑。', to: '/ticket', btnLabel: '仍有问题？提交工单' },
  },
  'computer-crash': {
    yes: { icon: '💻', title: '记录错误代码', desc: '请拍下蓝屏错误代码，联系 IT 协助分析原因。', to: '/ticket', btnLabel: '提交工单' },
    no: { icon: '💻', title: '可能是驱动问题', desc: '无错误代码的蓝屏通常是驱动或内存问题，请联系 IT 检查。', to: '/ticket', btnLabel: '提交工单' },
  },
  'computer-peripheral': {
    yes: { icon: '🔌', title: '可能是设备故障', desc: '换接口仍无法识别，可能是外设本身故障或驱动问题，请联系 IT。', to: '/ticket', btnLabel: '提交工单' },
    no: { icon: '🔌', title: '换个 USB 接口试试', desc: '请尝试将设备插到电脑其他 USB 接口，或重启电脑后重新插入。', to: '/ticket', btnLabel: '仍无法解决？提交工单' },
  },
  'account-forgot-pw': {
    yes: { icon: '🔑', title: '联系 IT 重置密码', desc: 'Windows 登录密码需要 IT 协助重置，请通过企业微信联系黎灿或曹杰珲。', to: '/ticket', btnLabel: '提交工单' },
    no: { icon: '🔑', title: '联系对应管理员', desc: '其他系统密码请联系对应管理员重置，ERP 密码联系王文林。', to: '/ticket', btnLabel: '提交工单' },
  },
  'account-no-permission': {
    yes: { icon: '🔑', title: '提交权限申请', desc: '已获上级确认，请提交工单说明需要的权限，IT 会协助处理。', to: '/ticket', btnLabel: '提交工单' },
    no: { icon: '🔑', title: '先确认业务需求', desc: '请先与直属上级确认是否需要该权限，再联系 IT 申请。', to: '/ticket', btnLabel: '提交工单' },
  },
  'account-new-account': {
    yes: { icon: '👤', title: '联系 IT 开通账号', desc: '入职手续已完成，请联系 IT 开通 Windows 账号和内网权限。', to: '/ticket', btnLabel: '提交工单' },
    no: { icon: '👤', title: '先完成入职手续', desc: '请先完成 HR 入职手续，再联系 IT 开通账号。', to: '/ticket', btnLabel: '提交工单' },
  },
  'account-erp': {
    yes: { icon: '📦', title: '联系 ERP 管理员', desc: '能登录但权限不足，请联系 ERP 管理员王文林申请对应模块权限。', to: '/ticket', btnLabel: '提交工单' },
    no: { icon: '📦', title: '联系 IT 重置 ERP 账号', desc: '无法登录 ERP，请联系 IT 或王文林重置账号。', to: '/ticket', btnLabel: '提交工单' },
  },
  'software-install': {
    yes: { icon: '💿', title: '前往下载安装', desc: '软件下载中心已有该软件，请前往下载并按说明安装。', to: '/software', btnLabel: '前往软件中心' },
    no: { icon: '💿', title: '联系 IT 协助安装', desc: '软件中心暂无该软件，请提交工单说明软件名称和用途，IT 评估后协助处理。', to: '/ticket', btnLabel: '提交工单' },
  },
  'software-crash': {
    yes: { icon: '💿', title: '联系 IT 处理', desc: '重装后仍崩溃，可能是系统兼容性或配置问题，请联系 IT 协助排查。', to: '/ticket', btnLabel: '提交工单' },
    no: { icon: '💿', title: '尝试重新安装', desc: '请先卸载软件，重启电脑后重新安装，或前往软件中心下载最新版本。', to: '/software', btnLabel: '前往软件中心' },
  },
  'software-update': {
    yes: { icon: '🔄', title: '直接更新', desc: '有管理员权限，可直接在软件内检查更新，或前往软件中心下载新版本。', to: '/software', btnLabel: '前往软件中心' },
    no: { icon: '🔄', title: '联系 IT 协助更新', desc: '没有管理员权限无法自行更新，请联系 IT 协助处理。', to: '/ticket', btnLabel: '提交工单' },
  },
  'software-license': {
    yes: { icon: '🔑', title: '联系 IT 获取授权', desc: '公司统一采购的软件，请联系 IT 获取授权码或激活方式。', to: '/ticket', btnLabel: '提交工单' },
    no: { icon: '🔑', title: '联系 IT 评估采购', desc: '非公司采购软件，请联系 IT 说明需求，评估是否可以采购授权。', to: '/ticket', btnLabel: '提交工单' },
  },
}

const step1Q = computed(() => step1Map[answers.value[0]]?.q ?? '')
const step1Options = computed(() => step1Map[answers.value[0]]?.opts ?? [])
const step2Q = computed(() => {
  const key = `${answers.value[0]}-${answers.value[1]}`
  return step2Map[key] ?? '是否已尝试重启设备？'
})
const result = computed(() => {
  const key = `${answers.value[0]}-${answers.value[1]}`
  return resultMap[key]?.[answers.value[2]] ?? {
    icon: '🛠️',
    title: '联系 IT 处理',
    desc: '根据你的描述，建议直接联系 IT 支持协助排查。',
    to: '/ticket',
    btnLabel: '提交工单',
  }
})

function pick(s: number, val: string) {
  answers.value[s] = val
  step.value = s + 1
}

function reset() {
  step.value = 0
  answers.value = []
}
</script>
