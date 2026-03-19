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
        <p>
          首页适合只展示概览，详情页再放完整安装步骤、打印机列表、注意事项和驱动说明，后续也方便按楼层、部门继续拆分。
        </p>
      </div>
    </div>

    <div class="detail-grid">
      <div class="detail-main">
        <div class="detail-card">
          <h3>操作步骤</h3>
          <div class="step-list">
            <div class="step-item">
              <strong>1. 复制脚本路径</strong>
              <div>从下方对应打印机复制脚本路径。</div>
            </div>
            <div class="step-item">
              <strong>2. 打开资源管理器</strong>
              <div>按 Win + E，打开 Windows 资源管理器。</div>
            </div>
            <div class="step-item">
              <strong>3. 粘贴路径并回车</strong>
              <div>把脚本路径粘贴到资源管理器地址栏，按回车进入共享目录。</div>
            </div>
            <div class="step-item">
              <strong>4. 管理员运行</strong>
              <div>右键脚本，选择“以管理员身份运行”。</div>
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
              @copy="handleCopy"
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
            <li>网页不能直接执行 BAT 脚本，这是浏览器安全限制。</li>
            <li>共享目录建议设置普通用户只读权限。</li>
            <li>驱动目录建议单独放置，避免误删。</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PrinterCard from '../components/PrinterCard.vue'
import { printers } from '../data/printers'
import { useClipboard } from '../composables/useClipboard'

const { copyText } = useClipboard()

const handleCopy = (path: string) => {
  copyText(path, '已复制脚本路径')
}
</script>