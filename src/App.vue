<template>
  <AppHeader @openSearch="searchOpen = true" />

  <RouterView />

  <AppFooter />

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

  <!-- 全局搜索弹窗 -->
  <transition name="search-modal-fade">
    <div v-if="searchOpen" class="search-modal-overlay" @click.self="searchOpen = false">
      <div class="search-modal">
        <SearchBar :autofocus="true" @close="searchOpen = false" />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toastState } from './composables/useClipboard'
import { useTheme } from './composables/useTheme'
import FloatContact from './components/FloatContact.vue'
import AiChat from './components/AiChat.vue'
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/layout/AppHeader.vue'
import SearchBar from './components/SearchBar.vue'

const { initTheme } = useTheme()
const searchOpen = ref(false)
onMounted(initTheme)
</script>
