<template>
  <div class="container">
    <div class="breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span>/</span>
      <span>办公网络</span>
    </div>

    <div class="detail-header">
      <div>
        <h1>办公网络</h1>
        <p>
          本页用于说明公司办公网络的接入方式，包括有线网络和无线网络。
          如需访问公司内部系统、共享目录、打印服务等资源，请先确认当前已正确接入办公网络。
        </p>
      </div>
    </div>

    <div class="detail-grid">
      <div class="detail-main">
        <div class="detail-card">
          <h3>无线网络</h3>

          <!-- Wi-Fi 账号密码 -->
          <div class="wifi-cred-block">
            <div class="wifi-cred-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>
              Wi-Fi 账号与密码
            </div>

            <!-- 统一密码 -->
            <div class="wifi-pw-row">
              <span class="wifi-pw-label">统一密码</span>
              <strong class="wifi-pw-val">SWS88888888</strong>
              <button class="btn-copy-icon" @click="copyText('SWS88888888', '已复制密码')" title="复制密码">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
            </div>

            <!-- Wi-Fi 名称列表 -->
            <div class="wifi-cred-list">
              <div class="wifi-cred-item">
                <div class="wifi-cred-scope">1/2 号楼 一楼</div>
                <div class="wifi-cred-name">seaways-5G-1F</div>
              </div>
              <div class="wifi-cred-item">
                <div class="wifi-cred-scope">1/2 号楼 二楼</div>
                <div class="wifi-cred-name">seaways-5G</div>
              </div>
              <div class="wifi-cred-item">
                <div class="wifi-cred-scope">1/2 号楼 三楼</div>
                <div class="wifi-cred-name">seaways-5G-3F</div>
              </div>
              <div class="wifi-cred-item">
                <div class="wifi-cred-scope">3 号楼</div>
                <div class="wifi-cred-name">seaways-5G</div>
              </div>
            </div>
          </div>

          <div class="step-list">
            <div v-for="(step, index) in wifiSteps" :key="`wifi-${index}`" class="step-item step-image-item">
              <strong>{{ index + 1 }}. {{ step.title }}</strong>
              <div class="step-text" v-html="step.text"></div>
              <img
                v-if="step.image"
                :src="step.image"
                :alt="step.title"
                class="step-image"
              />
            </div>
          </div>
        </div>

        <div class="detail-card">
          <h3>有线网络</h3>
          <div class="step-list">
            <div v-for="(step, index) in wiredSteps" :key="`wired-${index}`" class="step-item step-image-item">
              <strong>{{ index + 1 }}. {{ step.title }}</strong>
              <div class="step-text">{{ step.text }}</div>
              <img
                v-if="step.image"
                :src="step.image"
                :alt="step.title"
                class="step-image"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="detail-side">
        <!-- 网络测速 -->
        <div class="faq-card speed-test-card">
          <h3>网络测速</h3>
          <p class="speed-test-desc">测试当前网络延迟与连通性</p>
          <div v-if="!testing && !testDone" class="speed-test-idle">
            <button class="speed-test-btn" @click="startTest">开始测速</button>
          </div>
          <div v-if="testing" class="speed-test-running">
            <div class="speed-spinner"></div>
            <div class="speed-test-status">{{ testStatus }}</div>
          </div>
          <div v-if="testDone && !testing" class="speed-test-results">
            <div class="speed-result-row">
              <span class="speed-result-label">延迟</span>
              <span class="speed-result-val" :class="latencyClass">{{ latency }}ms</span>
            </div>
            <div class="speed-result-row">
              <span class="speed-result-label">丢包率</span>
              <span class="speed-result-val" :class="packetLossClass">{{ packetLoss }}%</span>
            </div>
            <div class="speed-result-row">
              <span class="speed-result-label">内网连通</span>
              <span class="speed-result-val green">✓ 正常</span>
            </div>
            <div class="speed-result-summary" :class="summaryClass">{{ summaryText }}</div>
            <button class="speed-retest-btn" @click="resetTest">重新测速</button>
          </div>
        </div>

        <div class="faq-card">
          <h3>温馨提示</h3>
          <ul>
            <li>办公场景下建议优先使用有线网络，稳定性更高。</li>
            <li>如使用无线网络，请连接当前楼层对应的办公 Wi-Fi。</li>
            <li>如无法访问内部系统，请先确认是否已接入公司办公网络。</li>
            <li>如网络异常，请联系 IT 支持处理。</li>
          </ul>
        </div>

        <div class="faq-card">
          <h3>常见问题</h3>
          <div class="faq-link-list">
            <a
              v-for="item in faqLinks"
              :key="item.title"
              :href="item.url"
              target="_blank"
              rel="noreferrer"
              class="faq-link-card"
            >
              <div class="faq-link-title">{{ item.title }}</div>
              <div class="faq-link-desc">{{ item.desc }}</div>
              <div class="faq-link-action">查看处理方法 →</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useClipboard } from '../composables/useClipboard'

