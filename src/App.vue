<template>
  <!-- IT 公告 Ticker -->
  <div class="ticker-wrap">
    <div class="ticker-label">📢 公告</div>
    <div class="ticker-track">
      <div class="ticker-inner" :style="{ animationDuration: `${announcements.length * 8}s` }">
        <span v-for="(item, i) in [...announcements, ...announcements]" :key="`${item.id}-${i}`" class="ticker-item">
          <span class="ticker-tag" :class="`ticker-tag-${item.tagColor}`">{{ item.tag }}</span>
          {{ item.title }}
          <span class="ticker-sep">·</span>
        </span>
      </div>
    </div>
    <!-- 暗色模式切换 -->
    <button class="theme-toggle" @click="toggleTheme" :title="isDark ? '切换亮色模式' : '切换暗色模式'">
      <span v-if="isDark">☀️</span>
      <span v-else>🌙</span>
    </button>
  </div>

  <RouterView />

  <!-- 悬浮按钮组 -->
  <div class="float-group">
    <AiChat />
    <FloatContact />
  </div>

  <!-- Toast -->
  <transition name="top-toast-fade">
    <div v-if="toastState.visible" class="top-toast">
      {{ toastState.message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { toastState } from './composables/useClipboard'
import { useTheme } from './composables/useTheme'
import FloatContact from './components/FloatContact.vue'
import AiChat from './components/AiChat.vue'
import { announcements } from './data/announcements'

const { isDark, toggleTheme, initTheme } = useTheme()
onMounted(initTheme)
</script>
