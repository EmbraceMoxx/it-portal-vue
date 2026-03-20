<template>
  <!-- IT 公告 Ticker -->
  <div class="ticker-wrap">
    <div class="ticker-label">📢 公告</div>
    <div class="ticker-track">
      <div class="ticker-inner" :style="{ animationDuration: `${announcements.length * 8}s` }">
        <span v-for="item in [...announcements, ...announcements]" :key="item.id + Math.random()" class="ticker-item">
          <span class="ticker-tag" :class="`ticker-tag-${item.tagColor}`">{{ item.tag }}</span>
          {{ item.title }}
          <span class="ticker-sep">·</span>
        </span>
      </div>
    </div>
  </div>

  <RouterView />

  <!-- 悬浮联系 IT -->
  <FloatContact />

  <!-- Toast -->
  <transition name="top-toast-fade">
    <div v-if="toastState.visible" class="top-toast">
      {{ toastState.message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { toastState } from './composables/useClipboard'
import FloatContact from './components/FloatContact.vue'
import { announcements } from './data/announcements'
</script>
