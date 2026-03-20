<template>
  <div class="ai-chat-wrap">
    <!-- 触发按钮 -->
    <transition name="float-panel-fade">
      <div v-if="open" class="ai-chat-panel">
        <div class="ai-chat-head">
          <div class="ai-chat-head-left">
            <div class="ai-avatar-dot"></div>
            <div>
              <div class="ai-chat-title">IT 智能助手</div>
              <div class="ai-chat-status">{{ isTyping ? '正在输入…' : '在线' }}</div>
            </div>
          </div>
          <button class="ai-chat-close" @click="open = false">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <!-- 消息区 -->
        <div class="ai-chat-messages" ref="msgBox">
          <!-- 欢迎消息 -->
          <div class="ai-msg ai-msg-bot">
            <div class="ai-msg-avatar">🤖</div>
            <div class="ai-msg-bubble">
              你好！我是 IT 智能助手，可以帮你解答 IT 相关问题。<br>
              <span class="ai-msg-hint">例如：打印机怎么安装？Wi-Fi 密码是多少？</span>
            </div>
          </div>

          <!-- 快捷问题 -->
          <div v-if="messages.length === 0" class="ai-quick-questions">
            <button
              v-for="q in quickQuestions"
              :key="q"
              class="ai-quick-btn"
              @click="sendMessage(q)"
            >{{ q }}</button>
          </div>

          <!-- 对话消息 -->
          <template v-for="(msg, i) in messages" :key="i">
            <div class="ai-msg" :class="msg.role === 'user' ? 'ai-msg-user' : 'ai-msg-bot'">
              <div v-if="msg.role === 'bot'" class="ai-msg-avatar">🤖</div>
              <div class="ai-msg-bubble" v-html="formatMsg(msg.content)"></div>
            </div>
          </template>

          <!-- 打字动画 -->
          <div v-if="isTyping" class="ai-msg ai-msg-bot">
            <div class="ai-msg-avatar">🤖</div>
            <div class="ai-msg-bubble ai-typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>

        <!-- 输入区 -->
        <div class="ai-chat-input-wrap">
          <div class="ai-chat-input-row">
            <textarea
              v-model="inputText"
              class="ai-chat-input"
              placeholder="输入你的问题…"
              rows="1"
              @keydown.enter.exact.prevent="handleSend"
              @input="autoResize"
              ref="inputRef"
            ></textarea>
            <button
              class="ai-send-btn"
              :disabled="!inputText.trim() || isTyping"
              @click="handleSend"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
          <div class="ai-chat-footer">
            <span>按 Enter 发送 · Shift+Enter 换行</span>
            <span class="ai-model-tag">演示模式</span>
          </div>
        </div>
      </div>
    </transition>

    <!-- 悬浮按钮 -->
    <button class="ai-float-btn" :class="{ active: open }" @click="toggleChat" title="IT 智能助手">
      <transition name="ai-icon-fade" mode="out-in">
        <svg v-if="!open" key="open" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.19-1.45L2 22l1.45-4.81A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></svg>
        <svg v-else key="close" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </transition>
      <span v-if="!open" class="ai-float-label">AI 助手</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { faqItems } from '../data/faq'

interface Message {
  role: 'user' | 'bot'
  content: string
}

const open = ref(false)
const inputText = ref('')
const messages = ref<Message[]>([])
const isTyping = ref(false)
const msgBox = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLTextAreaElement | null>(null)

const quickQuestions = [
  '打印机怎么安装？',
  'Wi-Fi 密码是多少？',
  '如何连接海外网络？',
  '忘记 Windows 密码怎么办？',
]

