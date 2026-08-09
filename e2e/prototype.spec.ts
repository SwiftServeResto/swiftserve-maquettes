import { test, expect } from '@playwright/test'
const routes = [
  'design-system',
  'web/auth',
  'web/saas',
  'web/restaurant',
  'web/staff',
  'web/menus',
  'web/tables',
  'web/orders',
  'web/kitchen',
  'web/payments',
  'staff/auth',
  'staff/workspaces',
  'staff/service',
  'staff/kitchen',
  'staff/management',
  'staff/offline',
]
for (const route of routes)
  test(`${route} loads without overflow`, async ({ page }) => {
    await page.goto(route)
    await expect(page.locator('main')).toBeVisible()
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(overflow).toBeFalsy()
  })

for (const route of routes.filter((route) => route !== 'design-system'))
  test(`${route} exposes unique content and working primary actions`, async ({ page }) => {
    await page.goto(route)
    const tabs = page.getByRole('tablist').getByRole('button')
    const count = await tabs.count()
    for (let index = 0; index < count; index++) {
      await tabs.nth(index).click()
      await expect(page.locator('.screen-id')).toBeVisible()
      const primary = page.locator('.screen > header').getByRole('button')
      await primary.click()
      await expect(page.locator('.activity')).toContainText('simulated')
      const dialog = page.getByRole('dialog')
      if (await dialog.isVisible()) await dialog.getByRole('button', { name: 'Cancel' }).click()
    }
  })
test('theme and connection controls are keyboard operable', async ({ page }) => {
  await page.goto('design-system')
  await page.getByLabel('Toggle light and dark theme').focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('.app')).toHaveAttribute('data-theme', 'dark')
  await page.getByRole('button', { name: 'Connected' }).click()
  await expect(page.getByRole('button', { name: 'Reconnecting' })).toBeVisible()
})

for (const route of ['web/orders', 'staff/service', 'staff/kitchen'])
  test(`${route} produces a deterministic workflow preview`, async ({ page }, testInfo) => {
    await page.goto(route)
    await page.screenshot({
      animations: 'disabled',
      fullPage: true,
      path: testInfo.outputPath(`preview-${route.replace('/', '-')}.png`),
    })
  })

for (const [route, heading] of [
  ['design-system', 'SwiftServe design system'],
  ['web/orders', 'web orders'],
  ['staff/service', 'staff service'],
])
  test(`${route} survives fresh direct navigation and refresh`, async ({ page }) => {
    const failures: string[] = []
    page.on('pageerror', (error) => failures.push(error.message))
    page.on('response', (response) => {
      if (response.status() === 404) failures.push(response.url())
    })
    await page.goto(route)
    await expect(page.getByRole('heading', { name: heading, exact: false }).first()).toBeVisible()
    await page.reload()
    await expect(page.getByRole('heading', { name: heading, exact: false }).first()).toBeVisible()
    expect(failures).toEqual([])
  })
