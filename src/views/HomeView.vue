<template>
  <div>

    <!-- Hero 全宽 -->
    <div class="hero-wrap">
      <div class="hw-inner">
        <div class="hw-left">
          <div class="hw-badge">IT 内网服务门户</div>
          <h1 class="hw-title">IT 服务门户</h1>
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
          <RouterLink class="hw-nav-item" to="/status">
            <span class="hw-nav-icon">📊</span>
            <span class="hw-nav-label">系统状态</span>
          </RouterLink>
          <RouterLink class="hw-nav-item" to="/ticket">
            <span class="hw-nav-icon">📋</span>
            <span class="hw-nav-label">提交工单</span>
          </RouterLink>
          <div class="hw-nav-item hw-nav-disabled">
            <span class="hw-nav-icon">📦</span>
            <span class="hw-nav-label">金蝶 ERP</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container">

      <!-- 今日 IT 状态 -->
      <div class="today-status-bar">
        <div class="tsb-left">
          <span class="tsb-date">{{ todayStr }}</span>
          <span class="tsb-divider"></span>
          <span class="tsb-status-dot online"></span>
          <span class="tsb-status-text">所有系统正常运行</span>
        </div>
        <div class="tsb-right">
          <RouterLink to="/status" class="tsb-stat">
            <span class="tsb-stat-num green">{{ onlineCount }}</span>
            <span class="tsb-stat-label">在线设备</span>
          </RouterLink>
          <div class="tsb-stat-sep"></div>
          <RouterLink to="/ticket" class="tsb-stat">
            <span class="tsb-stat-num blue">1</span>
            <span class="tsb-stat-label">处理中工单</span>
          </RouterLink>
          <div class="tsb-stat-sep"></div>
          <RouterLink to="/status" class="tsb-stat">
            <span class="tsb-stat-num yellow">1</span>
            <span class="tsb-stat-label">异常设备</span>
          </RouterLink>
        </div>
      </div>

      <!-- 快速故障诊断（全宽） -->
      <div class="section-card" style="margin-bottom: 28px; padding: 0; overflow: hidden;">
        <DiagWizard />
      </div>

      <!-- 服务模块 -->
      <section class="module-grid">
        <ModuleCard v-for="item in displayModules" :key="item.key" :item="item" />
      </section>

      <!-- 常用链接（全宽） -->
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
        </section>
        <section class="section-card">
          <h2 class="bottom-card-title">账号 &amp; 权限申请</h2>
          <p class="bottom-card-sub">通过企业微信联系 IT 处理</p>
          <div class="apply-list">
            <div class="apply-item"><div class="apply-icon">👤</div><div><div class="apply-label">新员工账号开通</div><div class="apply-desc">Windows 登录账号、内网权限</div></div></div>
            <div class="apply-item"><div class="apply-icon">📧</div><div><div class="apply-label">企业邮箱申请</div><div class="apply-desc">公司邮箱开通与配置</div></div></div>
            <div class="apply-item"><div class="apply-icon">📦</div><div><div class="apply-label">ERP 账号 &amp; 权限</div><div class="apply-desc">金蝶系统账号开通、模块权限</div></div></div>
            <div class="apply-item"><div class="apply-icon">💿</div><div><div class="apply-label">软件安装申请</div><div class="apply-desc">需要安装特定软件时联系 IT</div></div></div>
            <div class="apply-item"><div class="apply-icon">🖨️</div><div><div class="apply-label">打印机权限</div><div class="apply-desc">添加或更换打印机</div></div></div>
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
            <div class="section-subtitle">语雀文档，详细操作说明与手册</div>
          </div>
        </div>
        <div class="yuque-grid">
          <a href="https://www.yuque.com/" target="_blank" rel="noopener" class="yuque-item">
            <span class="yuque-icon">🖨️</span><div><div class="yuque-label">打印机安装说明</div><div class="yuque-desc">驱动安装、共享盘连接步骤</div></div>
          </a>
          <a href="https://www.yuque.com/" target="_blank" rel="noopener" class="yuque-item">
            <span class="yuque-icon">🌐</span><div><div class="yuque-label">网络接入说明</div><div class="yuque-desc">有线、无线、海外网络配置</div></div>
          </a>
          <a href="https://www.yuque.com/" target="_blank" rel="noopener" class="yuque-item">
            <span class="yuque-icon">💿</span><div><div class="yuque-label">常用软件安装</div><div class="yuque-desc">办公软件、驱动下载地址</div></div>
          </a>
          <a href="https://www.yuque.com/" target="_blank" rel="noopener" class="yuque-item">
            <span class="yuque-icon">📦</span><div><div class="yuque-label">金蝶 ERP 使用手册</div><div class="yuque-desc">登录、操作、常见问题</div></div>
          </a>
          <a href="https://www.yuque.com/" target="_blank" rel="noopener" class="yuque-item">
            <span class="yuque-icon">🔑</span><div><div class="yuque-label">账号与权限申请</div><div class="yuque-desc">新员工入职、权限变更流程</div></div>
          </a>
          <a href="https://www.yuque.com/" target="_blank" rel="noopener" class="yuque-item">
            <span class="yuque-icon">🛠️</span><div><div class="yuque-label">IT 故障排查手册</div><div class="yuque-desc">常见问题处理步骤汇总</div></div>
          </a>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ModuleCard from '../components/ModuleCard.vue'
import SearchBar from '../components/SearchBar.vue'
import DiagWizard from '../components/DiagWizard.vue'
import { modules } from '../data/modules'
import { quickLinks } from '../data/quick-links'
import { faqItems } from '../data/faq'
import { onboardingItems } from '../data/onboarding'
import { policyItems } from '../data/it-policy'
import { systemStatusList } from '../data/system-status'

const displayModules = computed(() =>
  modules.filter((m) => ['printer', 'erp', 'network', 'overseas-network', 'software'].includes(m.key))
)

const onlineCount = computed(() => systemStatusList.filter(s => s.status === 'online').length)

const todayStr = computed(() => {
  const d = new Date()
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`
})
</script>
