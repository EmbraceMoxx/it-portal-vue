<template>
  <RouterLink :to="item.to" class="module-card module-link">
    <div class="module-top">
      <div class="module-icon">{{ item.icon }}</div>
      <div class="module-tag">{{ item.tag }}</div>
    </div>
    <h3>{{ item.title }}</h3>
    <p>{{ item.desc }}</p>
    <div class="module-meta">{{ item.meta }}</div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { PortalModule } from '../data/modules'

defineProps<{
  item: PortalModule
}>()
</script>