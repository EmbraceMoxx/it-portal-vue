<template>
  <div class="container page-kb">
    <div class="detail-header" style="border-left-color: #8b5cf6;">
      <div>
        <h1>IT 知识库</h1>
        <p>{{ kbArticles.length }} 篇文档 · 覆盖网络、打印机、账号、软件等常见问题</p>
      </div>
    </div>

    <!-- 搜索 + 筛选 -->
    <div class="kb-toolbar">
      <div class="kb-search-wrap">
        <svg class="kb-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          v-model="searchQ"
          class="kb-search-input"
          placeholder="搜索文档标题、标签..."
          @input="activePage = 1"
        />
        <button v-if="searchQ" class="kb-search-clear" @click="searchQ = ''">✕</button>
      </div>
      <div class="kb-cats">
        <button
          v-for="cat in kbCategories"
          :key="cat"
          class="kb-cat-btn"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat; activePage = 1"
        >{{ cat }}</button>
      </div>
    </div>

    <!-- 热门文章 -->
    <div v-if="!searchQ && activeCategory === '全部'" class="kb-hot-section">
      <div class="kb-section-label">🔥 热门文档</div>
      <div class="kb-hot-grid">
        <div
          v-for="art in hotArticles"
          :key="art.id"
          class="kb-hot-card"
          @click="openArticle(art)"
        >
          <span class="kb-hot-icon">{{ art.icon }}</span>
          <div class="kb-hot-body">
            <div class="kb-hot-title">{{ art.title }}</div>
            <div class="kb-hot-meta">{{ art.category }} · {{ art.views }} 次查看</div>
          </div>
          <span class="kb-hot-arrow">›</span>
        </div>
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="kb-list-section">
      <div class="kb-section-label">
        {{ searchQ ? `搜索"${searchQ}"的结果` : activeCategory === '全部' ? '全部文档' : activeCategory }}
        <span class="kb-count">{{ filteredArticles.length }} 篇</span>
      </div>

      <div v-if="filteredArticles.length === 0" class="kb-empty">
        <div class="kb-empty-icon">🔍</div>
        <div>没有找到相关文档</div>
        <RouterLink to="/ticket" class="kb-empty-link">提交工单让 IT 帮你解决 →</RouterLink>
      </div>

      <div class="kb-article-list">
        <div
          v-for="art in pagedArticles"
          :key="art.id"
          class="kb-article-card"
          @click="openArticle(art)"
        >
          <div class="kb-article-left">
            <span class="kb-article-icon">{{ art.icon }}</span>
          </div>
          <div class="kb-article-body">
            <div class="kb-article-title" v-html="highlight(art.title)"></div>
            <div class="kb-article-desc">{{ art.desc }}</div>
            <div class="kb-article-meta">
              <span class="kb-article-cat">{{ art.category }}</span>
              <span v-for="tag in art.tags.slice(0,3)" :key="tag" class="kb-article-tag">{{ tag }}</span>
              <span class="kb-article-date">更新于 {{ art.updatedAt }}</span>
            </div>
          </div>
          <div class="kb-article-right">
            <span class="kb-article-views">{{ art.views }} 次</span>
            <span class="kb-article-arrow">›</span>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="kb-pagination">
        <button
          v-for="p in totalPages"
          :key="p"
          class="kb-page-btn"
          :class="{ active: activePage === p }"
          @click="activePage = p"
        >{{ p }}</button>
      </div>
    </div>

    <!-- 文章详情弹窗 -->
    <transition name="drawer-fade">
      <div v-if="selectedArticle" class="kb-drawer-overlay" @click.self="selectedArticle = null">
        <div class="kb-drawer">
          <div class="kb-drawer-head">
            <div class="kb-drawer-meta">
              <span class="kb-drawer-cat">{{ selectedArticle.category }}</span>
              <span class="kb-drawer-date">更新于 {{ selectedArticle.updatedAt }}</span>
            </div>
            <button class="kb-drawer-close" @click="selectedArticle = null">✕</button>
          </div>
          <div class="kb-drawer-body">
            <div class="kb-drawer-icon">{{ selectedArticle.icon }}</div>
            <h2 class="kb-drawer-title">{{ selectedArticle.title }}</h2>
            <p class="kb-drawer-desc">{{ selectedArticle.desc }}</p>
            <div class="kb-drawer-tags">
              <span v-for="tag in selectedArticle.tags" :key="tag" class="kb-article-tag">{{ tag }}</span>
            </div>
            <div class="kb-drawer-steps">
              <div class="kb-drawer-steps-label">操作步骤</div>
              <div v-for="(step, i) in selectedArticle.content" :key="i" class="kb-drawer-step">
                <span class="kb-drawer-step-num">{{ i + 1 }}</span>
                <span class="kb-drawer-step-text">{{ step }}</span>
              </div>
            </div>
            <div class="kb-drawer-footer">
              <span>还有问题？</span>
              <RouterLink to="/ticket" class="kb-drawer-ticket-link" @click="selectedArticle = null">提交工单 →</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { kbArticles, kbCategories, type KbArticle } from '../data/kb'

const searchQ = ref('')
const activeCategory = ref('全部')
const activePage = ref(1)
const selectedArticle = ref<KbArticle | null>(null)
const PAGE_SIZE = 8

const hotArticles = computed(() =>
  [...kbArticles].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 4)
)

const filteredArticles = computed(() => {
  let list = kbArticles
  if (activeCategory.value !== '全部') {
    list = list.filter(a => a.category === activeCategory.value)
  }
  if (searchQ.value.trim()) {
    const q = searchQ.value.toLowerCase()
    list = list.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.desc.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    )
  }
  return list
})

const totalPages = computed(() => Math.ceil(filteredArticles.value.length / PAGE_SIZE))

const pagedArticles = computed(() => {
  const start = (activePage.value - 1) * PAGE_SIZE
  return filteredArticles.value.slice(start, start + PAGE_SIZE)
})

function highlight(text: string) {
  if (!searchQ.value.trim()) return text
  const q = searchQ.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.replace(new RegExp(q, 'gi'), m => `<mark class="search-mark">${m}</mark>`)
}

function openArticle(art: KbArticle) {
  selectedArticle.value = art
}
</script>
