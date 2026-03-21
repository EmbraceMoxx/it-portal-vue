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

    <!-- 文章详情模态（大窗口，左右图文布局） -->
    <transition name="kb-modal-fade">
      <div v-if="selectedArticle" class="kb-modal-overlay" @click.self="selectedArticle = null">
        <div class="kb-modal">

          <!-- 左侧目录 -->
          <aside class="kb-modal-sidebar">
            <div class="kb-modal-sidebar-head">
              <span class="kb-drawer-cat">{{ selectedArticle.category }}</span>
            </div>
            <div class="kb-modal-sidebar-title">
              {{ selectedArticle.icon }} {{ selectedArticle.title }}
            </div>
            <nav class="kb-modal-toc">
              <button
                v-for="(step, i) in activeSteps"
                :key="i"
                class="kb-toc-item"
                :class="{ active: tocActive === i }"
                @click="scrollToStep(i)"
              >
                <span class="kb-toc-num">{{ i + 1 }}</span>
                <span class="kb-toc-label">{{ step.title }}</span>
              </button>
            </nav>
            <div class="kb-modal-sidebar-footer">
              <div class="kb-drawer-date">更新于 {{ selectedArticle.updatedAt }}</div>
              <div v-if="selectedArticle.views" class="kb-drawer-date">{{ selectedArticle.views }} 次查看</div>
            </div>
          </aside>

          <!-- 右侧内容 -->
          <div class="kb-modal-content" ref="contentRef">
            <!-- 顶部栏 -->
            <div class="kb-modal-head">
              <div>
                <h2 class="kb-modal-title">{{ selectedArticle.title }}</h2>
                <p class="kb-modal-subtitle">{{ selectedArticle.desc }}</p>
              </div>
              <button class="kb-drawer-close" @click="selectedArticle = null">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <!-- 标签 -->
            <div class="kb-modal-tags">
              <span v-for="tag in selectedArticle.tags" :key="tag" class="kb-article-tag">{{ tag }}</span>
            </div>

            <!-- 富文本（接入语雀后使用） -->
            <div v-if="selectedArticle.body" class="kb-modal-richtext" v-html="selectedArticle.body"></div>

            <!-- 图文步骤 -->
            <div v-else class="kb-modal-steps">
              <div
                v-for="(step, i) in activeSteps"
                :key="i"
                class="kb-step-block"
                :ref="(el) => { if (el) stepRefs[i] = el as HTMLElement }"
              >
                <div class="kb-step-header">
                  <span class="kb-step-num">{{ i + 1 }}</span>
                  <h3 class="kb-step-title">{{ step.title }}</h3>
                </div>
                <div class="kb-step-body">
                  <p class="kb-step-text" v-html="formatStepBody(step.body)"></p>
                  <img
                    v-if="step.image"
                    :src="step.image"
                    :alt="step.title"
                    class="kb-step-image"
                    loading="lazy"
                  />
                  <div v-if="step.tip" class="kb-step-tip" :class="`kb-tip-${step.tipType ?? 'info'}`">
                    <span class="kb-tip-icon">{{ tipIcon(step.tipType) }}</span>
                    <span>{{ step.tip }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 底部 -->
            <div class="kb-modal-footer">
              <span class="kb-modal-footer-text">还有问题？</span>
              <RouterLink to="/ticket" class="kb-drawer-ticket-link" @click="selectedArticle = null">提交工单 →</RouterLink>
              <a
                v-if="selectedArticle.sourceUrl"
                :href="selectedArticle.sourceUrl"
                target="_blank"
                rel="noopener"
                class="kb-drawer-ticket-link"
                style="margin-left: auto;"
              >在语雀中查看 ↗</a>
            </div>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { kbArticles, kbCategories, type KbArticle, type KbStep } from '../data/kb'

const searchQ = ref('')
const activeCategory = ref('全部')
const activePage = ref(1)
const selectedArticle = ref<KbArticle | null>(null)
const tocActive = ref(0)
const stepRefs = ref<HTMLElement[]>([])
const contentRef = ref<HTMLElement | null>(null)
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

/** 当前文章步骤（优先 steps，降级 content 转换） */
const activeSteps = computed<KbStep[]>(() => {
  if (!selectedArticle.value) return []
  if (selectedArticle.value.steps?.length) return selectedArticle.value.steps
  return selectedArticle.value.content.map(c => ({ title: c.slice(0, 24), body: c }))
})

watch(selectedArticle, () => {
  tocActive.value = 0
  stepRefs.value = []
})

function scrollToStep(i: number) {
  tocActive.value = i
  const el = stepRefs.value[i]
  if (el && contentRef.value) {
    const top = el.offsetTop - 20
    contentRef.value.scrollTo({ top, behavior: 'smooth' })
  }
}

function formatStepBody(text: string) {
  return text
    .replace(/\n/g, '<br>')
    .replace(/`([^`]+)`/g, '<code class="kb-inline-code">$1</code>')
}

function tipIcon(type?: string) {
  if (type === 'warning') return '⚠️'
  if (type === 'success') return '✅'
  return 'ℹ️'
}

function highlight(text: string) {
  if (!searchQ.value.trim()) return text
  const q = searchQ.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.replace(new RegExp(q, 'gi'), m => `<mark class="search-mark">${m}</mark>`)
}

function openArticle(art: KbArticle) {
  selectedArticle.value = art
}
</script>