// ---- 本地知识库匹配（演示用，后续替换为真实 API 调用）----
const knowledgeBase: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['打印机', '安装', '驱动', '共享盘'],
    answer: '安装打印机需要三步：\n1. 复制共享盘路径 `\\\\192.168.120.252\\itsupport\\打印机驱动\\安装说明`\n2. 在资源管理器地址栏粘贴路径，用账号 `it_ro` / 密码 `Sws888888` 连接\n3. 找到对应楼层的 `.bat` 文件双击运行即可\n\n详细步骤可查看 [打印机安装页面](/printer)。',
  },
  {
    keywords: ['wifi', 'wi-fi', '无线', '密码', '网络密码'],
    answer: 'Wi-Fi 统一密码是 `SWS88888888`\n\nWi-Fi 名称按楼层：\n- 1/2号楼一楼：`seaways-5G-1F`\n- 1/2号楼二楼：`seaways-5G`\n- 1/2号楼三楼：`seaways-5G-3F`\n- 3号楼：`seaways-5G`',
  },
  {
    keywords: ['有线', '网线', '网络', '接入', '上网'],
    answer: '有线网络接入很简单：将网线插入电脑网口，系统会自动获取 IP 地址，等待几秒即可上网。\n\n如果插上网线后仍无法上网，可以查看 [办公网络页面](/network) 了解排查方法。',
  },
  {
    keywords: ['海外', '代理', '节点', 'vpn', '翻墙'],
    answer: '海外网络使用步骤：\n1. 联系 IT 获取节点压缩包\n2. 解压后运行客户端\n3. 选择节点并开启系统代理\n\n详细说明请查看 [海外网络页面](/overseas-network)。',
  },
  {
    keywords: ['密码', '忘记', '重置', 'windows', '登录'],
    answer: 'Windows 登录密码忘记了，需要联系 IT 协助重置。\n\n请通过企业微信联系 **黎灿** 或 **曹杰珲**，说明你的工位和设备情况，IT 会尽快处理。',
  },
  {
    keywords: ['erp', '金蝶', '系统', '账号'],
    answer: 'ERP 系统相关问题请联系 **王文林**（ERP 管理员）。\n\n- 账号开通 / 权限申请：企业微信联系王文林\n- 系统使用问题：可查看语雀知识库中的 ERP 使用手册',
  },
  {
    keywords: ['工单', '提交', '报修', '问题'],
    answer: '你可以通过 [提交工单页面](/ticket) 提交 IT 问题，填写问题类型和描述后提交，IT 会通过企业微信跟进处理。\n\n紧急问题建议直接企业微信联系 IT，响应更快。',
  },
  {
    keywords: ['软件', '安装', '下载'],
    answer: '常用软件可以在 [软件下载中心](/software) 找到，包括 WPS、火绒、远程工具等。\n\n如果需要安装其他软件，请通过企业微信联系 IT，说明软件名称和用途，由 IT 评估后协助处理。',
  },
  {
    keywords: ['状态', '系统', '在线', '监控'],
    answer: '可以在 [系统状态看板](/status) 查看各系统和设备的实时运行状态，包括打印机、内网服务、Wi-Fi 等。',
  },
]

function findAnswer(q: string): string {
  const lower = q.toLowerCase()

  // 先匹配 FAQ
  const faqMatch = faqItems.find(f =>
    f.q.toLowerCase().split(/\s+/).some(w => lower.includes(w) && w.length > 1)
  )

  // 再匹配知识库
  const kbMatch = knowledgeBase.find(kb =>
    kb.keywords.some(k => lower.includes(k))
  )

  if (kbMatch) return kbMatch.answer
  if (faqMatch) return `**${faqMatch.q}**\n\n${faqMatch.a}`

  return '这个问题我暂时没有找到准确答案。建议你：\n1. 查看 [常见故障自查](#faq) 列表\n2. 通过企业微信联系 IT 支持\n3. 或者 [提交工单](/ticket) 让 IT 跟进处理'
}

function formatMsg(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="ai-code">$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="ai-link">$1</a>')
    .replace(/\n/g, '<br>')
}

async function sendMessage(text: string) {
  const q = text.trim()
  if (!q) return

  messages.value.push({ role: 'user', content: q })
  inputText.value = ''
  if (inputRef.value) inputRef.value.style.height = 'auto'

  await scrollToBottom()

  isTyping.value = true
  await scrollToBottom()

  // 模拟思考延迟（后续替换为真实 API 调用）
  // 真实接入时替换此处：
  // const res = await fetch('/api/ai/chat', { method: 'POST', body: JSON.stringify({ message: q }) })
  // const data = await res.json()
  // const answer = data.answer
  await new Promise(r => setTimeout(r, 800 + Math.random() * 600))
  const answer = findAnswer(q)

  isTyping.value = false
  messages.value.push({ role: 'bot', content: answer })
  await scrollToBottom()
}

function handleSend() {
  sendMessage(inputText.value)
}

function toggleChat() {
  open.value = !open.value
  if (open.value) {
    nextTick(() => inputRef.value?.focus())
  }
}

function autoResize(e: Event) {
  const el = e.target as HTMLTextAreaElement
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 120) + 'px'
}

async function scrollToBottom() {
  await nextTick()
  if (msgBox.value) {
    msgBox.value.scrollTop = msgBox.value.scrollHeight
  }
}
</script>
