import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/printer',
    name: 'printer',
    component: () => import('../views/PrinterView.vue'),
  },
  {
    path: '/erp',
    name: 'erp',
    component: () => import('../views/ErpView.vue'),
  },
  {
    path: '/network',
    name: 'network',
    component: () => import('../views/NetworkView.vue'),
  },
  {
    path: '/overseas-network',
    name: 'overseas-network',
    component: () => import('../views/OverseasNetworkView.vue'),
  },
  {
    path: '/software',
    name: 'software',
    component: () => import('../views/SoftwareView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router