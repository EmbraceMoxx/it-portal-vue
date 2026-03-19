<template>
  <div class="container">
    <section class="hero">
      <div class="hero-grid">
        <div>
          <div class="eyebrow">IT 内网服务门户</div>
          <h1>统一 IT 自助服务入口</h1>
          <p>
            把打印机安装、常用软件、网络与 VPN、新员工指引、IT 报障和系统导航集中在首页，员工先看概览，再进入对应详情页查看更完整的说明和操作步骤。
          </p>

          <div class="badge-row">
            <span class="badge green">首页聚合</span>
            <span class="badge blue">多页详情</span>
            <span class="badge orange">减少重复支持</span>
          </div>
        </div>

        <div class="hero-side">
          <div>
            <h2>建议优先上线模块</h2>
            <ul>
              <li>打印机安装中心</li>
              <li>ERP 入口说明</li>
              <li>常用软件安装</li>
              <li>网络 / VPN 指引</li>
              <li>IT 报障入口</li>
            </ul>
          </div>

          <div class="stats">
            <div class="stat-box">
              <div class="stat-label">服务模块</div>
              <div class="stat-value">{{ modules.length }}</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">打印机</div>
              <div class="stat-value">{{ printers.length }}</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">详情页</div>
              <div class="stat-value">4</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="module-grid">
      <ModuleCard
        v-for="item in modules"
        :key="item.key"
        :item="item"
      />
    </section>

    <section class="section-card">
      <div class="section-head">
        <div>
          <h2>打印机安装中心</h2>
          <div class="section-subtitle">
            首页保留高频概览，详情说明放到单独页面维护。
          </div>
        </div>
        <RouterLink class="btn-link" to="/printer">进入详情 →</RouterLink>
      </div>

      <div class="detail-grid">
        <div class="detail-main">
          <div class="printer-list">
            <PrinterCard
              v-for="printer in printers"
              :key="printer.id"
              :printer="printer"
              @copy="handleCopy"
            />
          </div>
        </div>

        <div class="detail-side">
          <div class="faq-card">
            <h3>安装说明</h3>
            <ul>
              <li>点击“复制脚本路径”按钮。</li>
              <li>按 Win + E，打开 Windows 资源管理器。</li>
              <li>把脚本路径粘贴到地址栏，按回车直接执行安装脚本。</li>
              <li>安装完成后，可在“设备和打印机”中确认。</li>
            </ul>
          </div>

          <div class="faq-card">
            <h3>说明补充</h3>
            <ul>
              <li>网页不能直接执行 BAT 脚本，这是浏览器安全限制。</li>
              <li>复制的是脚本完整路径，不是共享目录路径。</li>
              <li>若无法直接执行，请将路径重新粘贴到资源管理器地址栏中重试。</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ModuleCard from '../components/ModuleCard.vue'
import PrinterCard from '../components/PrinterCard.vue'
import { modules } from '../data/modules'
import { printers } from '../data/printers'
import { useClipboard } from '../composables/useClipboard'

const { copyText } = useClipboard()

const handleCopy = (path: string) => {
  copyText(path, '已复制脚本路径')
}
</script>