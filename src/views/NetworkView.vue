<template>
  <div class="container">
    <div class="breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span>/</span>
      <span>办公网络</span>
    </div>

    <div class="detail-header">
      <div>
        <div class="eyebrow">网络服务</div>
        <h1>办公网络</h1>
        <p>
          本页用于说明公司办公网络的接入方式，包括有线网络和无线网络。
          如需访问公司内部系统、共享目录、打印服务等资源，请先确认当前已正确接入办公网络。
        </p>
      </div>
    </div>

    <div class="detail-grid">
      <div class="detail-main">
        <div class="detail-card">
          <h3>有线网络</h3>
          <div class="step-list">
            <div v-for="(step, index) in wiredSteps" :key="`wired-${index}`" class="step-item step-image-item">
              <strong>{{ index + 1 }}. {{ step.title }}</strong>
              <div class="step-text">{{ step.text }}</div>
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
          <h3>无线网络</h3>
          <div class="step-list">
            <div v-for="(step, index) in wifiSteps" :key="`wifi-${index}`" class="step-item step-image-item">
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
            <li>办公室内访问 ERP、共享目录、打印服务等内部资源。</li>
            <li>办公区域内通过有线网络或无线网络接入公司办公环境。</li>
          </ul>
        </div>

        <div class="faq-card">
          <h3>温馨提示</h3>
          <ul>
            <li>办公场景下建议优先使用有线网络，稳定性更高。</li>
            <li>如使用无线网络，请连接当前楼层对应的办公 Wi-Fi。</li>
            <li>如无法访问内部系统，请先确认是否已接入公司办公网络。</li>
            <li>如网络异常，请联系 IT 支持处理。</li>
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

const wiredSteps: StepItem[] = [
  {
    title: '连接网线',
    text: '每个工位均配有网线，可将网线接入笔记本电脑网口或台式主机网口。',
    image: '/images/network/wired-step-1.png',
  },
  {
    title: '等待自动获取 IP',
    text: '接入后等待系统自动获取 IP 地址，成功后即可使用办公网络。',
    image: '/images/network/wired-step-2.png',
  },
  {
    title: '确认连接状态',
    text: '可查看电脑右下角任务栏网络图标，确认当前是否已成功接入有线网络。',
    image: '/images/network/wired-step-3.png',
  },
]

const wifiSteps: StepItem[] = [
  {
    title: '选择对应 Wi-Fi',
    text: `
      <div>1号楼 &amp; 2号楼一楼：seaways-5G-1F / 密码：SWS88888888</div>
      <div>1号楼 &amp; 2号楼二楼：seaways-5G / 密码：SWS88888888</div>
      <div>1号楼 &amp; 2号楼三楼：seaways-5G-3F / 密码：SWS88888888</div>
      <div>3号楼：seaways-5G / 密码：SWS88888888</div>
    `,
    image: '/images/network/wifi-step-1.png',
  },
  {
    title: '输入密码并连接',
    text: '连接对应楼层的办公 Wi-Fi，输入密码后即可接入办公网络。',
    image: '/images/network/wifi-step-2.png',
  },
  {
    title: '确认网络可用',
    text: '连接成功后，可访问日常办公系统和内部资源。如信号不稳定，建议优先使用有线网络。',
    image: '/images/network/wifi-step-3.png',
  },
]

const faqLinks: FaqLinkItem[] = [
  {
    title: '网线接上后还是无法上网怎么办？',
    desc: '查看网卡状态、IP 获取情况和基础排查方法。',
    url: 'https://www.yuque.com/你的语雀地址/office-network/faq-wired',
  },
  {
    title: '无线网络连接成功但打不开内部系统怎么办？',
    desc: '查看是否连错 Wi-Fi、网络受限或访问异常。',
    url: 'https://www.yuque.com/你的语雀地址/office-network/faq-wifi',
  },
  {
    title: '网络图标异常或频繁掉线怎么办？',
    desc: '查看常见异常现象及处理建议。',
    url: 'https://www.yuque.com/你的语雀地址/office-network/faq-disconnect',
  },
]
</script>