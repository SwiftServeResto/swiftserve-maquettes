import fs from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = path.resolve('dist')
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
}
export function startStaticServer(port = 4173) {
  const server = http.createServer(async (request, response) => {
    const url = new URL(request.url ?? '/', 'http://localhost')
    const prefix = '/swiftserve-maquettes'
    if (!url.pathname.startsWith(prefix)) {
      response.writeHead(404).end('Not found')
      return
    }
    const relative = decodeURIComponent(url.pathname.slice(prefix.length)) || '/'
    const candidate = path.resolve(dist, `.${relative}`)
    if (candidate !== dist && !candidate.startsWith(`${dist}${path.sep}`)) {
      response.writeHead(400).end('Bad path')
      return
    }
    try {
      const stat = await fs.stat(candidate)
      if (stat.isDirectory() && !url.pathname.endsWith('/')) {
        response.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end()
        return
      }
      const file = stat.isDirectory() ? path.join(candidate, 'index.html') : candidate
      const body = await fs.readFile(file)
      response
        .writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream' })
        .end(body)
    } catch {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found')
    }
  })
  return new Promise((resolve, reject) => {
    server.once('error', reject)
    server.listen(port, '127.0.0.1', () => resolve(server))
  })
}
if (path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  await startStaticServer(Number(process.env.PORT ?? 4173))
