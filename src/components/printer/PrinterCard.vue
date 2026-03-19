<template>
  <div class="printer-card card">
    <div class="printer-head">
      <div class="printer-content">
        <div class="printer-title-row">
          <h3>{{ printer.name }}</h3>
          <span class="status">{{ printer.status }}</span>
        </div>
        <div class="printer-meta">
          <div>位置：{{ printer.location }}</div>
          <div>IP：{{ printer.ip }}</div>
          <div>驱动：{{ printer.driver }}</div>
          <div>说明：{{ printer.remark }}</div>
        </div>
        <div class="path-box">脚本：{{ printer.scriptPath }}</div>
      </div>
      <div class="actions">
        <button class="btn-primary" @click="$emit('copy')">复制脚本路径</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  printer: {
    id: number
    name: string
    ip: string
    location: string
    driver: string
    scriptPath: string
    remark: string
    status: string
  }
}>()

defineEmits<{
  (e: 'copy'): void
}>()
</script>