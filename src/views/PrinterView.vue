<template>
  <div class="container">
    <div class="breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span>/</span>
      <span>打印机安装中心</span>
    </div>

    <section class="detail-header">
      <div>
        <div class="eyebrow">服务详情</div>
        <h1>打印机安装中心</h1>
        <p>
          首页适合只展示概览，详情页再放完整安装步骤、打印机列表、注意事项和驱动说明，后续也方便按楼层、部门继续拆分。
        </p>
      </div>
    </section>

    <section class="detail-grid">
      <div class="detail-main">
        <div class="card section-card">
          <h3>打印机列表</h3>
          <PrinterCard
            v-for="printer in printers"
            :key="printer.id"
            :printer="printer"
            @copy="copyText(printer.scriptPath, '已复制脚本路径')"
          />
        </div>
      </div>

      <div class="detail-side">
        <div class="card faq-card">
          <h3>安装说明</h3>
          <ul>
            <li>先复制脚本路径。</li>
            <li>按 Win + E 打开资源管理器。</li>
            <li>把路径粘贴到地址栏，再按回车。</li>
            <li>右键脚本，选择“以管理员身份运行”。</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import PrinterCard from '../components/printer/PrinterCard.vue'
import { printers } from '../data/printers'
import { useClipboard } from '../composables/useClipboard'

const { copyText } = useClipboard()
</script>