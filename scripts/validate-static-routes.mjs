import { routeManifest } from '../src/route-manifest.ts'
import { startStaticServer } from './static-server.mjs'

const base = 'http://127.0.0.1:4174/swiftserve-maquettes'
const server = await startStaticServer(4174)
try {
  for (const route of routeManifest) {
    const response = await fetch(`${base}${route.path}`)
    const body = await response.text()
    if (
      response.status !== 200 ||
      !body.includes('<div id="app"></div>') ||
      !body.includes('/swiftserve-maquettes/assets/')
    )
      throw new Error(`${route.path}: expected application HTTP 200, got ${response.status}`)
  }
  const root = await (await fetch(`${base}/`)).text()
  const assets = [...root.matchAll(/(?:src|href)="(\/swiftserve-maquettes\/assets\/[^"]+)"/g)].map(
    (match) => match[1],
  )
  if (
    !assets.some((asset) => asset.endsWith('.js')) ||
    !assets.some((asset) => asset.endsWith('.css'))
  )
    throw new Error('Built JavaScript and CSS assets were not found.')
  for (const asset of [...assets, '/swiftserve-maquettes/brand/swiftserve-symbol.webp']) {
    const response = await fetch(`http://127.0.0.1:4174${asset}`)
    if (response.status !== 200)
      throw new Error(`${asset}: expected HTTP 200, got ${response.status}`)
  }
  const unknown = await fetch(`${base}/unknown-route`)
  if (unknown.status !== 404)
    throw new Error(`Unknown route must return 404, got ${unknown.status}`)
  console.log(
    `Validated ${routeManifest.length} routes, ${assets.length} assets, logo, and explicit unknown-route 404.`,
  )
} finally {
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  )
}
