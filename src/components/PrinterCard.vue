<template>
  <div class="printer-card">
    <div class="printer-head">
      <div style="flex: 1; min-width: 0">
        <div class="printer-title">
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
        <button class="btn-primary" @click="$emit('copy', printer.scriptPath)">
          复制脚本路径
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PrinterItem } from '../data/printers'

defineProps<{
  printer: PrinterItem
}>()

defineEmits<{
  (e: 'copy', path: string): void
}>()
</script>