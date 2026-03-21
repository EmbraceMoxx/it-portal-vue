<template>
  <div class="container page-project">

    <div class="detail-header" style="border-left-color: #7c3aed;">
      <div>
        <h1>IT 项目进展看板</h1>
        <p>每周更新 · 当前周期：{{ REPORT_WEEK }} · 共 {{ projects.length }} 个项目</p>
      </div>
      <div class="proj-header-actions">
        <div class="proj-filter-row">
          <button
            v-for="cat in allCategories"
            :key="cat"
            class="proj-filter-btn"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = cat"
          >{{ cat }}</button>
        </div>
      </div>
    </div>

    <!-- 总览统计 -->
    <div class="proj-summary-row">
      <div class="proj-summary-card psc-blue">
        <div class="psc-num">{{ projects.length }}</div>
        <div class="psc-label">项目总数</div>
      </div>
      <div class="proj-summary-card psc-green">
        <div class="psc-num">{{ countByStatus('normal') }}</div>
        <div class="psc-label">正常推进</div>
      </div>
      <div class="proj-summary-card psc-yellow">
        <div class="psc-num">{{ countByStatus('warning') }}</div>
        <div class="psc-label">需关注</div>
      </div>
      <div class="proj-summary-card psc-red">
        <div class="psc-num">{{ countByStatus('blocked') }}</div>
        <div class="psc-label">阻塞</div>
      </div>
      <div class="proj-summary-card psc-gray">
        <div class="psc-num">{{ countByStatus('done') }}</div>
        <div class="psc-label">已完成</div>
      </div>
      <div class="proj-summary-card psc-purple">
        <div class="psc-num">{{ avgProgress }}%</div>
        <div class="psc-label">平均进度</div>
      </div>
    </div>

    <!-- 项目卡片网格 -->
    <div class="proj-grid">
      <div
        v-for="proj in filteredProjects"
        :key="proj.id"
        class="proj-card"
        :class="`proj-status-${proj.status}`"
        @click="openDetail(proj)"
      >
        <div class="proj-card-top">
          <div class="proj-tags">
            <span class="proj-phase-tag" :class="`phase-${proj.phase}`">{{ proj.phase }}</span>
            <span class="proj-cat-tag">{{ proj.category }}</span>
          </div>
          <span class="proj-status-dot" :class="`dot-${proj.status}`" :title="statusLabel(proj.status)"></span>
        </div>

        <h3 class="proj-name">{{ proj.name }}</h3>

        <div class="proj-progress-wrap">
          <div class="proj-progress-bar">
            <div class="proj-progress-fill" :class="`fill-${proj.status}`" :style="{ width: proj.progress + '%' }"></div>
          </div>
          <span class="proj-progress-num">{{ proj.progress }}%</span>
        </div>

        <div class="proj-section">
          <div class="proj-section-label">✅ 本周完成</div>
          <ul class="proj-list">
            <li v-for="item in proj.thisWeek" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div class="proj-section">
          <div class="proj-section-label">📅 下周计划</div>
          <ul class="proj-list">
            <li v-for="item in proj.nextWeek" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div v-if="proj.risk" class="proj-risk">
          <span>⚠️</span>
          <span>{{ proj.risk }}</span>
        </div>

        <div class="proj-card-footer">
          <span class="proj-owner">👤 {{ proj.owner }}</span>
          <span class="proj-date">{{ proj.updatedAt }}</span>
        </div>
      </div>
    </div>

    <!-- 历史周报归档 -->
    <div class="section-card proj-archive">
      <div class="section-head">
        <div>
          <h2>历史周报归档</h2>
          <div class="section-subtitle">每周汇报快照记录</div>
        </div>
      </div>
      <div class="archive-list">
        <div
          v-for="snap in weeklyArchive"
          :key="snap.week"
          class="archive-item"
          :class="{ open: openArchive === snap.week }"
          @click="openArchive = openArchive === snap.week ? '' : snap.week"
        >
          <div class="archive-item-head">
            <span class="archive-week">📋 {{ snap.week }} 周报</span>
            <span class="archive-summary">{{ snap.summary }}</span>
            <span class="archive-chevron">{{ openArchive === snap.week ? '▲' : '▼' }}</span>
          </div>
          <div v-if="openArchive === snap.week" class="archive-body">
            <ul>
              <li v-for="h in snap.highlights" :key="h">{{ h }}</li>
            </ul>
          </div>
        </div>
        <div v-if="weeklyArchive.length === 0" class="archive-empty">暂无历史记录</div>
      </div>
    </div>

    <!-- 详情抽屉 -->
    <transition name="drawer-fade">
      <div v-if="selectedProject" class="proj-drawer-overlay" @click.self="selectedProject = null">
        <div class="proj-drawer">
          <div class="proj-drawer-head">
            <div>
              <div class="proj-drawer-tags">
                <span class="proj-phase-tag" :class="`phase-${selectedProject.phase}`">{{ selectedProject.phase }}</span>
                <span class="proj-cat-tag">{{ selectedProject.category }}</span>
                <span class="proj-status-badge" :class="`badge-${selectedProject.status}`">{{ statusLabel(selectedProject.status) }}</span>
              </div>
              <div class="proj-drawer-name">{{ selectedProject.name }}</div>
            </div>
            <button class="proj-drawer-close" @click="selectedProject = null">✕</button>
          </div>
          <div class="proj-drawer-body">
            <p v-if="selectedProject.desc" class="proj-drawer-desc">{{ selectedProject.desc }}</p>

            <div class="proj-drawer-section">
              <div class="proj-drawer-label">项目进度</div>
              <div class="proj-progress-wrap" style="margin-top: 8px;">
                <div class="proj-progress-bar proj-progress-bar-lg">
                  <div class="proj-progress-fill" :class="`fill-${selectedProject.status}`" :style="{ width: selectedProject.progress + '%' }"></div>
                </div>
                <span class="proj-progress-num">{{ selectedProject.progress }}%</span>
              </div>
            </div>

            <div class="proj-drawer-grid">
              <div class="proj-drawer-item">
                <div class="proj-drawer-label">负责人</div>
                <div class="proj-drawer-val">{{ selectedProject.owner }}</div>
              </div>
              <div class="proj-drawer-item">
                <div class="proj-drawer-label">启动日期</div>
                <div class="proj-drawer-val">{{ selectedProject.startDate }}</div>
              </div>
              <div class="proj-drawer-item">
                <div class="proj-drawer-label">最后更新</div>
                <div class="proj-drawer-val">{{ selectedProject.updatedAt }}</div>
              </div>
              <div class="proj-drawer-item">
                <div class="proj-drawer-label">当前阶段</div>
                <div class="proj-drawer-val">{{ selectedProject.phase }}</div>
              </div>
            </div>

            <div class="proj-drawer-section">
              <div class="proj-drawer-label">✅ 本周完成</div>
              <ul class="proj-drawer-list">
                <li v-for="item in selectedProject.thisWeek" :key="item">{{ item }}</li>
              </ul>
            </div>

            <div class="proj-drawer-section">
              <div class="proj-drawer-label">📅 下周计划</div>
              <ul class="proj-drawer-list">
                <li v-for="item in selectedProject.nextWeek" :key="item">{{ item }}</li>
              </ul>
            </div>

            <div v-if="selectedProject.risk" class="proj-drawer-risk">
              <span>⚠️</span>
              <span>{{ selectedProject.risk }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { projects, weeklyArchive, REPORT_WEEK, type Project, type ProjectStatus } from '../data/projects'

const activeCategory = ref('全部')
const openArchive = ref('')
const selectedProject = ref<Project | null>(null)

const allCategories = computed(() => ['全部', ...new Set(projects.map(p => p.category))])

const filteredProjects = computed(() =>
  activeCategory.value === '全部' ? projects : projects.filter(p => p.category === activeCategory.value)
)

const countByStatus = (s: ProjectStatus) => projects.filter(p => p.status === s).length

const avgProgress = computed(() => {
  if (!projects.length) return 0
  return Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
})

function statusLabel(s: ProjectStatus) {
  const map: Record<ProjectStatus, string> = { normal: '正常', warning: '需关注', blocked: '阻塞', done: '已完成' }
  return map[s]
}

function openDetail(proj: Project) {
  selectedProject.value = proj
}
</script>
