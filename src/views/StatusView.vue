<template>
  <div class="container page-status">
    <div class="detail-header" style="border-left-color: #2d8a4e;">
      <div>
        <h1>系统状态看板</h1>
        <p>实时监控内网各系统与设备运行状态 · 最后更新：{{ lastUpdated }}</p>
      </div>
      <div class="status-head-right">
        <div class="status-overall" :class="`status-overall-${overallStatus}`">
          <span class="status-overall-dot"></span>
          <span>{{ overallLabel }}</span>
        </div>
        <button class="btn-refresh" @click="refresh">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
            <path d="M8 16H3v5"/>
          </svg>
          刷新
        </button>
      </div>
    </div>

    <!-- 汇总数字 -->
    <div class="status-summary-row">
      <div class="status-summary-card">
        <div class="ssc-num green">{{ onlineCount }}</div>
        <div class="ssc-label">正常运行</div>
      </div>
      <div class="status-summary-card">
        <div class="ssc-num yellow">{{ degradedCount }}</div>
        <div class="ssc-label">部分异常</div>
      </div>
      <div class="status-summary-card">
        <div class="ssc-num red">{{ offlineCount }}</div>
        <div class="ssc-label">离线</div>
      </div>
      <div class="status-summary-card">
        <div class="ssc-num gray">{{ systemStatusList.length }}</div>
        <div class="ssc-label">监控项目</div>
      </div>
      <div class="status-summary-card">
        <div class="ssc-num green">{{ uptimePct }}%</div>
        <div class="ssc-label">30天可用率</div>
      </div>
    </div>

    <!-- 30天历史可用率图表 -->
    <div class="section-card status-history-card">
      <div class="section-head">
        <div>
          <h2>30 天历史可用率</h2>
          <div class="section-subtitle">每格代表一天，绿色=正常，黄色=异常，红色=中断</div>
        </div>
        <div class="status-uptime-badge">
          <span class="status-uptime-num">{{ uptimePct }}%</span>
          <span class="status-uptime-label">30天可用率</span>
        </div>
      </div>
      <div class="status-history-grid">
        <div
          v-for="(day, i) in historyDays"
          :key="i"
          class="status-history-cell"
          :class="`shc-${day.status}`"
          :title="`${day.date}：${statusLabel(day.status)}`"
        ></div>
      </div>
      <div class="status-history-legend">
        <span class="shc-legend shc-online">正常</span>
        <span class="shc-legend shc-degraded">异常</span>
        <span class="shc-legend shc-offline">中断</span>
        <span class="shc-legend-date">← 30天前</span>
        <span class="shc-legend-date" style="margin-left: auto;">今天 →</span>
      </div>
    </div>

    <!-- 状态列表 -->
    <div class="section-card">
      <div class="section-head">
        <div>
          <h2>各系统状态</h2>
          <div class="section-subtitle">{{ systemStatusList.length }} 个监控项目</div>
        </div>
        <!-- 分类筛选 -->
        <div class="status-filter-row">
          <button
            v-for="cat in statusCategories"
            :key="cat"
            class="status-filter-btn"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = cat"
          >{{ cat }}</button>
        </div>
      </div>
      <div class="status-list">
        <div v-for="item in filteredStatus" :key="item.id" class="status-row">
          <div class="status-row-left">
            <span class="status-row-icon">{{ item.icon }}</span>
            <div>
              <div class="status-row-name">{{ item.name }}</div>
              <div class="status-row-desc">{{ item.desc }}</div>
            </div>
          </div>
          <div class="status-row-right">
            <span v-if="item.latency" class="status-latency">{{ item.latency }}</span>
            <span class="status-row-time">{{ item.lastChecked }}</span>
            <span class="status-badge" :class="`status-badge-${item.status}`">
              <span class="status-dot"></span>
              {{ statusLabel(item.status) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 历史事件 -->
    <div class="section-card">
      <div class="section-head">
        <div>
          <h2>近期事件</h2>
          <div class="section-subtitle">最近 30 天的系统事件记录</div>
        </div>
      </div>
      <div class="event-list">
        <div v-for="ev in recentEvents" :key="ev.id" class="event-item">
          <span class="event-dot" :class="`event-dot-${ev.type}`"></span>
          <div class="event-body">
            <div class="event-title">{{ ev.title }}</div>
            <div class="event-time">{{ ev.time }}</div>
          </div>
          <span class="event-tag" :class="`event-tag-${ev.type}`">{{ ev.typeLabel }}</span>
        </div>
      </div>
    </div>

    <!-- 订阅通知提示 -->
    <div class="status-subscribe-banner">
      <span class="status-subscribe-icon">🔔</span>
      <div>
        <div class="status-subscribe-title">订阅状态通知</div>
        <div class="status-subscribe-desc">系统异常时通过企业微信推送通知，联系 IT 开通</div>
      </div>
      <RouterLink to="/ticket" class="status-subscribe-btn">联系 IT →</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { systemStatusList } from '../data/system-status'

const lastUpdated = ref('刚刚')
const activeCategory = ref('全部')

const statusCategories = ['全部', '网络', '服务器', '打印机']

const onlineCount = computed(() => systemStatusList.filter(s => s.status === 'online').length)
const degradedCount = computed(() => systemStatusList.filter(s => s.status === 'degraded').length)
const offlineCount = computed(() => systemStatusList.filter(s => s.status === 'offline').length)

const uptimePct = computed(() => {
  const online = historyDays.filter(d => d.status === 'online').length
  return Math.round(online / historyDays.length * 100)
})

const overallStatus = computed(() => {
  if (offlineCount.value > 0) return 'offline'
  if (degradedCount.value > 0) return 'degraded'
  return 'online'
})

const overallLabel = computed(() => {
  if (overallStatus.value === 'offline') return '存在服务中断'
  if (overallStatus.value === 'degraded') return '部分服务异常'
  return '所有系统正常运行'
})

const filteredStatus = computed(() => {
  if (activeCategory.value === '全部') return systemStatusList
  const map: Record<string, string[]> = {
    '网络': ['intranet', 'wifi', 'overseas'],
    '服务器': ['erp', 'fileserver'],
    '打印机': ['printer-1f', 'printer-2f', 'printer-3f'],
  }
  const ids = map[activeCategory.value] ?? []
  return systemStatusList.filter(s => ids.includes(s.id))
})

function statusLabel(s: string) {
  if (s === 'online') return '正常'
  if (s === 'degraded') return '异常'
  return '离线'
}

function refresh() {
  lastUpdated.value = '刚刚'
}

// 生成 30 天历史数据（模拟）
const historyDays = Array.from({ length: 30 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() - (29 - i))
  const dateStr = `${d.getMonth() + 1}/${d.getDate()}`
  // 模拟：第8天和第18天有异常
  const status = i === 7 ? 'degraded' : i === 17 ? 'offline' : 'online'
  return { date: dateStr, status }
})

const recentEvents = [
  { id: 1, title: '3号楼打印机响应超时，已重启恢复', time: '2026-03-21 09:14', type: 'warn', typeLabel: '告警' },
  { id: 2, title: '核心交换机例行维护完成，网络恢复正常', time: '2026-03-18 24:00', type: 'resolve', typeLabel: '恢复' },
  { id: 3, title: '核心交换机例行维护，内网短暂中断约 15 分钟', time: '2026-03-18 22:00', type: 'maintain', typeLabel: '维护' },
  { id: 4, title: '2栋2F 新增 EPSON L15160 打印机，上线正常', time: '2026-03-10 10:30', type: 'info', typeLabel: '上线' },
  { id: 5, title: '软件下载中心上线，内网软件统一从门户下载', time: '2026-03-05 14:00', type: 'info', typeLabel: '上线' },
  { id: 6, title: '语雀 IT 知识库正式上线', time: '2026-03-20 09:00', type: 'info', typeLabel: '上线' },
]
</script>
