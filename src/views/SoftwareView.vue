<template>
  <div class="container">
    <div class="breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span>/</span>
      <span>常用软件安装</span>
    </div>

    <div class="detail-header">
      <div>
        <div class="eyebrow">软件服务</div>
        <h1>常用软件安装</h1>
        <p>
          这里提供常用软件的安装入口和使用说明，
          包括办公软件、浏览器、PDF 工具、远程协助工具等。
        </p>
        <div class="detail-actions">
          <button class="btn-primary" @click="copyText('http://it.example.local/software', '已复制软件中心地址')">
            复制软件中心地址
          </button>
        </div>
      </div>
    </div>

    <div class="detail-grid">
      <div class="detail-main">
        <div class="detail-card">
          <h3>使用步骤</h3>
          <div class="step-list">
            <div class="step-item">
              <strong>1. 选择需要的软件</strong>
              <div>根据办公、浏览器、工具软件等分类找到对应安装项。</div>
            </div>
            <div class="step-item">
              <strong>2. 下载对应版本</strong>
              <div>请确认系统类型和软件版本，避免安装不匹配的版本。</div>
            </div>
            <div class="step-item">
              <strong>3. 按说明完成安装</strong>
              <div>如页面有安装提示，请按步骤完成安装。</div>
            </div>
            <div class="step-item">
              <strong>4. 安装失败再寻求帮助</strong>
              <div>如仍无法安装，请联系 IT 支持协助处理。</div>
            </div>
          </div>
        </div>

        <div class="detail-card">
          <h3>软件中心地址</h3>
          <div class="path-box">http://it.example.local/software</div>
        </div>
      </div>

      <div class="detail-side">
        <div class="faq-card">
          <h3>适用对象</h3>
          <ul>
            <li>适用于需要安装常用办公和工具软件的员工。</li>
            <li>可用于查看软件下载地址和安装说明。</li>
          </ul>
        </div>

        <div class="faq-card">
          <h3>温馨提示</h3>
          <ul>
            <li>请优先使用公司提供的软件安装入口。</li>
            <li>部分软件可能需要管理员权限，请按页面提示操作。</li>
            <li>如下载或安装异常，请联系 IT 支持。</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '../composables/useClipboard'

const { copyText } = useClipboard()
</script>