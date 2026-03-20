<template>
  <div class="container">
    <div class="breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span>/</span>
      <span>软件下载中心</span>
    </div>

    <div class="detail-header">
      <div>
        <h1>软件下载中心</h1>
        <p>常用办公软件、安全工具、远程协助工具下载入口。内网标识的软件请在公司网络环境下访问。</p>
      </div>
    </div>

    <!-- 分类筛选 -->
    <div class="sw-filter-row">
      <button
        v-for="cat in softwareCategories"
        :key="cat"
        class="sw-filter-btn"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = cat"
      >{{ cat }}</button>
    </div>

    <!-- 软件列表 -->
    <div class="sw-grid">
      <div v-for="item in filteredList" :key="item.id" class="sw-card">
        <div class="sw-card-top">
          <span class="sw-icon">{{ item.icon }}</span>
          <div class="sw-badges">
            <span v-if="item.recommended" class="sw-badge-rec">推荐</span>
            <span class="sw-badge-source" :class="item.source === 'intranet' ? 'intranet' : 'internet'">
              {{ item.source === 'intranet' ? '内网' : '外网' }}
            </span>
          </div>
        </div>
        <div class="sw-name">{{ item.name }}</div>
        <div class="sw-desc">{{ item.desc }}</div>
        <div class="sw-meta">
          <span v-if="item.version">v{{ item.version }}</span>
          <span v-if="item.size">{{ item.size }}</span>
          <span class="sw-cat-tag">{{ item.category }}</span>
        </div>
        <a :href="item.url" target="_blank" rel="noopener" class="sw-download-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          前往下载
        </a>
      </div>
    </div>

    <div class="sw-tip">
      <span>💡</span>
      <span>需要安装其他软件？通过企业微信联系 IT，说明软件名称和用途，由 IT 评估后协助处理。</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { softwareList, softwareCategories } from '../data/software'

const activeCategory = ref('全部')

const filteredList = computed(() =>
  activeCategory.value === '全部'
    ? softwareList
    : softwareList.filter(s => s.category === activeCategory.value)
)
</script>
