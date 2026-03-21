<template>
  <header class="app-header">
    <div class="app-header-inner">
      <!-- Logo -->
      <RouterLink to="/" class="app-logo">
        <span class="app-logo-icon">🛡️</span>
        <div class="app-logo-text">
          <span class="app-logo-name">水卫士 IT</span>
          <span class="app-logo-sub">服务门户</span>
        </div>
      </RouterLink>

      <!-- 主导航 -->
      <nav class="app-nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="app-nav-item"
          :class="{ active: isActive(item.to) }"
        >
          <span class="app-nav-icon">{{ item.icon }}</span>
          <span class="app-nav-label">{{ item.label }}</span>
        </RouterLink>
      </nav>

      <!-- 右侧工具栏 -->
      <div class="app-header-right">
        <!-- 搜索触发 -->
        <button class="header-tool-btn" @click="$emit('openSearch')" title="搜索">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
        <!-- 公告 -->
        <RouterLink to="/announcements" class="header-tool-btn" title="公告">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span v-if="unreadCount > 0" class="header-badge">{{ unreadCount }}</span>
        </RouterLink>
        <!-- 暗色模式 -->
        <button class="header-tool-btn" @click="toggleTheme" :title="isDark ? '切换亮色' : '切换暗色'">
          <span v-if="isDark">☀️</span>
          <span v-else>🌙</span>
        </button>
        <!-- 工单快捷 -->
        <RouterLink to="/ticket" class="header-ticket-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
          </svg>
          提交工单
        </RouterLink>
      </div>

      <!-- 移动端汉堡 -->
      <button class="app-menu-btn" @click="mobileOpen = !mobileOpen">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- 移动端菜单 -->
    <transition name="mobile-menu">
      <div v-if="mobileOpen" class="app-mobile-menu">
        <RouterLink
          v-for="item in allNavItems"
          :key="item.to"
          :to="item.to"
          class="mobile-nav-item"
          @click="mobileOpen = false"
        >
          <span>{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </RouterLink>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '../../composables/useTheme'
import { announcements } from '../../data/announcements'

defineEmits(['openSearch'])

const route = useRoute()
const { isDark, toggleTheme } = useTheme()
const mobileOpen = ref(false)
const unreadCount = announcements.length

const navItems = [
  { to: '/',         icon: '🏠', label: '首页' },
  { to: '/printer',  icon: '🖨️', label: '打印机' },
  { to: '/network',  icon: '🌐', label: '网络' },
  { to: '/software', icon: '💽', label: '软件' },
  { to: '/kb',       icon: '📚', label: '知识库' },
]

const allNavItems = [
  ...navItems,
  { to: '/onboarding',    icon: '🎉', label: '入职引导' },
  { to: '/kb',            icon: '📚', label: '知识库' },
  { to: '/announcements', icon: '📢', label: '公告' },
  { to: '/meeting',       icon: '📽️', label: '会议室' },
  { to: '/scan',          icon: '📠', label: '扫描' },
  { to: '/ticket',        icon: '📋', label: '工单' },
]

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}
</script>
