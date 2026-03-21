<template>
  <div class="container page-onboarding">
    <div class="detail-header" style="border-left-color: #10b981;">
      <div>
        <h1>新员工 IT 入职引导</h1>
        <p>欢迎加入水卫士！按照以下步骤完成 IT 配置，预计需要 30-60 分钟</p>
      </div>
      <div class="ob-progress-wrap">
        <div class="ob-progress-ring">
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="28" fill="none" stroke="#e2e8f0" stroke-width="6"/>
            <circle
              cx="36" cy="36" r="28" fill="none"
              stroke="#10b981" stroke-width="6"
              stroke-linecap="round"
              :stroke-dasharray="`${progressDash} 176`"
              stroke-dashoffset="44"
              style="transition: stroke-dasharray 0.4s ease;"
            />
          </svg>
          <div class="ob-progress-text">{{ completedCount }}/{{ steps.length }}</div>
        </div>
        <div class="ob-progress-label">
          <div class="ob-progress-pct">{{ progressPct }}%</div>
          <div class="ob-progress-sub">已完成</div>
        </div>
      </div>
    </div>

    <!-- 完成庆祝 -->
    <transition name="fade-slide">
      <div v-if="allDone" class="ob-done-banner">
        <span class="ob-done-icon">🎉</span>
        <div>
          <div class="ob-done-title">入职配置全部完成！</div>
          <div class="ob-done-desc">如有任何问题，随时通过企业微信联系 IT 支持</div>
        </div>
      </div>
    </transition>

    <div class="ob-layout">
      <!-- 步骤列表 -->
      <div class="ob-steps">
        <div
          v-for="(step, idx) in steps"
          :key="step.id"
          class="ob-step-card"
          :class="{ done: checked[step.id], active: activeStep === idx }"
          @click="activeStep = activeStep === idx ? -1 : idx"
        >
          <div class="ob-step-head">
            <div class="ob-step-left">
              <button
                class="ob-check-btn"
                :class="{ checked: checked[step.id] }"
                @click.stop="toggle(step.id)"
              >
                <svg v-if="checked[step.id]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </button>
              <span class="ob-step-num">{{ idx + 1 }}</span>
              <span class="ob-step-icon">{{ step.icon }}</span>
              <div>
                <div class="ob-step-title" :class="{ done: checked[step.id] }">{{ step.title }}</div>
                <div class="ob-step-desc">{{ step.desc }}</div>
              </div>
            </div>
            <div class="ob-step-right">
              <span v-if="step.required" class="ob-required-tag">必须</span>
              <span v-if="checked[step.id]" class="ob-done-tag">✓ 完成</span>
              <span class="ob-chevron" :class="{ open: activeStep === idx }">›</span>
            </div>
          </div>

          <!-- 展开详情 -->
          <transition name="ob-expand">
            <div v-if="activeStep === idx" class="ob-step-body">
              <div class="ob-step-detail-list">
                <div v-for="(item, i) in step.details" :key="i" class="ob-detail-item">
                  <span class="ob-detail-num">{{ i + 1 }}</span>
                  <span class="ob-detail-text">{{ item }}</span>
                </div>
              </div>
              <div v-if="step.link" class="ob-step-actions">
                <RouterLink :to="step.link" class="ob-step-link-btn">
                  前往操作 →
                </RouterLink>
              </div>
              <div v-if="step.tip" class="ob-step-tip">
                <span>💡</span>
                <span>{{ step.tip }}</span>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="ob-sidebar">
        <!-- IT 联系 -->
        <div class="section-card ob-contact-card">
          <h3>遇到问题？</h3>
          <p class="ob-contact-desc">通过企业微信联系 IT 支持</p>
          <div class="ob-contact-list">
            <div class="ob-contact-item">
              <div class="ob-contact-av it">黎</div>
              <div>
                <div class="ob-contact-name">黎灿</div>
                <div class="ob-contact-role">IT 运维</div>
              </div>
            </div>
            <div class="ob-contact-item">
              <div class="ob-contact-av it">曹</div>
              <div>
                <div class="ob-contact-name">曹杰珲</div>
                <div class="ob-contact-role">IT 运维</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 快捷入口 -->
        <div class="section-card">
          <h3>相关入口</h3>
          <div class="ob-quick-links">
            <RouterLink to="/printer" class="ob-quick-item">
              <span>🖨️</span><span>打印机安装</span>
            </RouterLink>
            <RouterLink to="/network" class="ob-quick-item">
              <span>🌐</span><span>网络接入</span>
            </RouterLink>
            <RouterLink to="/software" class="ob-quick-item">
              <span>💽</span><span>软件下载</span>
            </RouterLink>
            <RouterLink to="/kb" class="ob-quick-item">
              <span>📚</span><span>IT 知识库</span>
            </RouterLink>
          </div>
        </div>

        <!-- 重置 -->
        <button class="ob-reset-btn" @click="resetAll">重置所有进度</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'ob-checklist-v1'

