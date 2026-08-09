<script setup lang="ts">
import { ref } from 'vue'
const demoMessage = ref('Choose a component action to preview its announced state.')
const components = [
  'Buttons',
  'Icon buttons',
  'Text and password fields',
  'Search and textarea',
  'Selects',
  'Checkbox, radio and switch',
  'Tabs and segmented controls',
  'Badges and status chips',
  'Tooltips and dropdowns',
  'Breadcrumbs and pagination',
  'Data tables',
  'Cards and metric cards',
  'Empty and error states',
  'Skeleton loaders',
  'Toasts and banners',
  'Dialogs and drawers',
  'Side and top navigation',
  'Bottom navigation and rails',
  'Table cards',
  'Order cards',
  'Kitchen tickets',
  'Payment summaries',
  'Connection indicators',
  'Offline queue items',
  'Conflict cards',
]
</script>
<template>
  <section>
    <header class="page-head">
      <div>
        <span class="eyebrow">Foundations</span>
        <h1>SwiftServe design system</h1>
        <p>
          Graphite structure, orange action, green operational success. Plus Jakarta Sans with local
          fallbacks.
        </p>
      </div>
    </header>
    <div class="swatches">
      <div
        v-for="c in ['graphite', 'orange', 'green', 'error', 'info']"
        :key="c"
        :class="['swatch', c]"
      >
        {{ c }}
      </div>
    </div>
    <h2>Interactive controls</h2>
    <div class="component-demo">
      <button class="primary" @click="demoMessage = 'Primary action selected'">
        Primary action</button
      ><button @click="demoMessage = 'Secondary action selected'">Secondary</button
      ><button class="danger" @click="demoMessage = 'Destructive confirmation required'">
        Destructive</button
      ><input aria-label="Example text field" value="Table 07" /><label class="switch"
        ><input type="checkbox" /> Available</label
      ><span class="chip submitted">Submitted</span><span class="chip preparing">Preparing</span
      ><span class="chip ready">Ready</span>
    </div>
    <p aria-live="polite">{{ demoMessage }}</p>
    <h2>Component catalogue</h2>
    <div class="catalogue">
      <article v-for="c in components" :key="c">
        <h3>{{ c }}</h3>
        <p>Default · hover · focus · active · disabled · loading · error</p>
      </article>
    </div>
  </section>
</template>
