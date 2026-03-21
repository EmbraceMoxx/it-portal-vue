<template>
  <div class="container page-scan">
    <div class="breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span>/</span>
      <RouterLink to="/printer">打印机安装</RouterLink>
      <span>/</span>
      <span>扫描使用教程</span>
    </div>

    <div class="detail-header">
      <div>
        <h1>一体机扫描使用教程</h1>
        <p>EPSON L15160 支持扫描功能，可将纸质文件扫描为 PDF 或图片，保存到电脑指定位置。</p>
      </div>
    </div>

    <div class="detail-grid">
      <div class="detail-main">

        <!-- 方式一：从打印机面板扫描 -->
        <div class="detail-card">
          <h3>方式一：从打印机面板直接扫描</h3>
          <p class="card-desc">适合快速扫描，直接在打印机上操作，文件保存到预设位置。</p>
          <div class="step-list">
            <div class="step-item">
              <strong>1. 放置文件</strong>
              <div>将需要扫描的文件正面朝下放在扫描玻璃板上，对齐左上角标记。或使用自动进纸器（ADF）放入多页文件。</div>
            </div>
            <div class="step-item">
              <strong>2. 选择扫描模式</strong>
              <div>在打印机触摸屏上点击「扫描」，选择扫描目标：<br>
                · <strong>扫描到电脑</strong>：文件保存到已连接的电脑<br>
                · <strong>扫描到邮件</strong>：直接发送到邮箱（需提前配置）<br>
                · <strong>扫描到云端</strong>：上传到云存储
              </div>
            </div>
            <div class="step-item">
              <strong>3. 选择目标电脑</strong>
              <div>选择「扫描到电脑」后，屏幕会显示已安装驱动的电脑列表，选择你的电脑名称。</div>
            </div>
            <div class="step-item">
              <strong>4. 设置扫描参数</strong>
              <div>根据需要选择：<br>
                · 文件格式：PDF（推荐）/ JPEG / TIFF<br>
                · 分辨率：200dpi（普通文件）/ 300dpi（清晰存档）<br>
                · 颜色：彩色 / 灰度 / 黑白
              </div>
            </div>
            <div class="step-item">
              <strong>5. 开始扫描</strong>
              <div>确认设置后按「开始」，扫描完成后文件会自动保存到电脑的「文档 → Epson Scan」文件夹。</div>
            </div>
          </div>
        </div>

        <!-- 方式二：从电脑软件扫描 -->
        <div class="detail-card">
          <h3>方式二：从电脑软件扫描（推荐）</h3>
          <p class="card-desc">通过 Epson Scan 2 软件操作，可以更精细地控制扫描参数，适合需要高质量扫描的场景。</p>
          <div class="step-list">
            <div class="step-item">
              <strong>1. 打开 Epson Scan 2</strong>
              <div>在电脑上打开「开始菜单」，搜索并打开「Epson Scan 2」。如未安装，请先完成打印机驱动安装（驱动包含扫描软件）。</div>
            </div>
            <div class="step-item">
              <strong>2. 放置文件并选择来源</strong>
              <div>将文件放在扫描玻璃板上，在软件中选择扫描来源：<br>
                · <strong>平板</strong>：单页文件放在玻璃板上<br>
                · <strong>自动文件进纸器（单面）</strong>：多页单面文件<br>
                · <strong>自动文件进纸器（双面）</strong>：多页双面文件
              </div>
            </div>
            <div class="step-item">
              <strong>3. 设置扫描参数</strong>
              <div>
                · 文档类型：文字文档 / 照片<br>
                · 图像类型：彩色 / 灰度 / 黑白<br>
                · 分辨率：200dpi（日常）/ 300dpi（存档）/ 600dpi（高清）<br>
                · 输出格式：PDF / JPEG / PNG
              </div>
            </div>
            <div class="step-item">
              <strong>4. 预览（可选）</strong>
              <div>点击「预览」可以先查看扫描效果，拖动裁剪框调整扫描范围，确认无误后再正式扫描。</div>
            </div>
            <div class="step-item">
              <strong>5. 扫描并保存</strong>
              <div>点击「扫描」，选择保存位置和文件名，点击「保存」完成。多页文件会自动合并为一个 PDF。</div>
            </div>
          </div>
        </div>

        <!-- 扫描技巧 -->
        <div class="detail-card">
          <h3>扫描小技巧</h3>
          <div class="tips-grid">
            <div class="tip-item">
              <span class="tip-icon">📄</span>
              <div>
                <div class="tip-title">多页合并 PDF</div>
                <div class="tip-desc">使用自动进纸器（ADF）一次放入多页，软件会自动合并为单个 PDF 文件。</div>
              </div>
            </div>
            <div class="tip-item">
              <span class="tip-icon">🔍</span>
              <div>
                <div class="tip-title">提高文字清晰度</div>
                <div class="tip-desc">扫描合同、文件等需要清晰文字时，选择 300dpi + 灰度模式，文件更小且清晰。</div>
              </div>
            </div>
            <div class="tip-item">
              <span class="tip-icon">🖼️</span>
              <div>
                <div class="tip-title">扫描照片</div>
                <div class="tip-desc">扫描照片建议选择 600dpi + 彩色模式，效果更好，但文件较大。</div>
              </div>
            </div>
            <div class="tip-item">
              <span class="tip-icon">📐</span>
              <div>
                <div class="tip-title">文件放置技巧</div>
                <div class="tip-desc">文件放置时对齐玻璃板左上角的箭头标记，确保扫描完整不裁边。</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="detail-side">
        <div class="faq-card">
          <h3>常见问题</h3>
          <div class="faq-link-list">
            <div class="faq-link-card">
              <div class="faq-link-title">找不到 Epson Scan 2 软件？</div>
              <div class="faq-link-desc">请先完成打印机驱动安装，驱动包中已包含扫描软件，安装后可在开始菜单找到。</div>
            </div>
            <div class="faq-link-card">
              <div class="faq-link-title">扫描到电脑时找不到我的电脑？</div>
              <div class="faq-link-desc">确认电脑已安装打印机驱动，且电脑与打印机在同一网络下。可尝试重启 Epson Scan 软件。</div>
            </div>
            <div class="faq-link-card">
              <div class="faq-link-title">扫描出来的文件太大怎么办？</div>
              <div class="faq-link-desc">降低分辨率（200dpi 即可满足日常需求），或选择灰度/黑白模式，可大幅减小文件体积。</div>
            </div>
            <div class="faq-link-card">
              <div class="faq-link-title">扫描图像有条纹或模糊？</div>
              <div class="faq-link-desc">清洁扫描玻璃板表面，用干净的软布轻轻擦拭，避免使用酒精或化学清洁剂。</div>
            </div>
            <div class="faq-link-card">
              <div class="faq-link-title">自动进纸器卡纸怎么办？</div>
              <div class="faq-link-desc">打开 ADF 盖板，轻轻取出卡住的纸张，避免强行拉扯。取出后重新整理纸张再放入。</div>
            </div>
          </div>
        </div>

        <div class="faq-card" style="margin-top: 16px;">
          <h3>扫描文件保存位置</h3>
          <ul>
            <li>默认保存路径：<code style="font-size:12px;">文档 → Epson Scan 2</code></li>
            <li>可在软件设置中修改默认保存路径</li>
            <li>建议按日期或项目建立子文件夹管理</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
