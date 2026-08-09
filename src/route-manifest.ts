export const routeManifest = [
  { path: '/', kind: 'redirect', target: '/design-system' },
  { path: '/design-system', kind: 'design-system' },
  { path: '/web/auth', kind: 'gallery', group: 'web-auth' },
  { path: '/web/saas', kind: 'gallery', group: 'web-saas' },
  { path: '/web/restaurant', kind: 'gallery', group: 'web-restaurant' },
  { path: '/web/staff', kind: 'gallery', group: 'web-staff' },
  { path: '/web/menus', kind: 'gallery', group: 'web-menus' },
  { path: '/web/tables', kind: 'gallery', group: 'web-tables' },
  { path: '/web/orders', kind: 'gallery', group: 'web-orders' },
  { path: '/web/kitchen', kind: 'gallery', group: 'web-kitchen' },
  { path: '/web/payments', kind: 'gallery', group: 'web-payments' },
  { path: '/staff/auth', kind: 'gallery', group: 'staff-auth' },
  { path: '/staff/workspaces', kind: 'gallery', group: 'staff-workspaces' },
  { path: '/staff/service', kind: 'gallery', group: 'staff-service' },
  { path: '/staff/kitchen', kind: 'gallery', group: 'staff-kitchen' },
  { path: '/staff/management', kind: 'gallery', group: 'staff-management' },
  { path: '/staff/offline', kind: 'gallery', group: 'staff-offline' },
] as const

export type PublicRoute = (typeof routeManifest)[number]
