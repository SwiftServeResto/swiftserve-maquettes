<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { usePrototype } from './store'
const p = usePrototype()
const logoUrl = `${import.meta.env.BASE_URL}brand/swiftserve-symbol.webp`
const links = [
  ['Design system', '/design-system'],
  ['Web auth', '/web/auth'],
  ['SaaS', '/web/saas'],
  ['Restaurant', '/web/restaurant'],
  ['Staff', '/web/staff'],
  ['Menus', '/web/menus'],
  ['Tables', '/web/tables'],
  ['Orders', '/web/orders'],
  ['Kitchen', '/web/kitchen'],
  ['Payments', '/web/payments'],
  ['Staff app', '/staff/service'],
  ['Offline', '/staff/offline'],
]
</script>
<template>
  <div class="app" :data-theme="p.theme">
    <header class="top">
      <RouterLink to="/" class="brand" aria-label="SwiftServe prototype home"
        ><img class="brand-symbol" :src="logoUrl" alt="" /><span
          >SwiftServe <small>Interactive product prototype</small></span
        ></RouterLink
      ><button
        class="icon-button"
        aria-label="Toggle light and dark theme"
        @click="p.theme = p.theme === 'light' ? 'dark' : 'light'"
      >
        ◐
      </button>
    </header>
    <div class="layout">
      <nav class="side" aria-label="Prototype navigation">
        <RouterLink v-for="l in links" :key="l[1]" :to="l[1]">{{ l[0] }}</RouterLink>
      </nav>
      <main><RouterView /></main>
      <aside class="control" aria-label="Prototype controls">
        <strong>Prototype controls</strong
        ><label
          >Role<select v-model="p.role">
            <option>Waiter</option>
            <option>Chef</option>
            <option>Manager</option>
            <option>RestaurantOwner</option>
            <option>SaasAdmin</option>
          </select></label
        ><label
          >Tenant<select v-model="p.tenant">
            <option>Northwind Hospitality</option>
            <option>Coastal Dining Group</option>
          </select></label
        ><label
          >Restaurant<select v-model="p.restaurant">
            <option>Harbour Kitchen</option>
            <option>Market Square Grill</option>
          </select></label
        ><label
          >Workspace<select v-model="p.workspace">
            <option>Service</option>
            <option>Kitchen</option>
            <option>Management</option>
          </select></label
        ><label
          >State<select v-model="p.demoState">
            <option>Ready</option>
            <option>Loading</option>
            <option>Empty</option>
            <option>Error</option>
            <option>Forbidden</option>
            <option>Offline</option>
            <option>Conflict</option>
          </select></label
        ><button @click="p.cycleConnection">{{ p.connection }}</button
        ><small>Simulation only — not authorization.</small>
      </aside>
    </div>
  </div>
</template>
