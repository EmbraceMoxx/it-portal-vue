<template>
  <RouterView />

  <transition name="top-toast-fade">
    <div v-if="toastState.visible" class="top-toast">
      {{ toastState.message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { toastState } from './composables/useClipboard'
</script>