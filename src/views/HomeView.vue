<template>
  <div class="container">
    <section class="hero">
      <div class="hero-grid">
        <div>
          <div class="eyebrow">IT 内网服务门户</div>
          <h1>常用 IT 服务入口</h1>
          <p>
            在这里可以快速找到打印机安装、ERP 入口、网络与 VPN、常用软件等服务。
            先查看首页概览，再进入对应页面查看详细说明和操作步骤。
          </p>

          <div class="badge-row">
            <span class="badge green">常用服务</span>
            <span class="badge blue">操作指引</span>
            <span class="badge orange">快速入口</span>
          </div>
        </div>

        <div class="hero-side">
          <div>
            <h2>你可以在这里做什么</h2>
            <ul>
              <li>安装常用打印机</li>
              <li>查看 ERP 系统入口</li>
              <li>获取网络 / VPN 使用说明</li>
              <li>查找常用软件安装地址</li>
              <li>查看常见 IT 使用指引</li>
            </ul>
          </div>

          <div class="stats">
            <div class="stat-box">
              <div class="stat-label">服务入口</div>
              <div class="stat-value">{{ modules.length }}</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">打印机</div>
              <div class="stat-value">{{ printers.length }}</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">详情页面</div>
              <div class="stat-value">4</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="module-grid">
      <ModuleCard
        v-for="item in displayModules"
        :key="item.key"
        :item="item"
      />
    </section>

    <section class="section-card">
      <div class="section-head">
        <div>
          <h2>打印机安装中心</h2>
          <div class="section-subtitle">
            常用打印机安装入口与操作说明。
          </div>
        </div>
        <RouterLink class="btn-link" to="/printer">查看全部 →</RouterLink>
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
            <h3>使用说明</h3>
            <ul>
              <li>点击“复制脚本路径”按钮。</li>
              <li>按 Win + E，打开 Windows 资源管理器。</li>
              <li>把脚本路径粘贴到地址栏，按回车直接执行安装脚本。</li>
              <li>安装完成后，可在“设备和打印机”中确认。</li>
            </ul>
          </div>

          <div class="faq-card">
            <h3>温馨提示</h3>
            <ul>
              <li>复制的是安装脚本完整路径。</li>
              <li>如未正常安装，请确认网络连接是否正常。</li>
              <li>如仍无法处理，请联系 IT 支持。</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ModuleCard from '../components/ModuleCard.vue'
import PrinterCard from '../components/PrinterCard.vue'
import { modules } from '../data/modules'
import { printers } from '../data/printers'
import { useClipboard } from '../composables/useClipboard'

const { copyText } = useClipboard()

const handleCopy = (path: string) => {
  copyText(path, '已复制脚本路径')
}

// 首页只展示真正给用户使用的入口
const displayModules = computed(() =>
  modules.filter((item) =>
    ['printer', 'erp', 'network', 'software'].includes(item.key),
  ),
)
</script>