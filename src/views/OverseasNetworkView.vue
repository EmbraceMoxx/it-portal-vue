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
          本页用于说明海外网络的使用方式。
          如需访问海外网站、服务或业务平台，请按照以下说明配置代理客户端并启用系统代理。
        </p>
      </div>
    </div>

    <div class="detail-grid">
      <div class="detail-main">
        <div class="detail-card">
          <h3>一、客户端说明</h3>
          <div class="step-list">
            <div class="step-item">
              <strong>v2rayN 简介</strong>
              <div>
                v2rayN 是 Windows 系统下的代理客户端，支持 VMess、VLESS、Trojan、Socks、Shadowsocks 等多种代理协议。
              </div>
            </div>
          </div>
        </div>

        <div class="detail-card">
          <h3>二、获取节点信息</h3>
          <div class="step-list">
            <div class="step-item">
              <strong>节点获取方式</strong>
              <div>
                海外节点信息可联系 <strong>IT-曹杰珲</strong> 获取节点压缩包。
              </div>
            </div>
          </div>
        </div>

        <div class="detail-card">
          <h3>三、安装与启动</h3>
          <div class="step-list">
            <div class="step-item">
              <strong>1. 下载压缩包</strong>
              <div>将节点压缩包下载到本地电脑。</div>
            </div>
            <div class="step-item">
              <strong>2. 解压文件</strong>
              <div>右键压缩包，选择“解压到当前文件夹”。</div>
            </div>
            <div class="step-item">
              <strong>3. 启动客户端</strong>
              <div>
                解压后打开文件夹，找到 <strong>v2rayN.exe</strong>，右键以管理员身份运行即可使用。
              </div>
            </div>
          </div>
        </div>

        <div class="detail-card">
          <h3>四、添加订阅 / 节点</h3>
          <div class="step-list">
            <div class="step-item">
              <strong>配置说明</strong>
              <div>
                添加完节点信息后，开启系统代理并选择合适的路由模式，即可开始使用代理服务器上网。
              </div>
            </div>
          </div>
        </div>

        <div class="detail-card">
          <h3>五、系统代理</h3>
          <div class="step-list">
            <div class="step-item">
              <strong>1. 开启系统代理</strong>
              <div>
                在任务栏右下角系统托盘找到软件图标，右键点击，
                选择 <strong>系统代理 → 自动配置系统代理</strong>。
              </div>
            </div>
            <div class="step-item">
              <strong>2. 状态确认</strong>
              <div>
                设置成功后，软件图标会显示为红色，此时即可开始使用代理网络。
              </div>
            </div>
          </div>
        </div>

        <div class="detail-card">
          <h3>六、路由模式</h3>
          <div class="step-list">
            <div class="step-item">
              <strong>绕过大陆（Whitelist）模式</strong>
              <div>仅白名单内的网站通过节点服务器代理上网，一般办公场景建议优先使用该模式。</div>
            </div>
            <div class="step-item">
              <strong>黑名单（Blacklist）模式</strong>
              <div>除黑名单内的网站外，其余网站都通过节点服务器代理上网。</div>
            </div>
            <div class="step-item">
              <strong>全局（Global）模式</strong>
              <div>所有网站均通过节点服务器代理上网。</div>
            </div>
            <div class="step-item">
              <strong>推荐设置</strong>
              <div>通常建议使用 <strong>绕过大陆模式</strong>。</div>
            </div>
          </div>
        </div>

        <div class="detail-card">
          <h3>七、开机自动启动</h3>
          <div class="step-list">
            <div class="step-item">
              <strong>设置方式</strong>
              <div>
                打开 v2rayN 主界面，进入 <strong>设置 → 参数设置 → v2rayN 设置</strong>，
                勾选 <strong>开机自动启动</strong>，然后点击确认即可。
              </div>
            </div>
          </div>
        </div>

        <div class="detail-card">
          <h3>八、关闭代理</h3>
          <div class="step-list">
            <div class="step-item">
              <strong>退出方式</strong>
              <div>
                如当前无需使用海外节点，可在 v2rayN 中点击“退出”关闭软件。
              </div>
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
          <h3>使用提示</h3>
          <ul>
            <li>请先联系 IT 获取节点压缩包后再进行配置。</li>
            <li>建议先完成系统代理配置，再测试海外网站访问是否正常。</li>
            <li>不使用代理时，请及时退出 v2rayN，避免影响日常网络访问。</li>
            <li>如配置或连接异常，请联系 IT 支持处理。</li>
          </ul>
        </div>

        <div class="faq-card">
          <h3>获取帮助</h3>
          <ul>
            <li>海外节点信息可联系：IT-曹杰珲</li>
            <li>如代理无法连接或访问异常，请联系 IT 支持。</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>