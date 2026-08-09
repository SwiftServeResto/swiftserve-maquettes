import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { routeManifest } from './route-manifest'
import DesignSystem from './views/DesignSystem.vue'
import Gallery from './views/Gallery.vue'

const routes: RouteRecordRaw[] = routeManifest.map((route) => {
  if (route.kind === 'redirect') return { path: route.path, redirect: route.target }
  if (route.kind === 'design-system') return { path: route.path, component: DesignSystem }
  return { path: route.path, component: Gallery, props: { group: route.group } }
})

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes, { path: '/:pathMatch(.*)*', redirect: '/design-system' }],
})