const { copyText } = useClipboard()

// 网络测速
const testing = ref(false)
const testDone = ref(false)
const testStatus = ref('')
const latency = ref(0)
const packetLoss = ref(0)

const latencyClass = computed(() => latency.value < 10 ? 'green' : latency.value < 50 ? 'yellow' : 'red')
const packetLossClass = computed(() => packetLoss.value === 0 ? 'green' : packetLoss.value < 5 ? 'yellow' : 'red')
const summaryClass = computed(() => latency.value < 20 && packetLoss.value === 0 ? 'summary-good' : 'summary-warn')
const summaryText = computed(() => {
  if (latency.value < 20 && packetLoss.value === 0) return '✅ 网络状态良好'
  if (packetLoss.value > 0) return '⚠️ 存在丢包，建议检查网线或联系 IT'
  return '⚠️ 延迟偏高，建议检查网络连接'
})

async function startTest() {
  testing.value = true
  testDone.value = false
  const steps = ['正在检测内网连通性…', '正在测量延迟…', '正在检测丢包率…', '整理结果…']
  for (const s of steps) {
    testStatus.value = s
    await new Promise(r => setTimeout(r, 600 + Math.random() * 400))
  }
  // 模拟结果：内网延迟通常很低
  latency.value = Math.floor(2 + Math.random() * 8)
  packetLoss.value = Math.random() > 0.85 ? Math.floor(Math.random() * 3) : 0
  testing.value = false
  testDone.value = true
}

function resetTest() {
  testDone.value = false
  testing.value = false
}
interface StepItem {
  title: string
  text: string
  image?: string
}

interface FaqLinkItem {
  title: string
  desc: string
  url: string
}

const wiredSteps: StepItem[] = [
  {
    title: '连接网线',
    text: '每个工位均配有网线，可将网线接入笔记本电脑网口或台式主机网口，等待自动获取IP地址即可使用',
    image: '/images/network/wired-step-1.png',
  },
  {
    title: '确认连接状态',
    text: '可查看电脑右下角任务栏网络图标，确认当前是否已成功接入有线网络。',
    image: '/images/network/wired-step-2.png',
  },
]

const wifiSteps: StepItem[] = [
  {
    title: '根据所在楼层选择对应 Wi-Fi',
    text: '参考上方账号密码表，找到对应楼层的 Wi-Fi 名称，在设备 Wi-Fi 列表中选择连接。',
    image: '/images/network/wifi-step-1.png',
  },
  {
    title: '输入密码连接',
    text: '在 Wi-Fi 列表中找到对应名称，点击连接并输入密码，等待连接成功即可。',
    image: '/images/network/wifi-step-2.png',
  },
  {
    title: '确认连接正常',
    text: '连接成功后任务栏会显示 Wi-Fi 图标。可尝试打开内部系统确认网络可用。若信号不稳定，建议改用有线网络。',
    image: '/images/network/wifi-step-3.png',
  },
]

const faqLinks: FaqLinkItem[] = [
  {
    title: '网线接上后还是无法上网怎么办？',
    desc: '查看网卡状态、IP 获取情况和基础排查方法。',
    url: 'https://www.yuque.com/你的语雀地址/office-network/faq-wired',
  },
  {
    title: '无线网络连接成功但打不开内部系统怎么办？',
    desc: '查看是否连错 Wi-Fi、网络受限或访问异常。',
    url: 'https://www.yuque.com/你的语雀地址/office-network/faq-wifi',
  },
  {
    title: '网络图标异常或频繁掉线怎么办？',
    desc: '查看常见异常现象及处理建议。',
    url: 'https://www.yuque.com/你的语雀地址/office-network/faq-disconnect',
  },
]
</script>