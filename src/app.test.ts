import { render, screen } from '@testing-library/vue'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, it, expect } from 'vitest'
import App from './App.vue'
import { groups } from './screens'
import DesignSystem from './views/DesignSystem.vue'
describe('prototype', () => {
  it('renders the design system and prototype warning', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', component: DesignSystem }],
    })
    router.push('/')
    await router.isReady()
    render(App, { global: { plugins: [createPinia(), router] } })
    expect(screen.getByText('SwiftServe design system')).toBeTruthy()
    expect(screen.getByText(/Simulation only/)).toBeTruthy()
  })
})

it('defines unique, actionable and complete content for every mapped view', () => {
  const screens = Object.values(groups).flat()
  expect(screens).toHaveLength(60)
  expect(new Set(screens.map((screen) => screen.id)).size).toBe(60)
  for (const screen of screens) {
    expect(screen.status).toBe('Complete')
    expect(screen.uniqueContent.length).toBeGreaterThanOrEqual(3)
    expect(screen.actions.length).toBeGreaterThanOrEqual(2)
    expect(screen.states).toContain('offline')
    expect(screen.states).toContain('conflict')
  }
})
