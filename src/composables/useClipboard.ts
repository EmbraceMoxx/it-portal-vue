export function useClipboard() {
  const copyText = async (text: string, successMessage = '已复制内容') => {
    try {
      await navigator.clipboard.writeText(String(text || ''))
      window.alert(successMessage)
    } catch {
      window.prompt('请手动复制以下内容：', String(text || ''))
    }
  }

  return {
    copyText,
  }
}