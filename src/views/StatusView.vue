<template>
  <div class="container">
    <div class="breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span>/</span>
      <span>系统状态</span>
    </div>

    <div class="status-page-head">
      <div>
        <h1 class="status-page-title">系统状态看板</h1>
        <p class="status-page-desc">实时监控内网各系统与设备运行状态</p>
      </div>
      <div class="status-overall" :class="`status-overall-${overallStatus}`">
        <span class="status-overall-dot"></span>
        <span>{{ overallLabel }}</span>
      </div>
    </div>

    <!-- 汇总数字 -->
    <div class="status-summary-row">
      <div class="status-summary-card ssc-green">
        <div class="ssc-num green">{{ onlineCount }}</div>
        <div class="ssc-label">正常运行</div>
      </div>
      <div class="status-summary-card ssc-yellow">
        <div class="ssc-num yellow">{{ degradedCount }}</div>
        <div class="ssc-label">部分异常</div>
      </div>
      <div class="status-summary-card ssc-red">
        <div class="ssc-num red">{{ offlineCount }}</div>
        <div class="ssc-label">离线</div>
      </div>
      <div class="status-summary-card ssc-gray">
        <div class="ssc-num gray">{{ systemStatusList.length }}</div>
        <div class="ssc-label">监控项目</div>
      </div>
    </div>

    <!-- 状态列表 -->
    <div class="section-card">
      <div class="section-head">
        <div>
          <h2>各系统状态</h2>
          <div class="section-subtitle">最后更新：{{ lastUpdated }}</div>
        </div>
        <button class="btn-refresh" @click="refresh">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
          刷新
        </button>
      </div>
      <div class="status-list">
        <div v-for="item in systemStatusList" :key="item.id" class="status-row">
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
          <div class="section-subtitle">最近 7 天的系统事件记录</div>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { systemStatusList } from '../data/system-status'

const lastUpdated = ref('刚刚')

const onlineCount = computed(() => systemStatusList.filter(s => s.status === 'online').length)
const degradedCount = computed(() => systemStatusList.filter(s => s.status === 'degraded').length)
const offlineCount = computed(() => systemStatusList.filter(s => s.status === 'offline').length)

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

function statusLabel(s: string) {
  if (s === 'online') return '正常'
  if (s === 'degraded') return '异常'
  return '离线'
}

function refresh() {
  lastUpdated.value = '刚刚'
}

const recentEvents = [
  { id: 1, title: '3号楼打印机响应超时，已重启恢复', time: '2026-03-21 09:14', type: 'warn', typeLabel: '告警' },
  { id: 2, title: '核心交换机例行维护完成，网络恢复正常', time: '2026-03-18 24:00', type: 'resolve', typeLabel: '恢复' },
  { id: 3, title: '核心交换机例行维护，内网短暂中断约 15 分钟', time: '2026-03-18 22:00', type: 'maintain', typeLabel: '维护' },
  { id: 4, title: '2栋2F 新增 EPSON L15160 打印机，上线正常', time: '2026-03-10 10:30', type: 'info', typeLabel: '上线' },
]
</script>
