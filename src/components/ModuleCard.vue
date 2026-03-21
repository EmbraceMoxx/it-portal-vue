<template>
  <component
    :is="item.comingSoon ? 'div' : RouterLink"
    v-bind="item.comingSoon ? {} : { to: item.to }"
    class="module-card module-link"
    :class="[moduleClass, { 'module-coming-soon': item.comingSoon }]"
  >
    <div class="module-top">
      <div class="module-icon" :class="iconClass">{{ item.icon }}</div>
      <div v-if="item.comingSoon" class="module-tag module-tag-soon">准备上线</div>
      <div v-else class="module-tag" :class="tagClass">{{ item.tag }}</div>
    </div>

    <h3>{{ item.title }}</h3>
    <p>{{ item.desc }}</p>
    <div class="module-footer">
      <div class="module-meta">{{ item.meta }}</div>
      <span v-if="!item.comingSoon" class="module-arrow">→</span>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { PortalModule } from '../data/modules'

const props = defineProps<{
  item: PortalModule
}>()

const moduleClass = computed(() => {
  switch (props.item.key) {
    case 'network': return 'module-network'
    case 'overseas-network': return 'module-overseas'
    case 'printer': return 'module-printer'
    case 'erp': return 'module-erp'
    case 'software': return 'module-software'
    case 'meeting': return 'module-meeting'
    default: return ''
  }
})

const iconClass = computed(() => {
  switch (props.item.key) {
    case 'network': return 'module-icon-network'
    case 'overseas-network': return 'module-icon-overseas'
    case 'printer': return 'module-icon-printer'
    case 'erp': return 'module-icon-erp'
    case 'software': return 'module-icon-software'
    case 'meeting': return 'module-icon-meeting'
    default: return ''
  }
})

const tagClass = computed(() => {
  switch (props.item.key) {
    case 'network': return 'module-tag-network'
    case 'overseas-network': return 'module-tag-overseas'
    case 'printer': return 'module-tag-printer'
    case 'erp': return 'module-tag-erp'
    case 'software': return 'module-tag-software'
    case 'meeting': return 'module-tag-meeting'
    default: return ''
  }
})
</script>
