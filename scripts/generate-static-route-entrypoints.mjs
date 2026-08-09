import fs from 'node:fs/promises'
import path from 'node:path'
import { routeManifest } from '../src/route-manifest.ts'

const dist = path.resolve('dist')
const canonical = path.join(dist, 'index.html')
const html = await fs.readFile(canonical, 'utf8').catch(() => null)
if (!html) throw new Error('dist/index.html is required; run Vite build first.')
if (!html.includes('/swiftserve-maquettes/assets/'))
  throw new Error('Built HTML does not preserve the repository base path.')

const paths = routeManifest.map((route) => route.path)
if (new Set(paths).size !== paths.length) throw new Error('Duplicate public route in manifest.')
for (const route of paths) {
  if (
    !route.startsWith('/') ||
    route.includes('..') ||
    route.includes('?') ||
    route.includes('#') ||
    route.includes('\\')
  )
    throw new Error(`Unsafe public route: ${route}`)
}

const generated = []
for (const route of paths.filter((value) => value !== '/')) {
  const target = path.resolve(dist, `.${route}`, 'index.html')
  if (!target.startsWith(`${dist}${path.sep}`)) throw new Error(`Route escaped dist: ${route}`)
  await fs.mkdir(path.dirname(target), { recursive: true })
  await fs.writeFile(target, html, 'utf8')
  generated.push(path.relative(dist, target).replaceAll('\\', '/'))
}
await fs.writeFile(path.join(dist, '404.html'), html, 'utf8')
console.log(`Generated ${generated.length} route entry points:\n${generated.join('\n')}`)
