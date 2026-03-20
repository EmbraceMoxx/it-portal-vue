<template>
  <div class="search-wrap" ref="wrapRef">
    <div class="search-input-row">
      <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input
        v-model="query"
        class="search-input"
        placeholder="搜索常见问题、功能入口…"
        @focus="showResults = true"
        @keydown.escape="showResults = false"
        @keydown.enter="goFirst"
      />
      <button v-if="query" class="search-clear" @click="query = ''; showResults = false">✕</button>
    </div>

    <transition name="search-drop">
      <div v-if="showResults && query.length > 0" class="search-results">
        <div v-if="results.length === 0" class="search-empty">没有找到相关内容</div>
        <template v-else>
          <div
            v-for="item in results"
            :key="item.id"
            class="search-result-item"
            @click="navigate(item)"
          >
            <span class="sr-icon">{{ item.icon }}</span>
            <div class="sr-body">
              <div class="sr-title" v-html="highlight(item.title)"></div>
              <div class="sr-desc">{{ item.desc }}</div>
            </div>
            <span class="sr-tag">{{ item.tag }}</span>
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { faqItems } from '../data/faq'

const router = useRouter()
const query = ref('')
const showResults = ref(false)
const wrapRef = ref<HTMLElement | null>(null)

interface SearchEntry {
  id: string
  title: string
  desc: string
  icon: string
  tag: string
  to: string
}

const searchIndex: SearchEntry[] = [
  { id: 'printer', title: '打印机安装', desc: '驱动安装、共享盘连接步骤', icon: '🖨️', tag: '功能', to: '/printer' },
  { id: 'network', title: '办公网络接入', desc: '有线网络、无线网络配置', icon: '🌐', tag: '功能', to: '/network' },
  { id: 'overseas', title: '海外网络', desc: '代理客户端、节点配置', icon: '🚀', tag: '功能', to: '/overseas-network' },
  { id: 'erp', title: 'ERP 入口', desc: '金蝶系统登录与使用', icon: '📦', tag: '功能', to: '/erp' },
  { id: 'software', title: '软件下载中心', desc: '常用软件安装入口', icon: '💿', tag: '功能', to: '/software' },
  { id: 'status', title: '系统状态看板', desc: '查看各系统运行状态', icon: '📊', tag: '功能', to: '/status' },
  { id: 'ticket', title: '提交 IT 工单', desc: '报告问题，IT 跟进处理', icon: '📋', tag: '功能', to: '/ticket' },
  ...faqItems.map((f, i) => ({
    id: `faq-${i}`,
    title: f.q,
    desc: f.a.slice(0, 40) + '…',
    icon: '❓',
    tag: '故障自查',
    to: '/#faq',
  })),
]

const results = computed(() => {
  if (!query.value.trim()) return []
  const q = query.value.toLowerCase()
  return searchIndex.filter(
    item => item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
  ).slice(0, 8)
})

function highlight(text: string) {
  if (!query.value) return text
  const escaped = query.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.replace(new RegExp(escaped, 'gi'), m => `<mark class="search-mark">${m}</mark>`)
}

function navigate(item: SearchEntry) {
  router.push(item.to)
  showResults.value = false
  query.value = ''
}

function goFirst() {
  if (results.value.length > 0) navigate(results.value[0])
}

function onClickOutside(e: MouseEvent) {
  if (wrapRef.value && !wrapRef.value.contains(e.target as Node)) {
    showResults.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))
</script>
