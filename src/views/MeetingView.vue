<template>
  <div class="container">
    <div class="breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span>/</span>
      <span>会议室设备使用</span>
    </div>

    <div class="detail-header">
      <div>
        <h1>会议室设备使用</h1>
        <p>投影仪、扩展坞、激光笔的使用说明，以及企业微信、钉钉在线会议操作指引。</p>
      </div>
    </div>

    <!-- Tab 切换 -->
    <div class="meeting-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="meeting-tab"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        <span>{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <div class="detail-grid">
      <div class="detail-main">

        <!-- 投影仪 -->
        <template v-if="activeTab === 'projector'">
          <div class="detail-card">
            <h3>投影仪连接与使用</h3>
            <p class="card-desc">会议室配备 HDMI 连接线，支持笔记本和台式机接入。</p>
            <div class="step-list">
              <div class="step-item">
                <strong>1. 开启投影仪</strong>
                <div>按下投影仪遥控器或机身上的电源键，等待约 30 秒预热，指示灯变为绿色后即可使用。</div>
              </div>
              <div class="step-item">
                <strong>2. 连接电脑</strong>
                <div>将 HDMI 线一端插入投影仪 HDMI 接口，另一端插入电脑 HDMI 接口。<br>
                  <span class="step-note">💡 笔记本没有 HDMI 接口？使用扩展坞转接，见「扩展坞」标签页。</span>
                </div>
              </div>
              <div class="step-item">
                <strong>3. 切换信号源</strong>
                <div>按遥控器「Source / 信号源」键，选择「HDMI」，等待画面出现。</div>
              </div>
              <div class="step-item">
                <strong>4. 调整显示模式</strong>
                <div>按键盘 <kbd>Win</kbd> + <kbd>P</kbd> 选择显示模式：<br>
                  · <strong>复制</strong>：电脑和投影仪显示相同画面（推荐演示用）<br>
                  · <strong>扩展</strong>：投影仪作为第二屏幕<br>
                  · <strong>仅第二屏幕</strong>：只在投影仪显示
                </div>
              </div>
              <div class="step-item">
                <strong>5. 调整投影画面</strong>
                <div>
                  · 对焦：旋转镜头上的对焦环，直到画面清晰<br>
                  · 梯形校正：按遥控器「Keystone」键调整画面变形<br>
                  · 亮度/音量：通过遥控器对应按键调节
                </div>
              </div>
              <div class="step-item">
                <strong>6. 使用完毕关机</strong>
                <div>按遥控器电源键，屏幕提示「再按一次确认关机」，再次按下确认。<strong>请勿直接断电</strong>，需等待风扇停转后再断电，避免损坏灯泡。</div>
              </div>
            </div>
          </div>

          <div class="detail-card">
            <h3>投影仪常见问题</h3>
            <div class="faq-two-grid" style="margin-top: 0;">
              <div class="faq-simple-item">
                <div class="faq-simple-q">投影仪有画面但电脑没有信号</div>
                <div class="faq-simple-a">按 Win+P 重新选择显示模式，或拔插 HDMI 线重新连接。</div>
              </div>
              <div class="faq-simple-item">
                <div class="faq-simple-q">画面模糊或有色差</div>
                <div class="faq-simple-a">旋转镜头对焦环调整清晰度，检查 HDMI 线是否插紧。</div>
              </div>
              <div class="faq-simple-item">
                <div class="faq-simple-q">投影仪无法开机</div>
                <div class="faq-simple-a">检查电源线是否插好，确认电源插座有电。若指示灯闪烁红色，可能是灯泡需要更换，联系 IT。</div>
              </div>
              <div class="faq-simple-item">
                <div class="faq-simple-q">投影画面比例不对</div>
                <div class="faq-simple-a">在电脑显示设置中调整分辨率为 1920×1080，或按遥控器「Aspect」键切换比例。</div>
              </div>
            </div>
          </div>
        </template>

        <!-- 扩展坞 -->
        <template v-if="activeTab === 'dock'">
          <div class="detail-card">
            <h3>扩展坞使用说明</h3>
            <p class="card-desc">扩展坞可为笔记本提供 HDMI、USB、网口等接口，一根线连接多个设备。</p>
            <div class="step-list">
              <div class="step-item">
                <strong>1. 连接扩展坞</strong>
                <div>将扩展坞的 USB-C 线插入笔记本的 USB-C / Thunderbolt 接口。<br>
                  <span class="step-note">⚠️ 部分扩展坞需要 USB-C 供电接口，请确认笔记本接口类型。</span>
                </div>
              </div>
              <div class="step-item">
                <strong>2. 连接投影仪 / 显示器</strong>
                <div>将 HDMI 线插入扩展坞的 HDMI 接口，另一端连接投影仪或显示器。连接后按 Win+P 选择显示模式。</div>
              </div>
              <div class="step-item">
                <strong>3. 连接其他设备</strong>
                <div>
                  · USB 接口：连接鼠标、键盘、U 盘等<br>
                  · 网口（RJ45）：连接网线，比 Wi-Fi 更稳定<br>
                  · 3.5mm 音频：连接音箱或耳机
                </div>
              </div>
              <div class="step-item">
                <strong>4. 断开连接</strong>
                <div>直接拔出 USB-C 线即可断开所有连接。如有 U 盘等存储设备，请先在系统托盘「安全弹出」后再拔出。</div>
              </div>
            </div>
          </div>

          <div class="detail-card">
            <h3>扩展坞接口说明</h3>
            <div class="interface-grid">
              <div class="interface-item">
                <span class="interface-icon">🔌</span>
                <div>
                  <div class="interface-name">USB-C（连接电脑）</div>
                  <div class="interface-desc">连接笔记本，支持数据传输和充电</div>
                </div>
              </div>
              <div class="interface-item">
                <span class="interface-icon">📺</span>
                <div>
                  <div class="interface-name">HDMI</div>
                  <div class="interface-desc">连接投影仪或外接显示器</div>
                </div>
              </div>
              <div class="interface-item">
                <span class="interface-icon">🌐</span>
                <div>
                  <div class="interface-name">RJ45 网口</div>
                  <div class="interface-desc">有线网络接入，稳定性优于 Wi-Fi</div>
                </div>
              </div>
              <div class="interface-item">
                <span class="interface-icon">💾</span>
                <div>
                  <div class="interface-name">USB-A × 3</div>
                  <div class="interface-desc">连接鼠标、键盘、U 盘等 USB 设备</div>
                </div>
              </div>
              <div class="interface-item">
                <span class="interface-icon">🎵</span>
                <div>
                  <div class="interface-name">3.5mm 音频</div>
                  <div class="interface-desc">连接音箱或耳机</div>
                </div>
              </div>
              <div class="interface-item">
                <span class="interface-icon">⚡</span>
                <div>
                  <div class="interface-name">USB-C PD 充电</div>
                  <div class="interface-desc">为笔记本同步充电（部分型号支持）</div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- 激光笔 -->
        <template v-if="activeTab === 'laser'">
          <div class="detail-card">
            <h3>激光笔使用说明</h3>
            <p class="card-desc">会议室配备无线激光笔，支持 PPT 翻页和激光指示，有效距离约 15 米。</p>
            <div class="step-list">
              <div class="step-item">
                <strong>1. 插入接收器</strong>
                <div>将激光笔附带的 USB 接收器插入电脑 USB 接口，系统会自动识别，无需安装驱动。</div>
              </div>
              <div class="step-item">
                <strong>2. 开启激光笔</strong>
                <div>按下激光笔侧面的电源键（或直接按功能键），指示灯亮起表示已连接成功。</div>
              </div>
              <div class="step-item">
                <strong>3. 按键功能说明</strong>
                <div>
                  <div class="key-grid">
                    <div class="key-item"><kbd>▶</kbd><span>下一页 / 向前翻页</span></div>
                    <div class="key-item"><kbd>◀</kbd><span>上一页 / 向后翻页</span></div>
                    <div class="key-item"><kbd>●</kbd><span>按住发射激光（红点）</span></div>
                    <div class="key-item"><kbd>■</kbd><span>黑屏 / 取消黑屏</span></div>
                  </div>
                </div>
              </div>
              <div class="step-item">
                <strong>4. 使用激光指示</strong>
                <div>按住激光键，红色光点出现在屏幕上，用于指示重点内容。<br>
                  <span class="step-note">⚠️ 请勿将激光直射他人眼睛，激光笔为 Class 2 激光，直视有害。</span>
                </div>
              </div>
              <div class="step-item">
                <strong>5. 使用完毕</strong>
                <div>长按电源键关闭激光笔，拔出 USB 接收器放回激光笔收纳槽，放回原位。</div>
              </div>
            </div>
          </div>

          <div class="detail-card">
            <h3>激光笔常见问题</h3>
            <div class="faq-link-list">
              <div class="faq-link-card">
                <div class="faq-link-title">激光笔无法翻页</div>
                <div class="faq-link-desc">确认 USB 接收器已插入电脑，且激光笔已开机（指示灯亮）。尝试拔插接收器重新连接。</div>
              </div>
              <div class="faq-link-card">
                <div class="faq-link-title">激光笔没有激光</div>
                <div class="faq-link-desc">检查电池是否有电，激光笔通常使用 AAA 电池，电量不足时激光会变暗或消失。</div>
              </div>
              <div class="faq-link-card">
                <div class="faq-link-title">翻页不灵敏或跳页</div>
                <div class="faq-link-desc">缩短与接收器的距离，避免遮挡。确认 PPT 处于全屏放映状态。</div>
              </div>
            </div>
          </div>
        </template>

        <!-- 企业微信会议 -->
        <template v-if="activeTab === 'wecom'">
          <div class="detail-card">
            <h3>企业微信在线会议</h3>
            <p class="card-desc">企业微信支持视频会议，适合内部团队会议，无需额外安装软件。</p>

            <div class="meeting-section-title">发起会议</div>
            <div class="step-list">
              <div class="step-item">
                <strong>1. 发起视频会议</strong>
                <div>在企业微信中，进入群聊或单聊，点击右上角「+」→「视频会议」，选择参会人员后发起。</div>
              </div>
              <div class="step-item">
                <strong>2. 通过会议功能发起</strong>
                <div>点击底部导航「工作台」→「会议」→「发起会议」，可设置会议主题、时间和参会人。</div>
              </div>
              <div class="step-item">
                <strong>3. 预约会议</strong>
                <div>在「会议」页面点击「预约会议」，填写会议信息后发送邀请，参会人会收到日历提醒。</div>
              </div>
            </div>

            <div class="meeting-section-title" style="margin-top: 20px;">会议中操作</div>
            <div class="meeting-func-grid">
              <div class="meeting-func-item">
                <span class="mfi-icon">🎤</span>
                <div class="mfi-name">麦克风</div>
                <div class="mfi-desc">点击静音 / 取消静音，进入会议默认静音</div>
              </div>
              <div class="meeting-func-item">
                <span class="mfi-icon">📷</span>
                <div class="mfi-name">摄像头</div>
                <div class="mfi-desc">开启 / 关闭摄像头</div>
              </div>
              <div class="meeting-func-item">
                <span class="mfi-icon">🖥️</span>
                <div class="mfi-name">共享屏幕</div>
                <div class="mfi-desc">分享整个屏幕或指定窗口</div>
              </div>
              <div class="meeting-func-item">
                <span class="mfi-icon">💬</span>
                <div class="mfi-name">聊天</div>
                <div class="mfi-desc">会议中发送文字消息</div>
              </div>
              <div class="meeting-func-item">
                <span class="mfi-icon">👥</span>
                <div class="mfi-name">成员管理</div>
                <div class="mfi-desc">查看参会人、邀请他人加入</div>
              </div>
              <div class="meeting-func-item">
                <span class="mfi-icon">📝</span>
                <div class="mfi-name">会议纪要</div>
                <div class="mfi-desc">会后自动生成纪要（需开启）</div>
              </div>
            </div>
          </div>
        </template>

        <!-- 钉钉会议 -->
        <template v-if="activeTab === 'dingtalk'">
          <div class="detail-card">
            <h3>钉钉在线会议</h3>
            <p class="card-desc">钉钉视频会议支持大规模参会，适合跨公司、跨部门的外部会议。</p>

            <div class="meeting-section-title">发起会议</div>
            <div class="step-list">
              <div class="step-item">
                <strong>1. 即时发起</strong>
                <div>打开钉钉，点击首页「视频会议」图标，选择参会人后立即发起。或在群聊中点击「+」→「视频会议」。</div>
              </div>
              <div class="step-item">
                <strong>2. 预约会议</strong>
                <div>点击「工作」→「视频会议」→「预约会议」，填写主题、时间、参会人，支持设置会议密码。</div>
              </div>
              <div class="step-item">
                <strong>3. 通过会议号加入</strong>
                <div>点击「加入会议」，输入 9 位会议号即可加入，适合外部人员参会。</div>
              </div>
            </div>

            <div class="meeting-section-title" style="margin-top: 20px;">会议中操作</div>
            <div class="meeting-func-grid">
              <div class="meeting-func-item">
                <span class="mfi-icon">🎤</span>
                <div class="mfi-name">麦克风</div>
                <div class="mfi-desc">静音 / 取消静音，支持一键全员静音</div>
              </div>
              <div class="meeting-func-item">
                <span class="mfi-icon">📷</span>
                <div class="mfi-name">摄像头</div>
                <div class="mfi-desc">开启 / 关闭摄像头</div>
              </div>
              <div class="meeting-func-item">
                <span class="mfi-icon">🖥️</span>
                <div class="mfi-name">共享屏幕</div>
                <div class="mfi-desc">共享屏幕、窗口或白板</div>
              </div>
              <div class="meeting-func-item">
                <span class="mfi-icon">✋</span>
                <div class="mfi-name">举手</div>
                <div class="mfi-desc">申请发言，主持人可看到</div>
              </div>
              <div class="meeting-func-item">
                <span class="mfi-icon">⏺️</span>
                <div class="mfi-name">录制</div>
                <div class="mfi-desc">录制会议，保存到云端（需权限）</div>
              </div>
              <div class="meeting-func-item">
                <span class="mfi-icon">🎨</span>
                <div class="mfi-name">虚拟背景</div>
                <div class="mfi-desc">设置虚拟背景或模糊背景</div>
              </div>
            </div>

            <div class="meeting-tip-banner">
              <span>💡</span>
              <span>外部参会人可通过浏览器直接加入钉钉会议，无需安装钉钉 App，适合与客户或供应商开会。</span>
            </div>
          </div>
        </template>

      </div>

      <!-- 侧边栏 -->
      <div class="detail-side">
        <div class="faq-card">
          <h3>会议室设备清单</h3>
          <div class="device-checklist">
            <div class="device-check-item">
              <span class="dci-icon">📽️</span>
              <div>
                <div class="dci-name">投影仪</div>
                <div class="dci-desc">含遥控器、电源线</div>
              </div>
              <span class="dci-status online">可用</span>
            </div>
            <div class="device-check-item">
              <span class="dci-icon">🔌</span>
              <div>
                <div class="dci-name">HDMI 连接线</div>
                <div class="dci-desc">2m，放置在会议桌上</div>
              </div>
              <span class="dci-status online">可用</span>
            </div>
            <div class="device-check-item">
              <span class="dci-icon">🔗</span>
              <div>
                <div class="dci-name">扩展坞</div>
                <div class="dci-desc">USB-C 多接口扩展</div>
              </div>
              <span class="dci-status online">可用</span>
            </div>
            <div class="device-check-item">
              <span class="dci-icon">🖊️</span>
              <div>
                <div class="dci-name">激光笔</div>
                <div class="dci-desc">无线翻页笔，含接收器</div>
              </div>
              <span class="dci-status online">可用</span>
            </div>
          </div>
        </div>

        <div class="faq-card" style="margin-top: 16px;">
          <h3>使用须知</h3>
          <ul>
            <li>使用完毕请关闭投影仪，等待风扇停转后再断电。</li>
            <li>HDMI 线、扩展坞、激光笔用完请放回原位。</li>
            <li>设备损坏或丢失请及时联系 IT 报备。</li>
            <li>会议室设备如有故障，请提交工单或联系 IT。</li>
          </ul>
        </div>

        <RouterLink to="/ticket" class="meeting-ticket-btn">
          📋 设备故障？提交工单
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = [
  { key: 'projector', label: '投影仪', icon: '📽️' },
  { key: 'dock', label: '扩展坞', icon: '🔌' },
  { key: 'laser', label: '激光笔', icon: '🖊️' },
  { key: 'wecom', label: '企业微信会议', icon: '💬' },
  { key: 'dingtalk', label: '钉钉会议', icon: '📱' },
]

const activeTab = ref('projector')
</script>
