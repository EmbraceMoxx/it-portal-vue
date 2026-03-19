<template>
  <div class="container">
    <div class="breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span>/</span>
      <span>ERP 入口</span>
    </div>

    <div class="detail-header">
      <div>
        <div class="eyebrow">系统服务</div>
        <h1>ERP 入口</h1>
        <p>
          这里提供 ERP 系统入口、登录说明和常见使用提示。
          如需进入系统，请先确认当前网络环境和账号权限是否正常。
        </p>
        <div class="detail-actions">
          <button class="btn-primary" @click="copyText('http://erp.example.local', '已复制系统地址')">
            复制系统地址
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
              <strong>1. 打开系统地址</strong>
              <div>在公司网络环境下访问 ERP 系统地址。</div>
            </div>
            <div class="step-item">
              <strong>2. 输入账号密码</strong>
              <div>使用公司分配的账号登录系统。</div>
            </div>
            <div class="step-item">
              <strong>3. 进入对应模块</strong>
              <div>根据岗位进入财务、采购、仓储、销售等对应菜单。</div>
            </div>
            <div class="step-item">
              <strong>4. 遇到问题先查看提示</strong>
              <div>如无法登录或权限异常，请先查看下方注意事项，仍无法解决再联系 IT 支持。</div>
            </div>
          </div>
        </div>

        <div class="detail-card">
          <h3>系统地址</h3>
          <div class="path-box">http://erp.example.local</div>
        </div>
      </div>

      <div class="detail-side">
        <div class="faq-card">
          <h3>适用对象</h3>
          <ul>
            <li>适用于需要使用 ERP 系统的员工。</li>
            <li>可用于查看系统入口、登录说明和基础使用提示。</li>
          </ul>
        </div>

        <div class="faq-card">
          <h3>温馨提示</h3>
          <ul>
            <li>请优先在公司内网环境下访问系统。</li>
            <li>首次登录后建议及时修改密码。</li>
            <li>如提示无权限，请联系业务负责人或 IT 支持处理。</li>
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