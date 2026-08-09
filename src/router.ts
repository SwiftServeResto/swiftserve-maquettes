import { createRouter, createWebHistory } from 'vue-router'
import DesignSystem from './views/DesignSystem.vue'
import Gallery from './views/Gallery.vue'
const routes = [
  ['/web/auth', 'web-auth'],
  ['/web/saas', 'web-saas'],
  ['/web/restaurant', 'web-restaurant'],
  ['/web/staff', 'web-staff'],
  ['/web/menus', 'web-menus'],
  ['/web/tables', 'web-tables'],
  ['/web/orders', 'web-orders'],
  ['/web/kitchen', 'web-kitchen'],
  ['/web/payments', 'web-payments'],
  ['/staff/auth', 'staff-auth'],
  ['/staff/workspaces', 'staff-workspaces'],
  ['/staff/service', 'staff-service'],
  ['/staff/kitchen', 'staff-kitchen'],
  ['/staff/management', 'staff-management'],
  ['/staff/offline', 'staff-offline'],
].map(([path, group]) => ({ path, component: Gallery, props: { group } }))
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/design-system' },
    { path: '/design-system', component: DesignSystem },
    ...routes,
    { path: '/:pathMatch(.*)*', redirect: '/design-system' },
  ],
})
