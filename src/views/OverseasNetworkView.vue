<template>
  <div class="container page-overseas">
    <div class="breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span>/</span>
      <span>海外网络</span>
    </div>

    <div class="detail-header">
      <div>
        <h1>海外网络</h1>
        <p>
          本页用于说明海外网络的使用方式。如需访问海外网站、服务或业务平台，
          请按照以下说明安装客户端、导入节点并配置系统代理。
        </p>
      </div>
    </div>

    <div class="detail-grid">
      <div class="detail-main">
        <div class="detail-card">
          <h3>使用步骤</h3>

          <!-- 获取节点提示 -->
          <div class="it-contact-block">
            <div class="it-contact-icon">📦</div>
            <div class="it-contact-body">
              <div class="it-contact-title">使用前，请先联系 IT 获取节点压缩包</div>
              <div class="it-contact-desc">通过企业微信联系 <strong>黎灿</strong>、<strong>曹杰珲</strong>，获取后再按以下步骤操作。</div>
            </div>
          </div>

          <div class="step-list">
            <div v-for="(step, index) in overseasSteps" :key="index" class="step-item step-image-item">
              <strong>{{ index + 1 }}. {{ step.title }}</strong>
              <div class="step-text" v-html="step.text"></div>
              <template v-if="step.images?.length">
                <img
                  v-for="(img, i) in step.images"
                  :key="i"
                  :src="img"
                  :alt="`${step.title} 图${i + 1}`"
                  class="step-image"
                />
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="detail-side">
        <div class="faq-card">
          <h3>适用场景</h3>
          <ul>
            <li>访问海外网站、海外服务或海外业务平台。</li>
            <li>需要通过代理方式访问受限网络资源的办公场景。</li>
          </ul>
        </div>

        <div class="faq-card">
          <h3>常见问题</h3>
          <div class="faq-link-list">
            <a
              v-for="item in faqLinks"
              :key="item.title"
              :href="item.url"
              target="_blank"
              rel="noreferrer"
              class="faq-link-card"
            >
              <div class="faq-link-title">{{ item.title }}</div>
              <div class="faq-link-desc">{{ item.desc }}</div>
              <div class="faq-link-action">查看处理方法 →</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface StepItem {
  title: string
  text: string
  images?: string[]
}

interface FaqLinkItem {
  title: string
  desc: string
  url: string
}

interface FaqLinkItem {
  title: string
  desc: string
  url: string
}

const overseasSteps: StepItem[] = [
  {
    title: '解压文件',
    text: '将节点压缩包下载到本地电脑后，右键解压到当前文件夹。',
    images: ['/images/overseas/step-1.png'],
  },
  {
    title: '启动客户端',
    text: '解压后打开文件夹，找到 <strong style="display:inline">v2rayN.exe</strong>，右键以管理员身份运行。',
    images: ['/images/overseas/step-2.png'],
  },
  {
    title: '不使用时点“退出”关闭软件',
    text: '使用完毕后，右键任务栏托盘中的 v2rayN 图标，选择"退出"关闭软件，避免长期占用系统代理。',
    images: ['/images/overseas/step-4.png'],
  },
]

const faqLinks: FaqLinkItem[] = [
  {
    title: 'v2rayN 启动失败怎么办？',
    desc: '查看客户端无法打开、无响应或权限不足的处理方法。',
    url: 'https://www.yuque.com/你的语雀地址/overseas-network/faq-start',
  },
  {
    title: '系统代理已开但还是无法访问怎么办？',
    desc: '查看系统代理、节点状态和浏览器访问异常的排查方法。',
    url: 'https://www.yuque.com/你的语雀地址/overseas-network/faq-proxy',
  },
  {
    title: '应该选择哪种路由模式？',
    desc: '了解绕过大陆、黑名单、全局三种模式的区别和建议用法。',
    url: 'https://www.yuque.com/你的语雀地址/overseas-network/faq-routing',
  },
]
</script>