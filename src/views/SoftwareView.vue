<template>
  <div class="container">
    <div class="breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span>/</span>
      <span>常用软件安装</span>
    </div>

    <div class="detail-header">
      <div>
        <div class="eyebrow">服务详情</div>
        <h1>常用软件安装</h1>
        <p>
          把办公软件、浏览器、PDF 工具、远程协助、扫码工具等统一收口。首页只放入口，详情页维护安装分类、版本说明、下载地址和注意事项更适合长期使用。
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
          <h3>操作步骤</h3>
          <div class="step-list">
            <div class="step-item">
              <strong>1. 选择软件分类</strong>
              <div>按办公、开发、远程协助、扫码工具等分类展示。</div>
            </div>
            <div class="step-item">
              <strong>2. 下载对应版本</strong>
              <div>明确 Windows / Mac、32 位 / 64 位等差异，避免装错版本。</div>
            </div>
            <div class="step-item">
              <strong>3. 查看安装说明</strong>
              <div>对有特殊权限要求的软件，补充管理员运行、重启或依赖说明。</div>
            </div>
            <div class="step-item">
              <strong>4. 安装失败再报障</strong>
              <div>先查看版本、兼容性、权限说明，再决定是否进入 IT 报障流程。</div>
            </div>
          </div>
        </div>

        <div class="detail-card">
          <h3>入口信息</h3>
          <div class="path-box">软件中心地址：http://it.example.local/software</div>
        </div>
      </div>

      <div class="detail-side">
        <div class="faq-card">
          <h3>适用范围</h3>
          <ul>
            <li>适用于办公软件、浏览器、PDF 工具、远程协助、驱动工具等安装场景。</li>
            <li>适合按软件类别、平台和版本继续拆分子页面。</li>
          </ul>
        </div>

        <div class="faq-card">
          <h3>注意事项</h3>
          <ul>
            <li>软件版本、安装说明和下载地址建议统一维护。</li>
            <li>对需要管理员权限的软件，要明确标注安装要求。</li>
            <li>后续可以继续拆出浏览器、Office、开发工具等更细页面。</li>
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