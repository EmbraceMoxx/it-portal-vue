<template>
  <div>
    <!-- Hero 全宽 -->
    <div class="hero-wrap">
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-kicker">IT 内网服务门户</div>
          <h1 class="hero-title">IT 服务门户</h1>
          <p class="hero-desc">打印机安装、网络接入、ERP 系统、常用软件，在这里找到入口和操作说明。</p>
        </div>
        <div class="hero-right">
          <div class="hero-stat-row">
            <div class="hero-stat">
              <div class="hero-stat-n">{{ modules.length }}</div>
              <div class="hero-stat-l">服务模块</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-n">{{ printers.length }}</div>
              <div class="hero-stat-l">打印机</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-n">5</div>
              <div class="hero-stat-l">详情页面</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">

      <!-- 服务模块 -->
      <div class="home-section-label">服务入口</div>
      <section class="module-grid">
        <ModuleCard
          v-for="item in displayModules"
          :key="item.key"
          :item="item"
        />
      </section>

      <!-- 底部两列：IT 支持 + 打印机 -->
      <div class="home-bottom-grid">

        <!-- IT 支持 -->
        <div class="home-support">
          <div class="home-section-label">IT 服务支持</div>
          <div class="support-card-wrap">
            <div class="support-card-item it-bg">
              <div class="sci-label">电脑 · 网络 · 打印机</div>
              <div class="sci-people">
                <div class="sci-person">
                  <div class="sci-av it">黎</div>
                  <span class="sci-name">黎灿</span>
                </div>
                <div class="sci-person">
                  <div class="sci-av it">曹</div>
                  <span class="sci-name">曹杰珲</span>
                </div>
              </div>
            </div>
            <div class="support-card-item erp-bg">
              <div class="sci-label">金蝶 ERP 系统</div>
              <div class="sci-people">
                <div class="sci-person">
                  <div class="sci-av erp">王</div>
                  <span class="sci-name">王文林</span>
                </div>
              </div>
            </div>
            <div class="sci-tip">优先通过企业微信联系</div>
          </div>
        </div>

        <!-- 打印机安装 -->
        <div class="home-printer">
          <div class="home-section-label" style="display:flex;justify-content:space-between;align-items:center">
            <span>打印机安装</span>
            <RouterLink class="btn-link" to="/printer">查看全部 →</RouterLink>
          </div>
          <div class="printer-quick">
            <div class="share-block">
              <div class="share-path-row">
                <span class="share-label">共享盘路径</span>
                <code class="share-path">{{ sharePath }}</code>
                <button class="btn-primary" @click="handleCopy">复制</button>
              </div>
              <div class="credential-banner">
                <span class="credential-icon">🔑</span>
                <span class="credential-text">连接凭据：</span>
                <span class="credential-item">账号 <strong>it_ro</strong>
                  <button class="btn-copy-icon" @click="copyText('it_ro', '已复制账号')" title="复制账号">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  </button>
                </span>
                <span class="credential-item">密码 <strong>Sws888888</strong>
                  <button class="btn-copy-icon" @click="copyText('Sws888888', '已复制密码')" title="复制密码">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  </button>
                </span>
              </div>
            </div>
            <div class="printer-list">
              <PrinterCard
                v-for="printer in printers"
                :key="printer.id"
                :printer="printer"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ModuleCard from '../components/ModuleCard.vue'
import PrinterCard from '../components/PrinterCard.vue'
import { modules } from '../data/modules'
import { printers, PRINTER_SHARE_PATH } from '../data/printers'
import { useClipboard } from '../composables/useClipboard'

const sharePath = PRINTER_SHARE_PATH
const { copyText } = useClipboard()

const handleCopy = () => {
  copyText(sharePath, '已复制共享盘路径')
}

const displayModules = computed(() =>
  modules.filter((item) =>
    ['printer', 'erp', 'network', 'overseas-network', 'software'].includes(item.key),
  ),
)
</script>
