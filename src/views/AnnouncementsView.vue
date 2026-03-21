<template>
  <div class="container page-announcements">
    <div class="detail-header" style="border-left-color: #f59e0b;">
      <div>
        <h1>IT 公告</h1>
        <p>系统维护通知、设备更新、安全提醒等 IT 相关公告</p>
      </div>
    </div>

    <!-- 筛选 -->
    <div class="ann-filter-row">
      <button
        v-for="cat in categories"
        :key="cat.value"
        class="ann-filter-btn"
        :class="{ active: activeCategory === cat.value }"
        @click="activeCategory = cat.value"
      >
        <span>{{ cat.icon }}</span>
        <span>{{ cat.label }}</span>
      </button>
    </div>

    <!-- 置顶公告 -->
    <div v-if="pinnedList.length && activeCategory === 'all'" class="ann-pinned-section">
      <div class="ann-section-label">📌 置顶</div>
      <div class="ann-list">
        <div
          v-for="ann in pinnedList"
          :key="ann.id"
          class="ann-card ann-card-pinned"
          @click="openAnn(ann)"
        >
          <div class="ann-card-left">
            <span class="ann-tag" :class="`ann-tag-${ann.tagColor}`">{{ ann.tag }}</span>
            <span class="ann-pin-icon">📌</span>
          </div>
          <div class="ann-card-body">
            <div class="ann-card-title">{{ ann.title }}</div>
            <div class="ann-card-date">{{ ann.date }}</div>
          </div>
          <span class="ann-card-arrow">›</span>
        </div>
      </div>
    </div>

    <!-- 全部公告 -->
    <div class="ann-section-label" style="margin-top: 20px;">
      {{ activeCategory === 'all' ? '全部公告' : categories.find(c => c.value === activeCategory)?.label }}
      <span class="kb-count">{{ filteredList.length }} 条</span>
    </div>
    <div class="ann-list">
      <div
        v-for="ann in filteredList"
        :key="ann.id"
        class="ann-card"
        :class="{ 'ann-card-open': openId === ann.id }"
        @click="openId = openId === ann.id ? 0 : ann.id"
      >
        <div class="ann-card-left">
          <span class="ann-tag" :class="`ann-tag-${ann.tagColor}`">{{ ann.tag }}</span>
        </div>
        <div class="ann-card-body">
          <div class="ann-card-title">{{ ann.title }}</div>
          <div class="ann-card-date">{{ ann.date }}</div>
          <transition name="ob-expand">
            <div v-if="openId === ann.id && ann.content" class="ann-card-content">
              {{ ann.content }}
            </div>
          </transition>
        </div>
        <span class="ann-card-arrow" :class="{ open: openId === ann.id }">›</span>
      </div>
      <div v-if="filteredList.length === 0" class="kb-empty">
        <div class="kb-empty-icon">📭</div>
        <div>暂无该类型公告</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { announcements, type Announcement } from '../data/announcements'

const activeCategory = ref('all')
const openId = ref(0)
const selectedAnn = ref<Announcement | null>(null)

const categories = [
  { value: 'all',      icon: '📋', label: '全部' },
  { value: 'maintain', icon: '🔧', label: '维护通知' },
  { value: 'update',   icon: '🆕', label: '更新上线' },
  { value: 'notice',   icon: '📢', label: '通知提醒' },
  { value: 'alert',    icon: '⚠️', label: '故障告警' },
]

const pinnedList = computed(() => announcements.filter(a => a.pinned))

const filteredList = computed(() => {
  if (activeCategory.value === 'all') return announcements
  return announcements.filter(a => a.category === activeCategory.value)
})

function openAnn(ann: Announcement) {
  openId.value = openId.value === ann.id ? 0 : ann.id
}
</script>
