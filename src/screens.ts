export type Screen = {
  id: string
  title: string
  description: string
  permission: string
  api: string
  events?: string[]
  kind?: string
  role: string
  purpose: string
  uniqueContent: string[]
  actions: string[]
  interactionPath: string
  responsive: string
  states: string
  status: 'Complete' | 'Generalized' | 'Missing'
}
const fixtureFor = (title: string) => {
  const key = title.toLowerCase()
  if (key.includes('tenant'))
    return [
      'Northwind Hospitality · Active · 3 restaurants',
      'Coastal Dining Group · Suspended · 2 restaurants',
      'New tenant form · Legal name and billing contact',
    ]
  if (key.includes('staff') || key.includes('role'))
    return [
      'Amara Okafor · Manager · Active',
      'Noah Williams · Waiter · Active',
      'Sofia Chen · Chef · Invited',
    ]
  if (
    key.includes('menu') ||
    key.includes('category') ||
    key.includes('modifier') ||
    key.includes('item')
  )
    return [
      'Dinner menu · Published',
      'Mains · Position 2 · 8 items',
      'Truffle fries · NGN 4,500 · Available',
    ]
  if (key.includes('table') || key.includes('session') || key.includes('guest'))
    return [
      'Table 07 · Available · 4 seats',
      'Table 12 · Occupied · 3 guests',
      'Session TS-1842 · Payment requested',
    ]
  if (key.includes('order') || key.includes('draft') || key.includes('submit'))
    return [
      'Order #1042 · Table 12 · Preparing',
      'Jollof bowl ×2 · Extra chicken',
      'Snapshot · Jollof bowl · NGN 8,500',
    ]
  if (
    key.includes('kitchen') ||
    key.includes('ticket') ||
    key.includes('preparation') ||
    key.includes('ready')
  )
    return [
      'Ticket #1042 · 08:42 elapsed',
      'Jollof bowl ×2 · Preparing',
      'Plantain side ×1 · Ready',
    ]
  if (key.includes('payment') || key.includes('refund'))
    return [
      'Payment PAY-2084 · NGN 21,500 · Captured',
      'Card ending 4242 · 14:32',
      'Refund eligibility · NGN 21,500',
    ]
  if (
    key.includes('login') ||
    key.includes('account') ||
    key.includes('session') ||
    key.includes('restoration')
  )
    return [
      'Email · manager@example.test',
      'Restaurant · Harbour Kitchen',
      'Safe return · /web/orders',
    ]
  if (
    key.includes('offline') ||
    key.includes('retry') ||
    key.includes('conflict') ||
    key.includes('reconnect') ||
    key.includes('synchron')
  )
    return [
      'Operation OP-782 · Same idempotency key',
      'Retry after · 12 seconds',
      'Scope · Northwind / Harbour Kitchen',
    ]
  return [`${title} · Harbour Kitchen`, 'Open orders · 18', 'Operational status · Connected']
}
const actionsFor = (title: string) => {
  const key = title.toLowerCase()
  if (key.includes('login')) return ['Sign in', 'Get help']
  if (key.includes('create') || key.includes('open'))
    return [`Create ${title.replace(/^Create /, '').toLowerCase()}`, 'Cancel']
  if (key.includes('suspend')) return ['Suspend tenant', 'Reactivate tenant']
  if (key.includes('refund')) return ['Confirm refund', 'Keep payment']
  if (key.includes('submit')) return ['Submit order', 'Return to draft']
  if (key.includes('ready')) return ['Mark ready', 'Return to preparing']
  if (key.includes('conflict')) return ['Reload canonical state', 'Discard local change']
  if (key.includes('offline') || key.includes('retry'))
    return ['Retry safely', 'Discard eligible operation']
  return [`Open ${title.toLowerCase()}`, `Filter ${title.toLowerCase()}`]
}
const roleFor = (permission: string) =>
  permission.startsWith('saas.') || permission.startsWith('tenants.')
    ? 'SaasAdmin'
    : permission.startsWith('kitchen.')
      ? 'Chef'
      : permission === 'anonymous'
        ? 'Anonymous'
        : 'Manager / permitted staff'
