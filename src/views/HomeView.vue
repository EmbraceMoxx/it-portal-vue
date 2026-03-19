<template>
  <div class="container">
    <section class="hero card">
      <div class="hero-grid">
        <div>
          <div class="eyebrow">IT 内网服务门户</div>
          <h1>统一 IT 自助服务入口</h1>
          <p>
            把打印机安装、常用软件、网络与 VPN、新员工指引、IT 报障和系统导航集中在首页，员工先看概览，再进入对应详情页查看更完整的说明和操作步骤。
          </p>
          <div class="badge-row">
            <span class="badge green">首页聚合</span>
            <span class="badge blue">多页详情</span>
            <span class="badge orange">减少重复支持</span>
          </div>
        </div>
        <div class="hero-side">
          <h2>建议优先上线模块</h2>
          <ul>
            <li>打印机安装中心</li>
            <li>ERP 入口说明</li>
            <li>常用软件安装</li>
            <li>网络 / VPN 指引</li>
            <li>IT 报障入口</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="module-grid">
      <RouterLink v-for="item in modules" :key="item.key" :to="item.to" class="module-card card module-link">
        <div class="module-top">
          <div class="module-icon">{{ item.icon }}</div>
          <div class="module-tag">{{ item.tag }}</div>
        </div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
        <div class="module-meta">{{ item.meta }}</div>
      </RouterLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { modules } from '../data/modules'
</script>