<template>
  <div class="container">
    <div class="breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span>/</span>
      <span>ERP 入口</span>
    </div>

    <div class="detail-header">
      <div>
        <div class="eyebrow">系统详情</div>
        <h1>ERP 入口</h1>
        <p>
          首页只放 ERP 入口，进入详情页后再展示系统地址、登录步骤、适用范围和常见问题。这种结构更适合长期维护，不会把首页堆得太满。
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
          <h3>操作步骤</h3>
          <div class="step-list">
            <div class="step-item">
              <strong>1. 打开系统地址</strong>
              <div>在公司网络环境下访问 ERP 内网地址，建议使用公司指定浏览器。</div>
            </div>
            <div class="step-item">
              <strong>2. 输入账号密码</strong>
              <div>使用公司分配的 ERP 账号登录，首次登录建议修改初始密码。</div>
            </div>
            <div class="step-item">
              <strong>3. 按岗位进入模块</strong>
              <div>财务、采购、仓储、销售等岗位进入对应菜单。</div>
            </div>
            <div class="step-item">
              <strong>4. 遇到问题查看说明或联系 IT</strong>
              <div>若出现登录失败、页面异常、权限不足，可先查看注意事项或提交 IT 报障。</div>
            </div>
          </div>
        </div>

        <div class="detail-card">
          <h3>入口信息</h3>
          <div class="path-box">系统地址：http://erp.example.local</div>
        </div>
      </div>

      <div class="detail-side">
        <div class="faq-card">
          <h3>适用范围</h3>
          <ul>
            <li>适用于财务、采购、仓储、销售等 ERP 使用人员。</li>
            <li>适合放置系统地址、账号说明、权限申请入口。</li>
          </ul>
        </div>

        <div class="faq-card">
          <h3>注意事项</h3>
          <ul>
            <li>系统地址建议只在公司内网访问。</li>
            <li>首次登录建议修改密码。</li>
            <li>权限不足需走业务负责人或 IT 审批流程。</li>
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