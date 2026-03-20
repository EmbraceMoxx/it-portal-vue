<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-left">
        <div class="footer-brand">IT 服务门户</div>
        <div class="footer-desc">内网 IT 支持平台 · 仅限内部使用</div>
      </div>

      <div class="footer-links">
        <div class="footer-col">
          <div class="footer-col-title">服务入口</div>
          <RouterLink to="/printer">打印机安装</RouterLink>
          <RouterLink to="/network">办公网络</RouterLink>
          <RouterLink to="/overseas-network">海外网络</RouterLink>
          <RouterLink to="/meeting">会议室设备</RouterLink>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">工具</div>
          <RouterLink to="/software">软件下载</RouterLink>
          <RouterLink to="/status">系统状态</RouterLink>
          <RouterLink to="/ticket">提交工单</RouterLink>
          <RouterLink to="/scan">扫描教程</RouterLink>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">IT 支持</div>
          <span>电脑 · 网络 · 打印机</span>
          <span class="footer-person">黎灿 · 曹杰珲</span>
          <span style="margin-top: 8px;">金蝶 ERP 系统</span>
          <span class="footer-person">王文林</span>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© {{ year }} IT 运维团队 · 内部使用</span>
      <span class="footer-bottom-sep">·</span>
      <span>如遇问题请通过企业微信联系 IT</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
