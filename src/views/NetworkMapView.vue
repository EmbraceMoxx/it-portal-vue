<template>
  <div class="container page-network-map">
    <div class="detail-header" style="border-left-color: #0d9488;">
      <div>
        <h1>网络拓扑图</h1>
        <p>公司内网结构可视化 · 点击节点查看详情</p>
      </div>
      <div class="nm-legend">
        <div v-for="(cfg, type) in nodeTypeConfig" :key="type" class="nm-legend-item">
          <span class="nm-legend-dot" :style="{ background: cfg.bg, border: `1.5px solid ${cfg.color}` }">{{ cfg.icon }}</span>
          <span class="nm-legend-label">{{ legendLabel(type) }}</span>
        </div>
      </div>
    </div>

    <!-- 状态汇总 -->
    <div class="nm-summary-row">
      <div class="nm-sum-card nm-sum-green">
        <div class="nm-sum-num">{{ onlineCount }}</div>
        <div class="nm-sum-label">在线节点</div>
      </div>
      <div class="nm-sum-card nm-sum-yellow">
        <div class="nm-sum-num">{{ degradedCount }}</div>
        <div class="nm-sum-label">异常节点</div>
      </div>
      <div class="nm-sum-card nm-sum-gray">
        <div class="nm-sum-num">{{ networkNodes.length }}</div>
        <div class="nm-sum-label">总节点数</div>
      </div>
    </div>

    <!-- 拓扑图 -->
    <div class="section-card nm-topo-card">
      <div class="nm-topo">

        <!-- 第一层：互联网 -->
        <div class="nm-layer nm-layer-internet">
          <div class="nm-layer-label">互联网</div>
          <div class="nm-nodes">
            <div class="nm-node" :class="`nm-node-${getNode('internet').status}`" @click="selectNode('internet')">
              <div class="nm-node-inner" :style="nodeStyle('internet')">
                <span class="nm-node-icon">🌐</span>
              </div>
              <div class="nm-node-label">互联网</div>
            </div>
          </div>
        </div>

        <div class="nm-connector-v"></div>

        <!-- 第二层：防火墙 -->
        <div class="nm-layer">
          <div class="nm-layer-label">边界安全</div>
          <div class="nm-nodes">
            <div class="nm-node" :class="`nm-node-${getNode('firewall').status}`" @click="selectNode('firewall')">
              <div class="nm-node-inner" :style="nodeStyle('firewall')">
                <span class="nm-node-icon">🔥</span>
              </div>
              <div class="nm-node-label">防火墙</div>
              <div class="nm-node-ip">{{ getNode('firewall').ip }}</div>
            </div>
          </div>
        </div>

        <div class="nm-connector-v"></div>

        <!-- 第三层：核心交换机 + 服务器 -->
        <div class="nm-layer">
          <div class="nm-layer-label">核心层</div>
          <div class="nm-nodes nm-nodes-spread">
            <div class="nm-node" :class="`nm-node-${getNode('file-server').status}`" @click="selectNode('file-server')">
              <div class="nm-node-inner" :style="nodeStyle('file-server')">
                <span class="nm-node-icon">💾</span>
              </div>
              <div class="nm-node-label">文件服务器</div>
              <div class="nm-node-ip">{{ getNode('file-server').ip }}</div>
            </div>
            <div class="nm-node nm-node-core" :class="`nm-node-${getNode('core-switch').status}`" @click="selectNode('core-switch')">
              <div class="nm-node-inner nm-node-inner-lg" :style="nodeStyle('core-switch')">
                <span class="nm-node-icon">🔀</span>
              </div>
              <div class="nm-node-label">核心交换机</div>
              <div class="nm-node-ip">{{ getNode('core-switch').ip }}</div>
            </div>
            <div class="nm-node" :class="`nm-node-${getNode('erp-server').status}`" @click="selectNode('erp-server')">
              <div class="nm-node-inner" :style="nodeStyle('erp-server')">
                <span class="nm-node-icon">🖥️</span>
              </div>
              <div class="nm-node-label">ERP 服务器</div>
              <div class="nm-node-ip">{{ getNode('erp-server').ip }}</div>
            </div>
          </div>
        </div>

        <div class="nm-connector-h-row">
          <div class="nm-connector-h"></div>
          <div class="nm-connector-h"></div>
          <div class="nm-connector-h"></div>
          <div class="nm-connector-h"></div>
        </div>

        <!-- 第四层：楼层交换机 + 海外节点 -->
        <div class="nm-layer">
          <div class="nm-layer-label">接入层</div>
          <div class="nm-nodes nm-nodes-spread">
            <div v-for="sw in ['switch-1f','switch-2f','switch-3f']" :key="sw"
              class="nm-node" :class="`nm-node-${getNode(sw).status}`" @click="selectNode(sw)">
              <div class="nm-node-inner" :style="nodeStyle(sw)">
                <span class="nm-node-icon">🔀</span>
              </div>
              <div class="nm-node-label">{{ getNode(sw).label }}</div>
              <div class="nm-node-ip">{{ getNode(sw).ip }}</div>
            </div>
            <div class="nm-node" :class="`nm-node-${getNode('overseas-node').status}`" @click="selectNode('overseas-node')">
              <div class="nm-node-inner" :style="nodeStyle('overseas-node')">
                <span class="nm-node-icon">🚀</span>
              </div>
              <div class="nm-node-label">海外节点</div>
              <div class="nm-node-ip">{{ getNode('overseas-node').latency }}</div>
            </div>
          </div>
        </div>

        <div class="nm-connector-h-row">
          <div class="nm-connector-h"></div>
          <div class="nm-connector-h"></div>
          <div class="nm-connector-h"></div>
        </div>

        <!-- 第五层：终端设备 -->
        <div class="nm-layer">
          <div class="nm-layer-label">终端设备</div>
          <div class="nm-nodes nm-nodes-spread">
            <div v-for="id in ['ap-1f','printer-1f','ap-2f','printer-2f','ap-3f','printer-3f']" :key="id"
              class="nm-node nm-node-sm" :class="`nm-node-${getNode(id).status}`" @click="selectNode(id)">
              <div class="nm-node-inner nm-node-inner-sm" :style="nodeStyle(id)">
                <span class="nm-node-icon-sm">{{ nodeTypeConfig[getNode(id).type]?.icon }}</span>
              </div>
              <div class="nm-node-label-sm">{{ getNode(id).label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 节点详情面板 -->
    <transition name="drawer-fade">
      <div v-if="selectedNode" class="nm-detail-overlay" @click.self="selectedNode = null">
        <div class="nm-detail-panel">
          <div class="nm-detail-head">
            <div class="nm-detail-icon-wrap" :style="{ background: nodeTypeConfig[selectedNode.type]?.bg }">
              <span style="font-size: 24px;">{{ nodeTypeConfig[selectedNode.type]?.icon }}</span>
            </div>
            <div>
              <div class="nm-detail-name">{{ selectedNode.label }}</div>
              <div class="nm-detail-type">{{ legendLabel(selectedNode.type) }}</div>
            </div>
            <span class="nm-detail-status" :class="`nm-status-${selectedNode.status}`">
              {{ statusLabel(selectedNode.status) }}
            </span>
            <button class="kb-drawer-close" @click="selectedNode = null">✕</button>
          </div>
          <div class="nm-detail-body">
            <div v-if="selectedNode.ip" class="nm-detail-row">
              <span class="nm-detail-label">IP 地址</span>
              <span class="nm-detail-val mono">{{ selectedNode.ip }}</span>
            </div>
            <div v-if="selectedNode.floor" class="nm-detail-row">
              <span class="nm-detail-label">位置</span>
              <span class="nm-detail-val">{{ selectedNode.floor }}</span>
            </div>
            <div v-if="selectedNode.latency" class="nm-detail-row">
              <span class="nm-detail-label">延迟</span>
              <span class="nm-detail-val mono">{{ selectedNode.latency }}</span>
            </div>
            <div v-if="selectedNode.desc" class="nm-detail-row">
              <span class="nm-detail-label">说明</span>
              <span class="nm-detail-val">{{ selectedNode.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 节点列表 -->
    <div class="section-card" style="margin-top: 24px;">
      <div class="section-head">
        <div>
          <h2>节点列表</h2>
          <div class="section-subtitle">所有网络节点状态一览</div>
        </div>
      </div>
      <div class="nm-node-table">
        <div v-for="node in networkNodes" :key="node.id" class="nm-table-row" @click="selectNode(node.id)">
          <span class="nm-table-icon" :style="{ background: nodeTypeConfig[node.type]?.bg }">
            {{ nodeTypeConfig[node.type]?.icon }}
          </span>
          <div class="nm-table-body">
            <div class="nm-table-name">{{ node.label }}</div>
            <div class="nm-table-desc">{{ node.desc }}</div>
          </div>
          <span v-if="node.ip" class="nm-table-ip">{{ node.ip }}</span>
          <span v-if="node.latency" class="nm-table-latency">{{ node.latency }}</span>
          <span class="status-badge" :class="`status-badge-${node.status}`">
            <span class="status-dot"></span>
            {{ statusLabel(node.status) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { networkNodes, nodeTypeConfig, type NetworkNode } from '../data/network-map'

const selectedNode = ref<NetworkNode | null>(null)

const onlineCount = computed(() => networkNodes.filter(n => n.status === 'online').length)
const degradedCount = computed(() => networkNodes.filter(n => n.status === 'degraded').length)

function getNode(id: string) {
  return networkNodes.find(n => n.id === id) ?? networkNodes[0]
}

function nodeStyle(id: string) {
  const node = getNode(id)
  const cfg = nodeTypeConfig[node.type]
  return { background: cfg?.bg, border: `2px solid ${cfg?.color}` }
}

function selectNode(id: string) {
  const node = getNode(id)
  selectedNode.value = selectedNode.value?.id === id ? null : node
}

function statusLabel(s: string) {
  if (s === 'online') return '正常'
  if (s === 'degraded') return '异常'
  return '离线'
}

function legendLabel(type: string) {
  const map: Record<string, string> = {
    core: '互联网', firewall: '防火墙', switch: '交换机',
    ap: '无线AP', server: '服务器', overseas: '海外节点', printer: '打印机',
  }
  return map[type] ?? type
}
</script>
