import { reactive } from 'vue'

interface ToastState {
  visible: boolean
  message: string
}

export const toastState = reactive<ToastState>({
  visible: false,
  message: '',
})

let toastTimer: number | null = null

export function showToast(message: string) {
  toastState.message = message
  toastState.visible = true

  if (toastTimer) {
    window.clearTimeout(toastTimer)
  }

  toastTimer = window.setTimeout(() => {
    toastState.visible = false
  }, 2600)
}

export function useClipboard() {
  const copyText = async (text: string, successMessage = '已复制内容') => {
    try {
      await navigator.clipboard.writeText(String(text || ''))
      showToast(successMessage)
    } catch (error) {
      showToast('复制失败，请手动复制')
      window.prompt('请手动复制以下内容：', String(text || ''))
    }
  }

  return {
    copyText,
  }
}