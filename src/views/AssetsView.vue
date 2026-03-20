<template>
  <div class="container">
    <div class="breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span>/</span>
      <span>IT 资产看板</span>
    </div>

    <div class="assets-page-head">
      <div>
        <h1 class="assets-title">IT 资产看板</h1>
        <p class="assets-desc">公司 IT 设备台账，共 {{ assetList.length }} 台设备</p>
      </div>
    </div>

    <!-- 汇总 -->
    <div class="assets-summary">
      <div v-for="s in summary" :key="s.label" class="asset-sum-card" :class="`asset-sum-${s.color}`">
        <div class="asset-sum-num">{{ s.count }}</div>
        <div class="asset-sum-label">{{ s.label }}</div>
      </div>
    </div>

    <!-- 筛选 -->
    <div class="assets-filter-row">
      <div class="assets-filter-group">
        <button
          v-for="t in typeFilters"
          :key="t.value"
          class="sw-filter-btn"
          :class="{ active: activeType === t.value }"
          @click="activeType = t.value"
        >{{ t.label }}</button>
      </div>
      <div class="assets-filter-group">
        <button
          v-for="s in statusFilters"
          :key="s.value"
          class="sw-filter-btn"
          :class="{ active: activeStatus === s.value }"
          @click="activeStatus = s.value"
        >{{ s.label }}</button>
      </div>
      <input v-model="searchQ" class="assets-search" placeholder="搜索设备名、人员、型号…" />
    </div>

    <!-- 表格 -->
    <div class="section-card assets-table-wrap">
      <table class="assets-table">
        <thead>
          <tr>
            <th>资产编号</th>
            <th>设备名称</th>
            <th>品牌 / 型号</th>
            <th>位置</th>
            <th>使用人</th>
            <th>部门</th>
            <th>购入年份</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filtered" :key="item.id" class="assets-row" @click="selected = item">
            <td class="asset-id">{{ item.id }}</td>
            <td>
              <div class="asset-name-cell">
                <span class="asset-type-icon">{{ typeIcon(item.type) }}</span>
                {{ item.name }}
              </div>
            </td>
            <td class="asset-model">{{ item.brand }} {{ item.model }}</td>
            <td>{{ item.location }}</td>
            <td>{{ item.assignedTo ?? '—' }}</td>
            <td>{{ item.department ?? '—' }}</td>
            <td>{{ item.purchaseYear }}</td>
            <td>
              <span class="asset-status-badge" :class="`asset-status-${item.status}`">
                {{ statusLabel(item.status) }}
              </span>
            </td>
          </tr>
          <tr v-if="filtered.length === 0">
            <td colspan="8" class="assets-empty">没有符合条件的设备</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 详情抽屉 -->
    <transition name="drawer-fade">
      <div v-if="selected" class="asset-drawer-overlay" @click.self="selected = null">
        <div class="asset-drawer">
          <div class="asset-drawer-head">
            <div>
              <div class="asset-drawer-id">{{ selected.id }}</div>
              <div class="asset-drawer-name">{{ selected.name }}</div>
            </div>
            <button class="asset-drawer-close" @click="selected = null">✕</button>
          </div>
          <div class="asset-drawer-body">
            <div class="asset-detail-grid">
              <div class="adg-item"><div class="adg-label">品牌</div><div class="adg-val">{{ selected.brand }}</div></div>
              <div class="adg-item"><div class="adg-label">型号</div><div class="adg-val">{{ selected.model }}</div></div>
              <div class="adg-item"><div class="adg-label">序列号</div><div class="adg-val mono">{{ selected.sn }}</div></div>
              <div class="adg-item"><div class="adg-label">位置</div><div class="adg-val">{{ selected.location }}</div></div>
              <div class="adg-item"><div class="adg-label">使用人</div><div class="adg-val">{{ selected.assignedTo ?? '未分配' }}</div></div>
              <div class="adg-item"><div class="adg-label">部门</div><div class="adg-val">{{ selected.department ?? '—' }}</div></div>
              <div class="adg-item"><div class="adg-label">购入年份</div><div class="adg-val">{{ selected.purchaseYear }}</div></div>
              <div class="adg-item"><div class="adg-label">IP 地址</div><div class="adg-val mono">{{ selected.ip ?? '—' }}</div></div>
            </div>
            <div v-if="selected.notes" class="asset-notes">
              <div class="adg-label">备注</div>
              <div class="asset-notes-text">{{ selected.notes }}</div>
            </div>
            <span class="asset-status-badge" :class="`asset-status-${selected.status}`" style="margin-top:8px;display:inline-flex;">
              {{ statusLabel(selected.status) }}
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { assetList, type AssetItem, type AssetType, type AssetStatus } from '../data/assets'

const activeType = ref('all')
const activeStatus = ref('all')
const searchQ = ref('')
const selected = ref<AssetItem | null>(null)

const typeFilters = [
  { value: 'all', label: '全部类型' },
  { value: 'desktop', label: '台式机' },
  { value: 'laptop', label: '笔记本' },
  { value: 'monitor', label: '显示器' },
  { value: 'printer', label: '打印机' },
  { value: 'network', label: '网络设备' },
]

const statusFilters = [
  { value: 'all', label: '全部状态' },
  { value: 'in-use', label: '使用中' },
  { value: 'idle', label: '闲置' },
  { value: 'repair', label: '维修中' },
  { value: 'retired', label: '已淘汰' },
]

const summary = computed(() => [
  { label: '使用中', count: assetList.filter(a => a.status === 'in-use').length, color: 'green' },
  { label: '闲置', count: assetList.filter(a => a.status === 'idle').length, color: 'blue' },
  { label: '维修中', count: assetList.filter(a => a.status === 'repair').length, color: 'yellow' },
  { label: '已淘汰', count: assetList.filter(a => a.status === 'retired').length, color: 'gray' },
])

const filtered = computed(() => {
  return assetList.filter(a => {
    const matchType = activeType.value === 'all' || a.type === activeType.value
    const matchStatus = activeStatus.value === 'all' || a.status === activeStatus.value
    const q = searchQ.value.toLowerCase()
    const matchQ = !q || [a.name, a.brand, a.model, a.assignedTo ?? '', a.location, a.id]
      .some(v => v.toLowerCase().includes(q))
    return matchType && matchStatus && matchQ
  })
})

function typeIcon(t: AssetType) {
  const map: Record<AssetType, string> = {
    desktop: '🖥️', laptop: '💻', monitor: '🖥️',
    printer: '🖨️', network: '🔌', other: '📦',
  }
  return map[t]
}

function statusLabel(s: AssetStatus) {
  const map: Record<AssetStatus, string> = {
    'in-use': '使用中', idle: '闲置', repair: '维修中', retired: '已淘汰',
  }
  return map[s]
}
</script>
