<template>
  <div class="container">
    <div class="breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span>/</span>
      <span>海外网络</span>
    </div>

    <div class="detail-header">
      <div>
        <div class="eyebrow">网络服务</div>
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
          <div class="step-list">
            <div v-for="(step, index) in overseasSteps" :key="index" class="step-item step-image-item">
              <strong>{{ index + 1 }}. {{ step.title }}</strong>
              <div class="step-text" v-html="step.text"></div>
              <img
                v-if="step.image"
                :src="step.image"
                :alt="step.title"
                class="step-image"
              />
            </div>
          </div>
        </div>

        <div class="detail-card">
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

      <div class="detail-side">
        <div class="faq-card">
          <h3>适用场景</h3>
          <ul>
            <li>访问海外网站、海外服务或海外业务平台。</li>
            <li>需要通过代理方式访问受限网络资源的办公场景。</li>
          </ul>
        </div>

        <div class="faq-card">
          <h3>温馨提示</h3>
          <ul>
            <li>请先联系 IT 获取节点压缩包后再进行配置。</li>
            <li>建议先完成系统代理配置，再测试海外网站访问是否正常。</li>
            <li>不使用代理时，请及时退出 v2rayN，避免影响日常网络访问。</li>
            <li>如配置或连接异常，请联系 IT 支持处理。</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface StepItem {
  title: string
  text: string
  image?: string
}

interface FaqLinkItem {
  title: string
  desc: string
  url: string
}

const overseasSteps: StepItem[] = [
  {
    title: '获取节点压缩包',
    text: '海外节点信息可联系 <strong>IT-曹杰珲</strong> 获取节点压缩包。',
    image: '/images/overseas/step-1.png',
  },
  {
    title: '解压文件',
    text: '将节点压缩包下载到本地电脑后，右键解压到当前文件夹。',
    image: '/images/overseas/step-2.png',
  },
  {
    title: '启动客户端',
    text: '解压后打开文件夹，找到 <strong>v2rayN.exe</strong>，右键以管理员身份运行。',
    image: '/images/overseas/step-3.png',
  },
  {
    title: '添加节点信息',
    text: '按提供的节点信息完成导入或添加订阅。',
    image: '/images/overseas/step-4.png',
  },
  {
    title: '开启系统代理',
    text: '在任务栏右下角系统托盘找到软件图标，右键选择 <strong>系统代理 → 自动配置系统代理</strong>。',
    image: '/images/overseas/step-5.png',
  },
  {
    title: '选择路由模式',
    text: '一般建议选择 <strong>绕过大陆模式</strong>，按需使用海外代理。',
    image: '/images/overseas/step-6.png',
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