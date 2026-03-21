import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/',                name: 'home',           component: () => import('../views/HomeView.vue') },
  { path: '/printer',         name: 'printer',        component: () => import('../views/PrinterView.vue') },
  { path: '/erp',             name: 'erp',            component: () => import('../views/ErpView.vue') },
  { path: '/network',         name: 'network',        component: () => import('../views/NetworkView.vue') },
  { path: '/overseas-network',name: 'overseas-network',component: () => import('../views/OverseasNetworkView.vue') },
  { path: '/software',        name: 'software',       component: () => import('../views/SoftwareView.vue') },
  { path: '/status',          name: 'status',         component: () => import('../views/StatusView.vue') },
  { path: '/ticket',          name: 'ticket',         component: () => import('../views/TicketView.vue') },
  { path: '/assets',          name: 'assets',         component: () => import('../views/AssetsView.vue') },
  { path: '/scan',            name: 'scan',           component: () => import('../views/ScanView.vue') },
  { path: '/meeting',         name: 'meeting',        component: () => import('../views/MeetingView.vue') },
  { path: '/project',         name: 'project',        component: () => import('../views/ProjectView.vue') },
  { path: '/onboarding',      name: 'onboarding',     component: () => import('../views/OnboardingView.vue') },
  { path: '/kb',              name: 'kb',             component: () => import('../views/KbView.vue') },
  { path: '/device-request',  name: 'device-request', component: () => import('../views/DeviceRequestView.vue') },
  { path: '/announcements',   name: 'announcements',  component: () => import('../views/AnnouncementsView.vue') },
  { path: '/network-map',     name: 'network-map',    component: () => import('../views/NetworkMapView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router