<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { groups } from '../screens'
import { usePrototype } from '../store'

const props = defineProps<{ group: string }>()
const prototype = usePrototype()
const selected = ref(0)
const query = ref('')
const activity = ref('No prototype action performed yet.')
const dialogOpen = ref(false)
const screens = computed(() =>
  groups[props.group].filter((screen) =>
    screen.title.toLowerCase().includes(query.value.toLowerCase()),
  ),
)
const current = computed(() => screens.value[Math.min(selected.value, screens.value.length - 1)])

watch(
  () => props.group,
  () => {
    selected.value = 0
    dialogOpen.value = false
  },
)
function perform(action: string) {
  activity.value = `${action} simulated for ${current.value.title}. No production request was sent.`
  dialogOpen.value =
    action.toLowerCase().includes('confirm') || action.toLowerCase().includes('submit')
}
function confirmAction() {
  dialogOpen.value = false
  activity.value = 'Confirmed safely with deterministic fixture data.'
}
</script>

<template>
  <section>
    <header class="page-head">
      <div>
        <span class="eyebrow">{{
          props.group.startsWith('staff') ? 'SwiftServe Staff' : 'SwiftServe Web'
        }}</span>
        <h1>{{ props.group.replaceAll('-', ' ') }}</h1>
        <p>
          Responsive contract-mapped maquettes. Fixture: {{ prototype.restaurant }} ·
          {{ prototype.role }}
        </p>
      </div>
      <span class="connection" :class="prototype.connection.toLowerCase()"
        >● {{ prototype.connection }}</span
      >
    </header>
    <label class="search">Find a screen<input v-model="query" type="search" /></label>
    <div class="tabs" role="tablist" aria-label="Screen and state selector">
      <button
        v-for="(screen, index) in screens"
        :key="screen.id"
        :aria-selected="selected === index"
        @click="selected = index"
      >
        {{ screen.title }}
      </button>
    </div>
    <article v-if="current" class="screen" :class="current.kind">
      <header>
        <div>
          <span class="screen-id">{{ current.id }}</span>
          <h2>{{ current.title }}</h2>
          <p>{{ current.purpose }}</p>
        </div>
        <button class="primary" @click="perform(current.actions[0])">
          {{ current.actions[0] }}
        </button>
      </header>
      <div v-if="prototype.demoState === 'Loading'" class="skeleton" aria-label="Loading"></div>
      <div v-else-if="prototype.demoState === 'Empty'" class="empty">
        <b>No matching {{ current.title.toLowerCase() }} data</b>
        <p>Change filters or complete the first supported action.</p>
      </div>
      <div v-else-if="prototype.demoState === 'Error'" class="banner error" role="alert">
        Unable to load {{ current.title.toLowerCase() }}. Reference SWIFT-DEMO-1042.
      </div>
      <div v-else-if="prototype.demoState === 'Forbidden'" class="banner error" role="alert">
        Permission rejected. The prototype role preview does not grant backend authority.
      </div>
      <div v-else-if="prototype.demoState === 'Offline'" class="banner conflict" role="status">
        Offline. Safe operations remain scoped to {{ prototype.tenant }} /
        {{ prototype.restaurant }} and retain their idempotency keys.
      </div>
      <div v-else-if="prototype.demoState === 'Conflict'" class="banner conflict" role="alert">
        <b>Canonical state changed</b>
        <p>{{ current.uniqueContent[0] }} was updated elsewhere. Reload before retrying.</p>
        <button @click="perform('Reload canonical state')">Reload canonical state</button>
      </div>
      <div v-else class="content-grid">
        <section class="metric">
          <small>Current workflow</small><b>{{ current.title }}</b
          ><span class="chip submitted">{{ current.id }}</span>
        </section>
        <section class="metric">
          <small>Authorized role preview</small><b>{{ current.role }}</b
          ><span class="chip ready">{{ prototype.connection }}</span>
        </section>
        <section class="panel">
          <h3>{{ current.title }} data</h3>
          <div v-for="(item, index) in current.uniqueContent" :key="item" class="row">
            <span
              ><b>{{ item.split(' · ')[0] }}</b
              ><small>{{ item }}</small></span
            >
            <span
              class="chip"
              :class="index === 0 ? 'ready' : index === 1 ? 'preparing' : 'submitted'"
              >{{ index === 0 ? 'Current' : index === 1 ? 'Review' : 'Fixture' }}</span
            >
          </div>
        </section>
        <section class="panel">
          <h3>Canonical contract</h3>
          <dl>
            <dt>Permission</dt>
            <dd>{{ current.permission }}</dd>
            <dt>API</dt>
            <dd>{{ current.api }}</dd>
            <dt>Events</dt>
            <dd>{{ current.events?.join(', ') || 'REST state only' }}</dd>
          </dl>
        </section>
      </div>
      <p class="activity" aria-live="polite">{{ activity }}</p>
      <footer>
        <button @click="perform(current.actions[1])">{{ current.actions[1] }}</button
        ><button class="primary" @click="perform(current.actions[0])">
          {{ current.actions[0] }}
        </button>
      </footer>
      <div v-if="dialogOpen" class="dialog-backdrop" @click.self="dialogOpen = false">
        <section
          class="dialog"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="`${current.id}-dialog`"
        >
          <h3 :id="`${current.id}-dialog`">Confirm {{ current.title.toLowerCase() }}</h3>
          <p>{{ current.purpose }}</p>
          <button @click="dialogOpen = false">Cancel</button
          ><button class="primary" @click="confirmAction">Confirm</button>
        </section>
      </div>
    </article>
  </section>
</template>
