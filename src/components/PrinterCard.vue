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
        </div>

        <div class="path-box">安装脚本：{{ printer.batFile }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PrinterItem } from '../data/printers'

defineProps<{
  printer: PrinterItem
}>()
</script>
