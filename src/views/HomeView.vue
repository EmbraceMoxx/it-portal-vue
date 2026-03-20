<template>
  <div>

    <!-- Hero 全宽 -->
    <div class="hero-wrap">
      <div class="hw-inner">
        <div class="hw-left">
          <div class="hw-badge">IT 内网服务门户</div>
          <h1 class="hw-title">IT 服务门户</h1>
          <p class="hw-desc">打印机安装 · 网络接入 · ERP 系统 · 常用软件<br>在这里找到入口和操作说明</p>
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
          <RouterLink class="hw-nav-item" to="/erp">
            <span class="hw-nav-icon">📦</span>
            <span class="hw-nav-label">金蝶 ERP</span>
          </RouterLink>
          <RouterLink class="hw-nav-item" to="/software">
            <span class="hw-nav-icon">💿</span>
            <span class="hw-nav-label">常用软件</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="container">

      <!-- 服务模块 -->
      <section class="module-grid">
        <ModuleCard v-for="item in displayModules" :key="item.key" :item="item" />
      </section>

      <!-- 打印机安装 -->
      <section class="section-card">
        <div class="section-head">
          <div>
            <h2>打印机安装中心</h2>
            <div class="section-subtitle">连接共享盘后，双击对应 .bat 脚本即可完成安装。</div>
          </div>
          <RouterLink class="btn-link" to="/printer">查看全部 →</RouterLink>
        </div>
        <div class="detail-grid">
          <div class="detail-main">
            <div class="share-block">
              <div class="share-path-row">
                <span class="share-label">共享盘路径</span>
                <code class="share-path">{{ sharePath }}</code>
                <button class="btn-primary" @click="handleCopy">复制路径</button>
              </div>
              <div class="credential-banner">
                <span class="credential-icon">🔑</span>
                <span class="credential-text">连接时如提示输入凭据：</span>
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
              <PrinterCard v-for="printer in printers" :key="printer.id" :printer="printer" />
            </div>
          </div>
          <div class="detail-side">
            <div class="faq-card">
              <h3>使用说明</h3>
              <ul>
                <li>复制上方共享盘路径，粘贴到资源管理器地址栏，按回车打开文件夹。</li>
                <li>在文件夹中找到对应 .bat 脚本，双击运行安装。</li>
                <li>安装完成后，可在"设备和打印机"中确认。</li>
              </ul>
            </div>
            <div class="faq-card">
              <h3>温馨提示</h3>
              <ul>
                <li>如提示权限不足，请右键选择"以管理员身份运行"。</li>
                <li>如未正常安装，请确认网络连接是否正常。</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 底部两列：IT 支持 + 常用链接 -->
      <div class="bottom-grid">

        <!-- IT 服务支持 -->
        <section class="section-card">
          <h2 class="bottom-card-title">IT 服务支持</h2>
          <p class="bottom-card-sub">通过企业微信联系</p>
          <div class="support-list-v">
            <div class="slv-group">
              <div class="slv-scope">电脑 · 网络 · 打印机</div>
              <div class="slv-people">
                <div class="slv-person"><div class="slv-av it">黎</div><span>黎灿</span></div>
                <div class="slv-person"><div class="slv-av it">曹</div><span>曹杰珲</span></div>
              </div>
            </div>
            <div class="slv-divider"></div>
            <div class="slv-group">
              <div class="slv-scope">金蝶 ERP 系统</div>
              <div class="slv-people">
                <div class="slv-person"><div class="slv-av erp">王</div><span>王文林</span></div>
              </div>
            </div>
          </div>

        </section>

        <!-- 常用链接 -->
        <section class="section-card">
          <h2 class="bottom-card-title">常用链接</h2>
          <p class="bottom-card-sub">常用工具与官网入口</p>
          <div class="quick-links-grid">
            <a
              v-for="link in quickLinks"
              :key="link.url"
              :href="link.url"
              target="_blank"
              rel="noopener"
              class="ql-item"
            >
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ModuleCard from '../components/ModuleCard.vue'
import PrinterCard from '../components/PrinterCard.vue'
import { modules } from '../data/modules'
import { printers, PRINTER_SHARE_PATH } from '../data/printers'
import { quickLinks } from '../data/quick-links'
import { useClipboard } from '../composables/useClipboard'

const sharePath = PRINTER_SHARE_PATH
const { copyText } = useClipboard()
const handleCopy = () => copyText(sharePath, '已复制共享盘路径')

const displayModules = computed(() =>
  modules.filter((m) => ['printer', 'erp', 'network', 'overseas-network', 'software'].includes(m.key))
)
</script>
