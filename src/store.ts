import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const usePrototype = defineStore('prototype', () => {
  const role = ref('Manager'),
    tenant = ref('Northwind Hospitality'),
    restaurant = ref('Harbour Kitchen'),
    workspace = ref('Service'),
    theme = ref<'light' | 'dark'>('light'),
    connection = ref('Connected'),
    demoState = ref('Ready'),
    queue = ref(2)
  const isDark = computed(() => theme.value === 'dark')
  function cycleConnection() {
    const states = ['Connected', 'Reconnecting', 'Resynchronizing', 'Degraded', 'Offline']
    connection.value = states[(states.indexOf(connection.value) + 1) % states.length]
  }
  return {
    role,
    tenant,
    restaurant,
    workspace,
    theme,
    connection,
    demoState,
    queue,
    isDark,
    cycleConnection,
  }
})
