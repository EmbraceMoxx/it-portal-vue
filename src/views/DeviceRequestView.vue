<template>
  <div class="container page-device-request">
    <div class="detail-header" style="border-left-color: #f59e0b;">
      <div>
        <h1>设备申请</h1>
        <p>申请新设备或借用设备，IT 将在 1-3 个工作日内处理</p>
      </div>
    </div>

    <div class="dr-layout">
      <!-- 申请表单 -->
      <div class="dr-main">
        <transition name="fade-slide" mode="out-in">
          <!-- 成功状态 -->
          <div v-if="submitted" key="success" class="dr-success">
            <div class="dr-success-icon">📦</div>
            <div class="dr-success-title">申请已提交</div>
            <div class="dr-success-id">申请编号：{{ submittedId }}</div>
            <div class="dr-success-desc">IT 将通过企业微信与你确认，请保持消息畅通</div>
            <button class="dr-new-btn" @click="resetForm">再提交一个申请</button>
          </div>

          <!-- 表单 -->
          <div v-else key="form" class="section-card dr-form">
            <h2 class="dr-form-title">填写申请信息</h2>

            <!-- 设备类型 -->
            <div class="form-group">
              <div class="form-label">设备类型 <span class="form-required">*</span></div>
              <div class="dr-type-grid">
                <button
                  v-for="opt in deviceTypeOptions"
                  :key="opt.value"
                  class="dr-type-btn"
                  :class="{ active: form.deviceType === opt.value }"
                  @click="form.deviceType = opt.value"
                >
                  <span class="dr-type-icon">{{ opt.icon }}</span>
                  <span class="dr-type-label">{{ opt.label }}</span>
                </button>
              </div>
            </div>

            <!-- 申请人 -->
            <div class="dr-row">
              <div class="form-group">
                <label class="form-label">申请人姓名 <span class="form-required">*</span></label>
                <input v-model="form.applicant" class="form-input" placeholder="你的姓名" />
              </div>
              <div class="form-group">
                <label class="form-label">所在部门 <span class="form-required">*</span></label>
                <input v-model="form.department" class="form-input" placeholder="如：财务部" />
              </div>
            </div>

            <!-- 用途 -->
            <div class="form-group">
              <label class="form-label">申请用途 <span class="form-required">*</span></label>
              <textarea v-model="form.purpose" class="form-textarea" rows="3" placeholder="请说明设备用途，如：新员工入职配机、原设备损坏更换..."></textarea>
            </div>

            <!-- 紧急程度 -->
            <div class="form-group">
              <div class="form-label">紧急程度</div>
              <div class="dr-urgency-list">
                <button
                  v-for="opt in urgencyOptions"
                  :key="opt.value"
                  class="dr-urgency-btn"
                  :class="[{ active: form.urgency === opt.value }, `urgency-${opt.value}`]"
                  @click="form.urgency = opt.value as any"
                >
                  <div class="dr-urgency-label">{{ opt.label }}</div>
                  <div class="dr-urgency-desc">{{ opt.desc }}</div>
                </button>
              </div>
            </div>

            <!-- 备注 -->
            <div class="form-group">
              <label class="form-label">补充说明（选填）</label>
              <textarea v-model="form.note" class="form-textarea" rows="2" placeholder="如有特殊要求或补充说明，请在此填写"></textarea>
            </div>

            <div v-if="formError" class="form-error">{{ formError }}</div>

            <button class="btn-primary btn-submit" @click="submitForm">提交申请</button>
          </div>
        </transition>
      </div>

      <!-- 侧边栏 -->
      <div class="dr-sidebar">
        <!-- 处理时效 -->
        <div class="section-card">
          <h3>处理时效</h3>
          <div class="dr-sla-list">
            <div class="dr-sla-item">
              <span class="dr-sla-dot red"></span>
              <div>
                <div class="dr-sla-label">紧急</div>
                <div class="dr-sla-desc">1 个工作日内</div>
              </div>
            </div>
            <div class="dr-sla-item">
              <span class="dr-sla-dot yellow"></span>
              <div>
                <div class="dr-sla-label">普通</div>
                <div class="dr-sla-desc">3-5 个工作日</div>
              </div>
            </div>
            <div class="dr-sla-item">
              <span class="dr-sla-dot gray"></span>
              <div>
                <div class="dr-sla-label">不急</div>
                <div class="dr-sla-desc">按库存情况安排</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 历史申请 -->
        <div class="section-card">
          <h3>近期申请记录</h3>
          <div class="dr-history-list">
            <div v-for="rec in requestHistory" :key="rec.id" class="dr-history-item">
              <div class="dr-history-head">
                <span class="dr-history-id">{{ rec.id }}</span>
                <span class="dr-history-status" :class="`dr-status-${rec.status}`">{{ statusLabel(rec.status) }}</span>
              </div>
              <div class="dr-history-device">{{ rec.deviceLabel }} · {{ rec.applicant }}</div>
              <div class="dr-history-date">{{ rec.submittedAt }}</div>
              <div v-if="rec.note" class="dr-history-note">{{ rec.note }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { deviceTypeOptions, urgencyOptions, requestHistory, type DeviceType, type RequestUrgency } from '../data/device-request'

const submitted = ref(false)
const submittedId = ref('')
const formError = ref('')

const form = reactive({
  deviceType: '' as DeviceType | '',
  applicant: '',
  department: '',
  purpose: '',
  urgency: 'normal' as RequestUrgency,
  note: '',
})

function submitForm() {
  formError.value = ''
  if (!form.deviceType) { formError.value = '请选择设备类型'; return }
  if (!form.applicant.trim()) { formError.value = '请填写申请人姓名'; return }
  if (!form.department.trim()) { formError.value = '请填写所在部门'; return }
  if (!form.purpose.trim()) { formError.value = '请填写申请用途'; return }

  const num = String(requestHistory.length + 1).padStart(3, '0')
  submittedId.value = `REQ-2026-${num}`
  submitted.value = true
}

function resetForm() {
  submitted.value = false
  form.deviceType = ''
  form.applicant = ''
  form.department = ''
  form.purpose = ''
  form.urgency = 'normal'
  form.note = ''
}

function statusLabel(s: string) {
  const map: Record<string, string> = {
    pending: '待处理', approved: '已审批',
    processing: '处理中', done: '已完成', rejected: '已拒绝',
  }
  return map[s] ?? s
}
</script>
