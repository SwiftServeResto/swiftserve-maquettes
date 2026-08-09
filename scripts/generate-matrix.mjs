import fs from 'node:fs/promises'
import { groups } from '../src/screens.ts'

const routeFor = (group) => `/${group.replace(/^web-/, 'web/').replace(/^staff-/, 'staff/')}`
const lines = [
  '# Figure-to-implementation matrix',
  '',
  'This inventory is generated from `src/screens.ts` by `npm run docs:matrix`. Counts represent substantive states, not cosmetic duplicates.',
  '',
  '| View | Route | Workspace | Role | Purpose | Unique content | Actions | Interaction path | Responsive variants | State coverage | Test coverage | Status |',
  '|---|---|---|---|---|---|---|---|---|---|---|---|',
]
for (const [group, screens] of Object.entries(groups)) {
  for (const screen of screens) {
    const workspace = group.startsWith('staff-') ? group.slice(6) : 'Web'
    const safe = (value) => String(value).replaceAll('|', '\\|')
    lines.push(
      `| ${screen.id} | \`${routeFor(group)}\` | ${workspace} | ${safe(screen.role)} | ${safe(screen.purpose)} | ${safe(screen.uniqueContent.join('; '))} | ${safe(screen.actions.join('; '))} | ${safe(screen.interactionPath)} | ${safe(screen.responsive)} | ${safe(screen.states)} | Route, unique-content, action, state and responsive Playwright matrix | ${screen.status} |`,
    )
  }
}
await fs.writeFile('docs/FIGURE_TO_IMPLEMENTATION_MATRIX.md', `${lines.join('\n')}\n`)
console.log(`Documented ${Object.values(groups).flat().length} screen/state views`)
