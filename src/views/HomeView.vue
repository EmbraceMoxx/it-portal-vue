<template>
  <div>
    <!-- Hero 全宽 -->
    <div class="hero-wrap">
      <div class="hw-inner">
        <div class="hw-left">
          <div class="hw-badge">水卫士 IT 内网服务门户</div>
          <h1 class="hw-title">水卫士<br><span class="hw-title-accent">IT 服务门户</span></h1>
          <p class="hw-desc">打印机安装 · 网络接入 · ERP 系统 · 常用软件<br>在这里找到入口和操作说明</p>
          <SearchBar class="hw-search" />
        </div>
        <div class="hw-nav">
          <RouterLink class="hw-nav-item" to="/printer">
            <span class="hw-nav-icon">🖨️</span>
            <span class="hw-nav-label">打印机安装</span>
          </RouterLink>
          <RouterLink class="hw-nav-item" to="/network">
            <span class="hw-nav-icon">🌐</span>
            <span class="hw-nav-label">办公网络</span>
          </RouterLink>
          <RouterLink class="hw-nav-item" to="/overseas-network">
            <span class="hw-nav-icon">🚀</span>
            <span class="hw-nav-label">海外网络</span>
          </RouterLink>
          <RouterLink class="hw-nav-item" to="/ticket">
            <span class="hw-nav-icon">📋</span>
            <span class="hw-nav-label">提交工单</span>
          </RouterLink>
          <RouterLink class="hw-nav-item" to="/kb">
            <span class="hw-nav-icon">📚</span>
            <span class="hw-nav-label">知识库</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="container">

      <!-- 今日 IT 状态条 -->
      <div class="today-status-bar">
        <div class="tsb-left">
          <span class="tsb-date">{{ todayStr }}</span>
          <span class="tsb-clock">{{ clockStr }}</span>
          <div class="tsb-divider"></div>
          <span class="tsb-status-dot online"></span>
          <span class="tsb-status-text">IT 服务正常运行</span>
        </div>
        <div class="tsb-right">
          <RouterLink to="/ticket" class="tsb-stat">
            <span class="tsb-stat-num blue">1</span>
            <span class="tsb-stat-label">处理中工单</span>
          </RouterLink>
          <div class="tsb-stat-sep"></div>
          <RouterLink to="/announcements" class="tsb-stat">
            <span class="tsb-stat-num blue">{{ announcements.length }}</span>
            <span class="tsb-stat-label">条公告</span>
          </RouterLink>
        </div>
      </div>

      <!-- IT 支持联系 -->
      <section class="section-card it-support-card">
        <div class="section-head" style="margin-bottom: 20px;">
          <div>
            <h2>联系 IT 支持</h2>
            <div class="section-subtitle">通过企业微信联系，工作时间内快速响应</div>
          </div>
          <RouterLink to="/ticket" class="btn-primary-sm">📋 提交工单</RouterLink>
        </div>
        <div class="it-support-grid">
          <div class="it-support-group it-bg">
            <div class="it-support-scope">💻 电脑 · 网络 · 打印机</div>
            <div class="it-support-people">
              <div class="it-support-person">
                <div class="it-av it">黎</div>
                <div>
                  <div class="it-name">黎灿</div>
                  <div class="it-role">IT 运维工程师</div>
                </div>
              </div>
              <div class="it-support-person">
                <div class="it-av it">曹</div>
                <div>
                  <div class="it-name">曹杰珲</div>
                  <div class="it-role">IT 运维工程师</div>
                </div>
              </div>
            </div>
            <div class="it-support-tip">企业微信搜索姓名发起会话</div>
          </div>
          <div class="it-support-group erp-bg">
            <div class="it-support-scope">📦 金蝶 ERP 系统</div>
            <div class="it-support-people">
              <div class="it-support-person">
                <div class="it-av erp">王</div>
                <div>
                  <div class="it-name">王文林</div>
                  <div class="it-role">ERP 系统管理员</div>
                </div>
              </div>
            </div>
            <div class="it-support-tip">账号开通、权限申请、系统问题</div>
          </div>
          <div class="it-support-group ticket-bg">
            <div class="it-support-scope">📋 提交工单</div>
            <div class="it-support-ticket-desc">
              问题记录在案，IT 跟进处理，适合非紧急问题或需要留存记录的情况。
            </div>
            <RouterLink to="/ticket" class="it-support-ticket-btn">去提交工单 →</RouterLink>
          </div>
        </div>
      </section>

      <!-- 服务模块 -->
      <section class="module-grid">
        <ModuleCard v-for="item in displayModules" :key="item.key" :item="item" />
      </section>

      <!-- 新功能入口横排 -->
      <div class="home-feature-row">
        <RouterLink to="/onboarding" class="home-feature-card hfc-green">
          <span class="hfc-icon">🎉</span>
          <div class="hfc-body">
            <div class="hfc-title">新员工入职引导</div>
            <div class="hfc-desc">分步骤完成 IT 配置，进度自动保存</div>
          </div>
          <span class="hfc-arrow">›</span>
        </RouterLink>
        <RouterLink to="/kb" class="home-feature-card hfc-purple">
          <span class="hfc-icon">📚</span>
          <div class="hfc-body">
            <div class="hfc-title">IT 知识库</div>
            <div class="hfc-desc">{{ kbArticles.length }} 篇文档，常见问题自助解决</div>
          </div>
          <span class="hfc-arrow">›</span>
        </RouterLink>
        <RouterLink to="/announcements" class="home-feature-card hfc-amber">
          <span class="hfc-icon">📢</span>
          <div class="hfc-body">
            <div class="hfc-title">IT 公告</div>
            <div class="hfc-desc">维护通知、设备更新、安全提醒</div>
          </div>
          <span class="hfc-arrow">›</span>
        </RouterLink>
        <RouterLink to="/announcements" class="home-feature-card hfc-teal">
          <span class="hfc-icon">📢</span>
          <div class="hfc-body">
            <div class="hfc-title">IT 公告</div>
            <div class="hfc-desc">维护通知、设备更新、安全提醒</div>
          </div>
          <span class="hfc-arrow">›</span>
        </RouterLink>
      </div>

      <!-- 最新公告 -->
      <div class="home-two-grid" style="margin-top: 0;">
        <section class="section-card">
          <div class="section-head">
            <div>
              <h2>最新公告</h2>
              <div class="section-subtitle">IT 通知与维护信息</div>
            </div>
            <RouterLink to="/announcements" class="btn-link">查看全部 →</RouterLink>
          </div>
          <div class="announce-list">
            <div v-for="ann in announcements.slice(0,4)" :key="ann.id" class="announce-item">
              <span class="announce-tag" :class="`announce-tag-${ann.tagColor}`">{{ ann.tag }}</span>
              <span class="announce-title">{{ ann.title }}</span>
              <span class="announce-date">{{ ann.date }}</span>
            </div>
          </div>
        </section>

        <!-- 知识库热门 -->
        <section class="section-card">
          <div class="section-head">
            <div>
              <h2>热门文档</h2>
              <div class="section-subtitle">最常查阅的知识库文章</div>
            </div>
            <RouterLink to="/kb" class="btn-link">知识库 →</RouterLink>
          </div>
          <div class="home-proj-list">
            <div v-for="art in hotKbArticles" :key="art.id" class="yuque-item" style="cursor:pointer;" @click="$router.push('/kb')">
              <span class="yuque-icon">{{ art.icon }}</span>
              <div>
                <div class="yuque-label">{{ art.title }}</div>
                <div class="yuque-desc">{{ art.views }} 次查看 · {{ art.category }}</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 入职清单 + 账号申请 -->
      <div class="home-two-grid">
        <section class="section-card">
          <h2 class="bottom-card-title">新员工 IT 入职清单</h2>
          <p class="bottom-card-sub">入职第一天需要完成的 IT 配置</p>
          <div class="onboard-list">
            <div v-for="item in onboardingItems" :key="item.step" class="onboard-item">
              <div class="onboard-step">{{ item.step }}</div>
              <span class="onboard-icon">{{ item.icon }}</span>
              <div>
                <div class="onboard-title">{{ item.title }}</div>
                <div class="onboard-desc">{{ item.desc }}</div>
              </div>
            </div>
          </div>
          <RouterLink to="/onboarding" class="home-onboard-link">查看完整入职引导 →</RouterLink>
        </section>
        <section class="section-card">
          <h2 class="bottom-card-title">账号 &amp; 权限申请</h2>
          <p class="bottom-card-sub">通过企业微信联系 IT 处理</p>
          <div class="apply-grid">
            <div class="apply-item"><div class="apply-icon">👤</div><div><div class="apply-label">新员工账号开通</div><div class="apply-desc">Windows 登录账号、内网权限</div></div></div>
            <div class="apply-item"><div class="apply-icon">📧</div><div><div class="apply-label">企业邮箱申请</div><div class="apply-desc">公司邮箱开通与配置</div></div></div>
            <div class="apply-item"><div class="apply-icon">📦</div><div><div class="apply-label">ERP 账号 &amp; 权限</div><div class="apply-desc">金蝶系统账号开通、模块权限</div></div></div>
            <div class="apply-item"><div class="apply-icon">💿</div><div><div class="apply-label">软件安装申请</div><div class="apply-desc">需要安装特定软件时联系 IT</div></div></div>
            <div class="apply-item"><div class="apply-icon">🖨️</div><div><div class="apply-label">打印机权限</div><div class="apply-desc">添加或更换打印机</div></div></div>
            <div class="apply-item"><div class="apply-icon">🔐</div><div><div class="apply-label">离职账号注销</div><div class="apply-desc">员工离职后账号权限回收</div></div></div>
          </div>
        </section>
      </div>

      <!-- 设备使用规范 -->
      <section class="section-card">
        <div class="section-head">
          <div>
            <h2>设备使用规范</h2>
            <div class="section-subtitle">保障设备安全与数据安全</div>
          </div>
        </div>
        <div class="policy-grid">
          <div v-for="item in policyItems" :key="item.title" class="policy-item">
            <span class="policy-icon">{{ item.icon }}</span>
            <div>
              <div class="policy-title">{{ item.title }}</div>
              <div class="policy-desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 常见故障自查 -->
      <section id="faq" class="section-card">
        <div class="section-head">
          <div>
            <h2>常见故障自查</h2>
            <div class="section-subtitle">遇到问题先查这里</div>
          </div>
          <RouterLink to="/ticket" class="btn-link">遇到其他问题？提交工单 →</RouterLink>
        </div>
        <div class="faq-two-grid">
          <div v-for="item in faqItems" :key="item.q" class="faq-simple-item">
            <div class="faq-simple-q">{{ item.q }}</div>
            <div class="faq-simple-a">{{ item.a }}</div>
          </div>
        </div>
      </section>

      <!-- IT 知识库 -->
      <section class="section-card">
        <div class="section-head">
          <div>
            <h2>IT 知识库</h2>
            <div class="section-subtitle">{{ kbArticles.length }} 篇文档，详细操作说明</div>
          </div>
          <RouterLink to="/kb" class="btn-link">查看全部 →</RouterLink>
        </div>
        <div class="yuque-grid">
          <div
            v-for="art in kbArticles.slice(0,6)"
            :key="art.id"
            class="yuque-item"
            style="cursor: pointer;"
            @click="$router.push('/kb')"
          >
            <span class="yuque-icon">{{ art.icon }}</span>
            <div>
              <div class="yuque-label">{{ art.title }}</div>
              <div class="yuque-desc">{{ art.desc }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 常用链接 -->
      <section class="section-card">
        <h2 class="bottom-card-title">常用链接</h2>
        <p class="bottom-card-sub">常用工具与官网入口</p>
        <div class="quick-links-grid-wide">
          <a v-for="link in quickLinks" :key="link.url" :href="link.url" target="_blank" rel="noopener" class="ql-item">
            <span class="ql-icon">{{ link.icon }}</span>
            <div class="ql-text">
              <div class="ql-label">{{ link.label }}</div>
              <div class="ql-desc">{{ link.desc }}</div>
            </div>
          </a>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ModuleCard from '../components/ModuleCard.vue'
import SearchBar from '../components/SearchBar.vue'
import { modules } from '../data/modules'
import { quickLinks } from '../data/quick-links'
import { faqItems } from '../data/faq'
import { onboardingItems } from '../data/onboarding'
import { policyItems } from '../data/it-policy'
import { announcements } from '../data/announcements'
import { kbArticles } from '../data/kb'

const hotKbArticles = computed(() =>
  [...kbArticles].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 4)
)

const displayModules = computed(() =>
  modules.filter((m) => ['printer', 'network', 'overseas-network', 'meeting', 'erp', 'software'].includes(m.key))
)


const todayStr = computed(() => {
  const d = new Date()
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`
})

// 实时时钟
const clockStr = ref('')
let clockTimer: ReturnType<typeof setInterval>

function updateClock() {
  const d = new Date()
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  const s = String(d.getSeconds()).padStart(2, '0')
  clockStr.value = `${h}:${m}:${s}`
}

onMounted(() => {
  updateClock()
  clockTimer = setInterval(updateClock, 1000)
})

onUnmounted(() => clearInterval(clockTimer))
</script>
