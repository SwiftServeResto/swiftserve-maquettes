import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const brand = path.join(root, 'public', 'brand')
const original = path.join(brand, 'swiftserve-logo-original.jpg')
const expected = 'dcb3eb665326fd4a13d1910fcd935b9395c13c303649633d6eb13a0d9ca51fbf'
const bytes = await fs.readFile(original).catch(() => null)
if (!bytes) throw new Error(`Canonical logo unavailable: ${original}`)
const actual = crypto.createHash('sha256').update(bytes).digest('hex')
if (actual !== expected) throw new Error(`Canonical logo checksum changed: ${actual}`)

const source = sharp(bytes)
const { width, height } = await source.metadata()
if (width !== 1200 || height !== 1200)
  throw new Error(`Expected 1200x1200 original, got ${width}x${height}`)

const { data, info } = await source.removeAlpha().raw().toBuffer({ resolveWithObject: true })
const rgba = Buffer.alloc(info.width * info.height * 4)
for (let i = 0, p = 0; i < data.length; i += 3, p += 4) {
  const r = data[i],
    g = data[i + 1],
    b = data[i + 2]
  const edge = Math.max(r, g, b)
  // JPEG black background removal with a short soft matte for antialiased edges.
  const alpha = edge <= 7 ? 0 : edge >= 28 ? 255 : Math.round(((edge - 7) / 21) * 255)
  rgba[p] = r
  rgba[p + 1] = g
  rgba[p + 2] = b
  rgba[p + 3] = alpha
}
const transparent = () =>
  sharp(Buffer.from(rgba), { raw: { width: info.width, height: info.height, channels: 4 } })
await transparent()
  .png({ compressionLevel: 9 })
  .toFile(path.join(brand, 'swiftserve-logo-transparent.png'))
await sharp(bytes).webp({ quality: 88 }).toFile(path.join(brand, 'swiftserve-logo.webp'))

const symbolCrop = { left: 35, top: 80, width: 1130, height: 790 }
const croppedSymbol = await transparent().extract(symbolCrop).png().toBuffer()
const symbolBuffer = await sharp(croppedSymbol)
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer()
await sharp(symbolBuffer)
  .png({ compressionLevel: 9 })
  .toFile(path.join(brand, 'swiftserve-symbol.png'))
await sharp(symbolBuffer)
  .webp({ quality: 90, alphaQuality: 100 })
  .toFile(path.join(brand, 'swiftserve-symbol.webp'))

await transparent()
  .flatten({ background: '#ffffff' })
  .png()
  .toFile(path.join(brand, 'swiftserve-logo-light.png'))
await transparent()
  .flatten({ background: '#202626' })
  .png()
  .toFile(path.join(brand, 'swiftserve-logo-dark.png'))
for (const size of [512, 1024]) {
  const padding = Math.round(size * 0.08)
  const inset = await sharp(symbolBuffer)
    .resize(size - padding * 2, size - padding * 2, { fit: 'contain' })
    .png()
    .toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background: '#202626' } })
    .composite([{ input: inset, gravity: 'centre' }])
    .png()
    .toFile(path.join(brand, `swiftserve-app-icon-${size}.png`))
}
console.log(`Generated brand assets from ${actual}`)
