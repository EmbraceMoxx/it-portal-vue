<template>
  <div class="container">
    <div class="breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span>/</span>
      <span>打印机安装中心</span>
    </div>

    <div class="detail-header">
      <div>
        <div class="eyebrow">服务详情</div>
        <h1>打印机安装中心</h1>
        <p>连接共享盘后，双击对应 .bat 脚本即可完成安装。</p>
      </div>
    </div>

    <div class="detail-grid">
      <div class="detail-main">
        <div class="detail-card">
          <h3>操作步骤</h3>

          <!-- 共享盘路径 + 凭据 -->
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

          <div class="step-list">
            <div class="step-item">
              <strong>1. 复制上方共享盘路径</strong>
              <div>点击"复制路径"按钮。</div>
            </div>
            <div class="step-item">
              <strong>2. 打开资源管理器并连接共享盘</strong>
              <div>按 Win + E 打开资源管理器，将路径粘贴到地址栏，按回车打开共享盘文件夹。</div>
            </div>
            <div class="step-item">
              <strong>3. 双击 BAT 文件安装</strong>
              <div>在打开的文件夹中，找到下方列表对应的 .bat 脚本，双击运行（如提示权限，请右键选择"以管理员身份运行"）。</div>
            </div>
            <div class="step-item">
              <strong>4. 等待安装完成</strong>
              <div>安装完成后，可到"设备和打印机"中确认是否已成功添加。</div>
            </div>
          </div>
        </div>

        <div class="detail-card">
          <h3>打印机列表</h3>
          <div class="printer-list">
            <PrinterCard
              v-for="printer in printers"
              :key="printer.id"
              :printer="printer"
            />
          </div>
        </div>
      </div>

      <div class="detail-side">
        <div class="faq-card">
          <h3>适用范围</h3>
          <ul>
            <li>适用于办公打印机、标签打印机等共享安装场景。</li>
            <li>适合按楼层、区域、部门继续拆分子页面。</li>
          </ul>
        </div>

        <div class="faq-card">
          <h3>注意事项</h3>
          <ul>
            <li>所有安装脚本统一放在共享盘 bat 文件夹内。</li>
            <li>如遇权限提示，请右键选择"以管理员身份运行"。</li>
            <li>共享目录建议设置普通用户只读权限。</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PrinterCard from '../components/PrinterCard.vue'
import { printers, PRINTER_SHARE_PATH } from '../data/printers'
import { useClipboard } from '../composables/useClipboard'

const sharePath = PRINTER_SHARE_PATH
const { copyText } = useClipboard()

const handleCopy = () => {
  copyText(sharePath, '已复制共享盘路径')
}
</script>