const w = (
  id: string,
  title: string,
  permission: string,
  api: string,
  events: string[] = [],
  kind = 'management',
): Screen => ({
  id,
  title,
  description: `Interactive ${title.toLowerCase()} maquette using deterministic restaurant fixtures.`,
  permission,
  api,
  events,
  kind,
  role: roleFor(permission),
  purpose: `Complete the ${title.toLowerCase()} workflow without contacting production services.`,
  uniqueContent: fixtureFor(title),
  actions: actionsFor(title),
  interactionPath: `${title} → validate fixture state → confirm or return`,
  responsive: 'Desktop table/cards · tablet rail · phone stacked cards and bottom navigation',
  states: 'Ready · loading · empty · error · forbidden · offline · conflict',
  status: 'Complete',
})
export const groups: Record<string, Screen[]> = {
  'web-auth': [
    w('WEB-AUTH-01', 'Login', 'anonymous', 'POST /api/v1/auth/login'),
    w('WEB-AUTH-02', 'Invalid credentials', 'anonymous', 'POST /api/v1/auth/login'),
    w('WEB-AUTH-03', 'Locked account', 'anonymous', 'POST /api/v1/auth/login'),
    w('WEB-AUTH-04', 'Session expired', 'authenticated', 'POST /api/v1/auth/refresh'),
    w('WEB-AUTH-05', 'Forgot-password information', 'anonymous', 'Future / Not implemented'),
  ],
  'web-saas': [
    w('WEB-SAAS-01', 'Tenant list', 'saas.tenants.read', 'GET /api/v1/tenants'),
    w('WEB-SAAS-02', 'Tenant details', 'tenants.read', 'GET /api/v1/tenants/{id}'),
    w('WEB-SAAS-03', 'Create tenant', 'tenants.create', 'POST /api/v1/tenants'),
    w(
      'WEB-SAAS-04',
      'Suspend or activate tenant',
      'tenants.suspend',
      'POST /api/v1/tenants/{id}/suspend',
    ),
    w(
      'WEB-SAAS-05',
      'Authorized restaurant scope',
      'saas.restaurants.read',
      'GET /api/v1/restaurants',
    ),
  ],
  'web-restaurant': [
    w('WEB-REST-01', 'Operational dashboard', 'restaurants.read', 'GET /api/v1/restaurants/{id}'),
    w('WEB-REST-02', 'Restaurant profile', 'restaurants.update', 'PUT /api/v1/restaurants/{id}'),
    w('WEB-REST-03', 'Connection degraded', 'restaurants.read', 'GET /health/ready', [], 'state'),
  ],
  'web-staff': [
    w('WEB-STAFF-01', 'Staff list', 'staff.read', 'GET /api/v1/staff'),
    w('WEB-STAFF-02', 'Create staff member', 'staff.create', 'POST /api/v1/staff'),
    w('WEB-STAFF-03', 'Change staff role', 'staff.update', 'PUT /api/v1/staff/{id}'),
    w('WEB-STAFF-04', 'Staff lifecycle', 'staff.deactivate', 'POST /api/v1/staff/{id}/deactivate'),
  ],
  'web-menus': [
    w('WEB-MENU-01', 'Menu catalogue', 'menus.read', 'GET /api/v1/menus', ['menu.changed']),
    w('WEB-MENU-02', 'Category management', 'menus.update', 'PUT /api/v1/menus/{id}', [
      'menu.changed',
    ]),
    w('WEB-MENU-03', 'Menu item editor', 'menus.update', 'PUT /api/v1/menu-items/{id}', [
      'menu_item.price_changed',
    ]),
    w(
      'WEB-MENU-04',
      'Modifier groups and options',
      'menus.update',
      'PUT /api/v1/modifier-groups/{id}',
      ['menu.changed'],
    ),
  ],
  'web-tables': [
    w('WEB-TABLE-01', 'Table overview', 'tables.read', 'GET /api/v1/tables', [
      'table.status_changed',
    ]),
    w('WEB-TABLE-02', 'Floor grid', 'tables.read', 'GET /api/v1/tables', ['table.status_changed']),
    w('WEB-TABLE-03', 'Open session', 'sessions.open', 'POST /api/v1/table-sessions', [
      'table_session.opened',
    ]),
    w(
      'WEB-TABLE-04',
      'Active and payment-requested session',
      'sessions.close',
      'GET /api/v1/table-sessions',
      ['table_session.payment_requested'],
    ),
  ],
  'web-orders': [
    w('WEB-ORDER-01', 'Order list', 'orders.read', 'GET /api/v1/orders', ['order.created']),
    w('WEB-ORDER-02', 'Draft order editor', 'orders.update', 'PUT /api/v1/orders/{id}', [
      'order.item_changed',
    ]),
    w('WEB-ORDER-03', 'Submit order', 'orders.submit', 'POST /api/v1/orders/{id}/submit', [
      'order.submitted',
    ]),
    w(
      'WEB-ORDER-04',
      'Concurrency conflict',
      'orders.update',
      'GET /api/v1/orders/{id}',
      [],
      'conflict',
    ),
  ],
  'web-kitchen': [
    w('WEB-KITCHEN-01', 'Kitchen board', 'kitchen.read', 'GET /api/v1/kitchen', [
      'order.submitted',
      'order.ready',
    ]),
    w(
      'WEB-KITCHEN-02',
      'Kitchen ticket details',
      'kitchen.prepare',
      'POST /api/v1/kitchen/{id}/start',
      ['order.preparation_started'],
    ),
    w(
      'WEB-KITCHEN-03',
      'Realtime resynchronization',
      'kitchen.read',
      'GET /api/v1/kitchen',
      [],
      'state',
    ),
  ],
  'web-payments': [
    w('WEB-PAY-01', 'Payment list', 'payments.read', 'GET /api/v1/payments', ['payment.created']),
    w('WEB-PAY-02', 'Create payment', 'payments.create', 'POST /api/v1/payments', [
      'payment.status_changed',
    ]),
    w('WEB-PAY-03', 'Refund confirmation', 'payments.refund', 'POST /api/v1/payments/{id}/refund', [
      'payment.refunded',
    ]),
    w(
      'WEB-PAY-04',
      'Refund conflict',
      'payments.refund',
      'GET /api/v1/payments/{id}',
      [],
      'conflict',
    ),
  ],
  'staff-auth': [
    w('STAFF-AUTH-01', 'Session restoration', 'authenticated', 'GET /api/v1/auth/me'),
    w('STAFF-AUTH-02', 'Staff login', 'anonymous', 'POST /api/v1/auth/login'),
    w(
      'STAFF-AUTH-03',
      'Offline restoration',
      'authenticated',
      'GET /api/v1/auth/me',
      [],
      'offline',
    ),
    w(
      'STAFF-AUTH-04',
      'Session expired',
      'authenticated',
      'POST /api/v1/auth/refresh',
      [],
      'state',
    ),
  ],
  'staff-workspaces': [
    w('STAFF-WS-01', 'Workspace selection', 'authenticated', 'GET /api/v1/auth/me'),
    w('STAFF-WS-02', 'Single workspace direct entry', 'authenticated', 'GET /api/v1/auth/me'),
  ],
  'staff-service': [
    w('STAFF-SVC-01', 'Service dashboard', 'tables.read', 'GET /api/v1/tables', [
      'table.status_changed',
    ]),
    w(
      'STAFF-SVC-02',
      'Table details and open session',
      'sessions.open',
      'POST /api/v1/table-sessions',
      ['table_session.opened'],
    ),
    w('STAFF-SVC-03', 'Draft order and add item', 'orders.update', 'PUT /api/v1/orders/{id}', [
      'order.item_changed',
    ]),
    w('STAFF-SVC-04', 'Modifiers and order summary', 'orders.update', 'GET /api/v1/menus', [
      'menu.changed',
    ]),
    w(
      'STAFF-SVC-05',
      'Submit and order progress',
      'orders.submit',
      'POST /api/v1/orders/{id}/submit',
      ['order.submitted', 'order.ready'],
    ),
    w(
      'STAFF-SVC-06',
      'Request payment and close',
      'sessions.close',
      'POST /api/v1/table-sessions/{id}/close',
      ['table_session.payment_requested'],
    ),
  ],
  'staff-kitchen': [
    w('STAFF-KIT-01', 'Kitchen board', 'kitchen.read', 'GET /api/v1/kitchen', ['order.submitted']),
    w('STAFF-KIT-02', 'Ticket preparation', 'kitchen.prepare', 'POST /api/v1/kitchen/{id}/start', [
      'order.preparation_started',
    ]),
    w(
      'STAFF-KIT-03',
      'Mark order ready',
      'kitchen.complete',
      'POST /api/v1/kitchen/{id}/complete',
      ['order.ready'],
    ),
    w('STAFF-KIT-04', 'Realtime reconnect', 'kitchen.read', 'GET /api/v1/kitchen', [], 'state'),
  ],
  'staff-management': [
    w('STAFF-MGT-01', 'Management dashboard', 'restaurants.read', 'GET /api/v1/restaurants/{id}'),
    w('STAFF-MGT-02', 'Staff overview', 'staff.read', 'GET /api/v1/staff'),
    w('STAFF-MGT-03', 'Menu availability', 'menus.update', 'PUT /api/v1/menu-items/{id}', [
      'menu_item.availability_changed',
    ]),
    w('STAFF-MGT-04', 'Operational alerts', 'orders.read', 'GET /api/v1/orders', ['order.ready']),
  ],
  'staff-offline': [
    w(
      'STAFF-OFF-01',
      'Pending operation queue',
      'orders.create',
      'POST /api/v1/orders',
      [],
      'offline',
    ),
    w(
      'STAFF-OFF-02',
      'Retry-After scheduling',
      'orders.submit',
      'POST /api/v1/orders/{id}/submit',
      [],
      'offline',
    ),
    w(
      'STAFF-OFF-03',
      'Changed-payload conflict',
      'orders.submit',
      'GET /api/v1/orders/{id}',
      [],
      'conflict',
    ),
    w(
      'STAFF-OFF-04',
      'Recovered interrupted operation',
      'orders.create',
      'POST /api/v1/orders',
      [],
      'state',
    ),
  ],
}
