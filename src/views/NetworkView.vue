<template>
  <div class="container">
    <div class="breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span>/</span>
      <span>网络 / VPN</span>
    </div>

    <div class="detail-header">
      <div>
        <div class="eyebrow">服务详情</div>
        <h1>网络 / VPN</h1>
        <p>
          集中整理 Wi-Fi、VPN、远程办公、会议室投屏等高频网络说明。首页只放入口，详细步骤、下载地址和注意事项放到详情页维护更清晰。
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
          <h3>操作步骤</h3>
          <div class="step-list">
            <div class="step-item">
              <strong>1. 确认使用场景</strong>
              <div>区分办公室 Wi-Fi、访客网络、远程办公 VPN、会议室投屏等不同场景。</div>
            </div>
            <div class="step-item">
              <strong>2. 下载并安装客户端</strong>
              <div>从统一入口下载 VPN 客户端或查看 Wi-Fi 使用说明。</div>
            </div>
            <div class="step-item">
              <strong>3. 配置账号与连接地址</strong>
              <div>按指引输入公司分配的账号、密码和服务器地址。</div>
            </div>
            <div class="step-item">
              <strong>4. 连接失败先自查</strong>
              <div>优先检查密码、网络连通性和本地防火墙设置。</div>
            </div>
          </div>
        </div>

        <div class="detail-card">
          <h3>入口信息</h3>
          <div class="path-box">VPN 地址：http://it.example.local/vpn</div>
        </div>
      </div>

      <div class="detail-side">
        <div class="faq-card">
          <h3>适用范围</h3>
          <ul>
            <li>适用于办公室 Wi-Fi、远程办公、会议室投屏等网络场景。</li>
            <li>适合放置 VPN 下载地址、配置说明、常见问题和异常排查步骤。</li>
          </ul>
        </div>

        <div class="faq-card">
          <h3>注意事项</h3>
          <ul>
            <li>网络地址和 VPN 配置属于动态信息，建议定期维护更新。</li>
            <li>涉及账号、网络安全和访问控制的说明要和现行策略保持一致。</li>
            <li>可继续拆分为 Wi-Fi、VPN、会议室投屏三个独立子页。</li>
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