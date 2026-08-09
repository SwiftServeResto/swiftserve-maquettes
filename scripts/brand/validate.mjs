import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const brand = path.join(process.cwd(), 'public', 'brand')
const expectedHash = 'dcb3eb665326fd4a13d1910fcd935b9395c13c303649633d6eb13a0d9ca51fbf'
const expected = {
  'swiftserve-logo-original.jpg': [1200, 1200, false],
  'swiftserve-logo-transparent.png': [1200, 1200, true],
  'swiftserve-logo.webp': [1200, 1200, false],
  'swiftserve-symbol.png': [null, null, true],
  'swiftserve-symbol.webp': [null, null, true],
  'swiftserve-logo-light.png': [1200, 1200, false],
  'swiftserve-logo-dark.png': [1200, 1200, false],
  'swiftserve-app-icon-512.png': [512, 512, false],
  'swiftserve-app-icon-1024.png': [1024, 1024, false],
}
for (const [name, [width, height, alpha]] of Object.entries(expected)) {
  const file = path.join(brand, name)
  const bytes = await fs.readFile(file)
  const meta = await sharp(bytes).metadata()
  if (width && (meta.width !== width || meta.height !== height))
    throw new Error(`${name}: unexpected dimensions`)
  if (alpha && !meta.hasAlpha) throw new Error(`${name}: alpha channel required`)
  const stats = await sharp(bytes).ensureAlpha().stats()
  if (!stats.channels.some((channel) => channel.max > channel.min))
    throw new Error(`${name}: empty visible bounds`)
}
const original = await fs.readFile(path.join(brand, 'swiftserve-logo-original.jpg'))
const hash = crypto.createHash('sha256').update(original).digest('hex')
if (hash !== expectedHash) throw new Error(`Original checksum mismatch: ${hash}`)
console.log(`Validated ${Object.keys(expected).length} brand assets; original ${hash}`)
