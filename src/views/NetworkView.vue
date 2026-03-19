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
          本页用于说明公司办公网络的使用方式，包括有线网络和无线网络。
          如需访问公司内部系统、共享目录、打印服务等资源，请优先确保当前已正确接入办公网络。
        </p>
      </div>
    </div>

    <div class="detail-grid">
      <div class="detail-main">
        <div class="detail-card">
          <h3>一、有线网络</h3>
          <div class="step-list">
            <div class="step-item">
              <strong>1. 接入方式</strong>
              <div>
                每个工位均配有网线，可将网线接入笔记本电脑网口或台式主机网口，
                接入后等待系统自动获取 IP 地址即可使用。
              </div>
            </div>
            <div class="step-item">
              <strong>2. 使用说明</strong>
              <div>
                有线网络接入成功后，可直接访问公司内部系统、共享目录、打印服务及其他办公资源。
              </div>
            </div>
            <div class="step-item">
              <strong>3. 状态确认</strong>
              <div>
                可查看电脑右下角任务栏网络图标，确认当前是否已成功接入有线网络。
              </div>
            </div>
          </div>
        </div>

        <div class="detail-card">
          <h3>二、无线网络</h3>
          <div class="step-list">
            <div class="step-item">
              <strong>1. 办公 Wi-Fi 信息</strong>
              <div>
                <div>1号楼 &amp; 2号楼一楼：seaways-5G-1F / 密码：SWS88888888</div>
                <div>1号楼 &amp; 2号楼二楼：seaways-5G / 密码：SWS88888888</div>
                <div>1号楼 &amp; 2号楼三楼：seaways-5G-3F / 密码：SWS88888888</div>
                <div>3号楼：seaways-5G / 密码：SWS88888888</div>
              </div>
            </div>
            <div class="step-item">
              <strong>2. 使用说明</strong>
              <div>
                连接对应楼层的办公 Wi-Fi 后，即可正常访问日常办公网络资源。
                如信号较弱或网络不稳定，建议优先使用有线网络。
              </div>
            </div>
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
          <h3>使用提示</h3>
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
</script>