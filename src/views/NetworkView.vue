<template>
  <div class="container">
    <div class="breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span>/</span>
      <span>网络 / VPN</span>
    </div>

    <div class="detail-header">
      <div>
        <div class="eyebrow">网络服务</div>
        <h1>网络 / VPN</h1>
        <p>
          这里提供 Wi-Fi、VPN、远程办公等相关说明。
          如需远程访问公司系统，可先查看连接方式和操作步骤。
        </p>
        <div class="detail-actions">
          <button class="btn-primary" @click="copyText('http://it.example.local/vpn', '已复制 VPN 地址')">
            复制 VPN 地址
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
              <strong>1. 确认当前使用场景</strong>
              <div>请先确认你是办公室网络、居家办公还是远程访问场景。</div>
            </div>
            <div class="step-item">
              <strong>2. 获取连接地址或客户端</strong>
              <div>根据说明获取 VPN 地址或客户端安装方式。</div>
            </div>
            <div class="step-item">
              <strong>3. 输入账号并连接</strong>
              <div>按要求填写公司分配的账号、密码和连接地址。</div>
            </div>
            <div class="step-item">
              <strong>4. 连接异常先自查</strong>
              <div>如连接失败，请先检查网络是否正常、账号密码是否正确。</div>
            </div>
          </div>
        </div>

        <div class="detail-card">
          <h3>VPN 地址</h3>
          <div class="path-box">http://it.example.local/vpn</div>
        </div>
      </div>

      <div class="detail-side">
        <div class="faq-card">
          <h3>适用对象</h3>
          <ul>
            <li>适用于办公室网络、远程办公、外出访问公司系统等场景。</li>
            <li>可用于查看 Wi-Fi、VPN 和远程连接说明。</li>
          </ul>
        </div>

        <div class="faq-card">
          <h3>温馨提示</h3>
          <ul>
            <li>请使用公司提供的账号和连接方式。</li>
            <li>涉及网络访问和账号安全的信息请勿随意外传。</li>
            <li>如多次连接失败，请联系 IT 支持。</li>
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