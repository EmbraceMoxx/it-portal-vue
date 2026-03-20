<template>
  <div class="float-contact">
    <transition name="float-panel-fade">
      <div v-if="open" class="float-panel">
        <div class="float-panel-head">
          <span class="float-panel-title">联系 IT 支持</span>
          <button class="float-panel-close" @click="open = false">✕</button>
        </div>
        <p class="float-panel-tip">通过企业微信联系，响应更快</p>
        <div class="float-contact-group">
          <div class="float-contact-scope">电脑 · 网络 · 打印机</div>
          <div class="float-contact-people">
            <div class="float-person">
              <div class="float-av it">黎</div>
              <div>
                <div class="float-name">黎灿</div>
                <div class="float-role">IT 运维</div>
              </div>
            </div>
            <div class="float-person">
              <div class="float-av it">曹</div>
              <div>
                <div class="float-name">曹杰珲</div>
                <div class="float-role">IT 运维</div>
              </div>
            </div>
          </div>
        </div>
        <div class="float-divider"></div>
        <div class="float-contact-group">
          <div class="float-contact-scope">金蝶 ERP 系统</div>
          <div class="float-contact-people">
            <div class="float-person">
              <div class="float-av erp">王</div>
              <div>
                <div class="float-name">王文林</div>
                <div class="float-role">ERP 管理员</div>
              </div>
            </div>
          </div>
        </div>
        <RouterLink to="/ticket" class="float-ticket-btn" @click="open = false">
          📋 提交工单
        </RouterLink>
      </div>
    </transition>

    <button class="float-btn" :class="{ active: open }" @click="open = !open" title="联系 IT">
      <svg v-if="!open" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>
