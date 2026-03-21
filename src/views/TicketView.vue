<template>
  <div class="container page-ticket">
    <div class="breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span>/</span>
      <span>提交工单</span>
    </div>

    <div class="ticket-layout">
      <!-- 左侧表单 -->
      <div>
    <div class="detail-header" style="margin-bottom: 24px;">
          <div>
            <h1>提交 IT 工单</h1>
            <p>描述你遇到的问题，IT 会尽快跟进处理。</p>
          </div>
        </div>

        <!-- 成功提示 -->
        <transition name="fade-slide">
          <div v-if="submitted" class="ticket-success">
            <div class="ticket-success-icon">✅</div>
            <div class="ticket-success-title">工单已提交</div>
            <div class="ticket-success-desc">工单编号：<strong>{{ ticketNo }}</strong>，IT 会通过企业微信与你联系。</div>
            <button class="btn-primary" style="margin-top: 16px;" @click="reset">再提交一个</button>
          </div>
        </transition>

        <transition name="fade-slide">
          <div v-if="!submitted" class="ticket-form section-card" style="margin-top: 20px;">
            <div class="form-group">
              <label class="form-label">你的姓名 <span class="form-required">*</span></label>
              <input v-model="form.name" class="form-input" placeholder="请输入姓名" />
            </div>
            <div class="form-group">
              <label class="form-label">问题类型 <span class="form-required">*</span></label>
              <div class="form-type-grid">
                <button
                  v-for="t in ticketTypes"
                  :key="t.value"
                  class="form-type-btn"
                  :class="{ active: form.type === t.value }"
                  @click="form.type = t.value"
                >
                  <span>{{ t.icon }}</span>
                  <span>{{ t.label }}</span>
                </button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">优先级</label>
              <div class="form-priority-row">
                <button
                  v-for="p in priorities"
                  :key="p.value"
                  class="form-priority-btn"
                  :class="[{ active: form.priority === p.value }, `priority-${p.value}`]"
                  @click="form.priority = p.value"
                >{{ p.label }}</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">问题描述 <span class="form-required">*</span></label>
              <textarea v-model="form.desc" class="form-textarea" rows="4" placeholder="请描述遇到的问题，越详细越好，例如：什么时候开始、有什么报错提示、已经尝试过什么方法…"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">设备信息（选填）</label>
              <input v-model="form.device" class="form-input" placeholder="例如：台式机 / 笔记本 / 打印机型号" />
            </div>
            <div v-if="errorMsg" class="form-error">{{ errorMsg }}</div>
            <button class="btn-primary btn-submit" :disabled="submitting" @click="submit">
              <span v-if="submitting">提交中…</span>
              <span v-else>提交工单</span>
            </button>
          </div>
        </transition>
      </div>

      <!-- 右侧说明 -->
      <div class="ticket-side">
        <div class="faq-card">
          <h3>提交须知</h3>
          <ul>
            <li>工单提交后，IT 会通过企业微信联系你跟进处理。</li>
            <li>紧急问题建议直接企业微信联系 IT，响应更快。</li>
            <li>请尽量描述清楚问题现象，有助于快速定位。</li>
          </ul>
        </div>
        <div class="faq-card" style="margin-top: 16px;">
          <h3>响应时间参考</h3>
          <div class="ticket-sla-list">
            <div class="ticket-sla-item">
              <span class="sla-dot red"></span>
              <div>
                <div class="sla-label">紧急</div>
                <div class="sla-desc">30 分钟内响应</div>
              </div>
            </div>
            <div class="ticket-sla-item">
              <span class="sla-dot yellow"></span>
              <div>
                <div class="sla-label">高优先级</div>
                <div class="sla-desc">2 小时内响应</div>
              </div>
            </div>
            <div class="ticket-sla-item">
              <span class="sla-dot blue"></span>
              <div>
                <div class="sla-label">普通</div>
                <div class="sla-desc">当天内响应</div>
              </div>
            </div>
          </div>
        </div>
        <div class="faq-card" style="margin-top: 16px;">
          <h3>近期工单统计</h3>
          <div class="ticket-stats">
            <div class="ticket-stat-item">
              <div class="ticket-stat-num">12</div>
              <div class="ticket-stat-label">本月提交</div>
            </div>
            <div class="ticket-stat-item">
              <div class="ticket-stat-num">11</div>
              <div class="ticket-stat-label">已解决</div>
            </div>
            <div class="ticket-stat-item">
              <div class="ticket-stat-num">1</div>
              <div class="ticket-stat-label">处理中</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const ticketTypes = [
  { value: 'network', label: '网络问题', icon: '🌐' },
  { value: 'printer', label: '打印机', icon: '🖨️' },
  { value: 'computer', label: '电脑故障', icon: '💻' },
  { value: 'account', label: '账号权限', icon: '🔑' },
  { value: 'software', label: '软件安装', icon: '💿' },
  { value: 'other', label: '其他', icon: '🛠️' },
]

const priorities = [
  { value: 'urgent', label: '🔴 紧急' },
  { value: 'high', label: '🟡 高' },
  { value: 'normal', label: '🔵 普通' },
]

const form = reactive({
  name: '',
  type: '',
  priority: 'normal',
  desc: '',
  device: '',
})

const submitting = ref(false)
const submitted = ref(false)
const errorMsg = ref('')
const ticketNo = ref('')

function validate() {
  if (!form.name.trim()) return '请填写姓名'
  if (!form.type) return '请选择问题类型'
  if (!form.desc.trim()) return '请描述问题'
  return ''
}

async function submit() {
  errorMsg.value = validate()
  if (errorMsg.value) return

  submitting.value = true
  // 模拟提交延迟
  await new Promise(r => setTimeout(r, 1200))
  ticketNo.value = 'IT-' + Date.now().toString().slice(-6)
  submitting.value = false
  submitted.value = true
}

function reset() {
  submitted.value = false
  form.name = ''
  form.type = ''
  form.priority = 'normal'
  form.desc = ''
  form.device = ''
  errorMsg.value = ''
}
</script>