const steps = [
  {
    id: 'network',
    icon: '🌐',
    title: '连接办公网络',
    desc: '接入有线或无线网络',
    required: true,
    link: '/network',
    tip: '有线网络更稳定，推荐优先使用有线接入',
    details: [
      '将网线插入电脑网口（有线接入）',
      '或搜索 Wi-Fi：SWS-Office，密码：SWS88888888',
      '确认可以访问内网地址 192.168.120.x',
    ],
  },
  {
    id: 'account',
    icon: '👤',
    title: '确认账号已开通',
    desc: 'Windows 登录账号、企业微信',
    required: true,
    tip: '账号由 IT 在入职当天开通，如未收到通知请联系 IT',
    details: [
      '确认 Windows 域账号可以正常登录',
      '确认企业微信已收到邀请并完成注册',
      '确认企业邮箱可以正常收发邮件',
    ],
  },
  {
    id: 'printer',
    icon: '🖨️',
    title: '安装打印机',
    desc: '连接共享盘并安装驱动',
    required: true,
    link: '/printer',
    tip: '安装过程中需要输入共享盘凭据，联系 IT 获取',
    details: [
      '在文件管理器地址栏输入：\\\\192.168.120.252\\IT共享',
      '输入凭据：用户名 sws，密码 Sws888888',
      '进入 Printer 文件夹，双击对应楼层的 .bat 文件',
      '等待安装完成，测试打印一张测试页',
    ],
  },
  {
    id: 'software',
    icon: '💽',
    title: '安装常用软件',
    desc: 'Office、微信、企业微信等',
    required: true,
    link: '/software',
    details: [
      '从软件下载中心下载 Microsoft Office',
      '安装企业微信（如未安装）',
      '根据岗位需要安装其他软件',
      '激活密钥联系 IT 获取',
    ],
  },
  {
    id: 'erp',
    icon: '📦',
    title: '申请 ERP 账号',
    desc: '金蝶系统账号与权限',
    required: false,
    tip: '需要使用 ERP 的岗位才需要申请，由部门负责人确认权限范围',
    details: [
      '确认是否需要使用金蝶 ERP 系统',
      '由部门负责人向 IT 提交权限申请',
      'IT 开通后会通过企业微信通知',
      '首次登录地址：http://192.168.120.100',
    ],
  },
  {
    id: 'overseas',
    icon: '🚀',
    title: '配置海外网络（按需）',
    desc: '需要访问海外资源时配置',
    required: false,
    link: '/overseas-network',
    details: [
      '从软件下载中心下载代理客户端',
      '联系 IT 获取配置文件',
      '导入配置，选择系统代理模式',
      '测试访问 Google 确认连通',
    ],
  },
  {
    id: 'kb',
    icon: '📚',
    title: '了解 IT 知识库',
    desc: '熟悉常见问题自助解决方式',
    required: false,
    link: '/kb',
    details: [
      '访问 IT 知识库，了解常见问题解决方法',
      '收藏 IT 服务门户地址，方便随时查阅',
      '遇到问题先查知识库，再联系 IT',
    ],
  },
]

const savedRaw = localStorage.getItem(STORAGE_KEY)
const saved = savedRaw ? JSON.parse(savedRaw) : {}
const checked = ref<Record<string, boolean>>(saved)
const activeStep = ref(0)

const completedCount = computed(() => steps.filter(s => checked.value[s.id]).length)
const progressPct = computed(() => Math.round(completedCount.value / steps.length * 100))
const progressDash = computed(() => Math.round(progressPct.value / 100 * 176))
const allDone = computed(() => completedCount.value === steps.length)

function toggle(id: string) {
  checked.value[id] = !checked.value[id]
}

function resetAll() {
  if (confirm('确认重置所有进度？')) {
    checked.value = {}
  }
}

watch(checked, (val) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
}, { deep: true })
</script>
