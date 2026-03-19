import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/printer', name: 'printer', component: () => import('../views/PrinterView.vue') },
    { path: '/erp', name: 'erp', component: () => import('../views/ErpView.vue') },
    { path: '/network', name: 'network', component: () => import('../views/NetworkView.vue') },
    { path: '/software', name: 'software', component: () => import('../views/SoftwareView.vue') },
  ],
})

export default router