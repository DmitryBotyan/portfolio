// Выгружает проекты сайта в Telegram-бот: cases_data.py + картинки.
//
//   bun scripts/export-bot-cases.ts [путь-до-бота]      (по умолчанию ../botyan-bot)
//
// Бот раньше держал свой список кейсов, который разъезжался с сайтом.
// Теперь единственный источник правды это src/content.ts и src/projects.ts,
// а этот скрипт переносит данные оттуда. После правок проектов на сайте
// запустить заново и задеплоить бота.

import { existsSync, mkdirSync, copyFileSync, writeFileSync, readdirSync, unlinkSync, statSync } from 'node:fs'
import { join, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { content } from '../src/content'
import { projectsDetails } from '../src/projects'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const BOT_DIR = process.argv[2] ? process.argv[2] : join(ROOT, '..', 'botyan-bot')
const ASSETS_DIR = join(BOT_DIR, 'assets', 'projects')
const OUT_PY = join(BOT_DIR, 'cases_data.py')

if (!existsSync(BOT_DIR)) {
  console.error(`Каталог бота не найден: ${BOT_DIR}`)
  process.exit(1)
}

// sips есть только на macOS. Без него картинки копируются как есть.
const hasSips = spawnSync('which', ['sips']).status === 0
const MAX_WIDTH = 1440
const JPEG_QUALITY = 82

function pyStr(s: string): string {
  return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
}

function pyValue(v: unknown, indent = 8): string {
  if (v === null || v === undefined) return 'None'
  if (typeof v === 'boolean') return v ? 'True' : 'False'
  if (typeof v === 'number') return String(v)
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]'
    const pad = ' '.repeat(indent)
    return '[\n' + v.map((x) => pad + '    ' + pyValue(x, indent + 4) + ',').join('\n') + '\n' + pad + ']'
  }
  return pyStr(String(v))
}

/** Приводит скриншот к разумному размеру: Telegram всё равно пережимает в JPEG. */
function prepareImage(src: string, destBase: string): string {
  if (!existsSync(src)) throw new Error(`Картинка не найдена: ${src}`)
  if (hasSips) {
    const dest = destBase + '.jpg'
    const r = spawnSync('sips', [
      '-Z', String(MAX_WIDTH),
      '-s', 'format', 'jpeg',
      '-s', 'formatOptions', String(JPEG_QUALITY),
      src, '--out', dest,
    ], { stdio: 'ignore' })
    if (r.status === 0 && existsSync(dest)) return dest
  }
  const dest = destBase + extname(src)
  copyFileSync(src, dest)
  return dest
}

mkdirSync(ASSETS_DIR, { recursive: true })

// Чистим каталог, чтобы удалённые с сайта проекты не оставляли мусор
for (const f of readdirSync(ASSETS_DIR)) unlinkSync(join(ASSETS_DIR, f))

const items = (content as any).ru.projects.items as any[]
const details = (projectsDetails as any).ru as Record<string, any>

type Case = Record<string, unknown>
const cases: Case[] = []
let totalBytes = 0

for (const p of items) {
  const d = details[p.slug]
  const images: string[] = []

  p.images.forEach((srcPath: string, i: number) => {
    const out = prepareImage(srcPath, join(ASSETS_DIR, `${p.slug}-${i + 1}`))
    totalBytes += statSync(out).size
    images.push(`assets/projects/${out.split('/').pop()}`)
  })

  cases.push({
    slug: p.slug,
    number: p.number,
    title: p.title,
    category: d?.category ?? null,
    tagline: d?.tagline ?? null,
    description: p.description ?? null,
    stack: p.stack ?? [],
    // На сайте у проектов без публичной ссылки стоит заглушка '#'
    live: p.live && p.live !== '#' ? p.live : null,
    year: d?.year ?? null,
    client: d?.client ?? null,
    template: Boolean(p.template),
    // Есть ли на сайте подробная страница кейса
    has_detail: Boolean(d),
    images,
  })
}

const FIELDS = [
  'slug', 'number', 'title', 'category', 'tagline', 'description',
  'stack', 'live', 'year', 'client', 'template', 'has_detail', 'images',
]

const body = cases
  .map((c) => {
    const lines = FIELDS.map((f) => `        ${pyStr(f)}: ${pyValue(c[f])},`)
    return '    {\n' + lines.join('\n') + '\n    },'
  })
  .join('\n')

const py = `"""
Кейсы портфолио для бота.

АВТОГЕНЕРАЦИЯ. Не править руками: файл перезаписывается скриптом
scripts/export-bot-cases.ts из репозитория my-portfolio.
Источник данных: src/content.ts (список проектов) и src/projects.ts (описания).

Обновить после изменений на сайте:
    cd ~/Desktop/dev/my-portfolio && bun scripts/export-bot-cases.ts
    cd ~/Desktop/dev/botyan-bot && ./deploy/deploy-bot.sh botyan-vps
"""

CASES: list[dict] = [
${body}
]
`

writeFileSync(OUT_PY, py, 'utf8')

const mb = (totalBytes / 1024 / 1024).toFixed(1)
console.log(`Кейсов: ${cases.length}`)
console.log(`Картинок: ${cases.reduce((n, c) => n + (c.images as string[]).length, 0)} (${mb} МБ)${hasSips ? ', пережаты в JPEG' : ', скопированы как есть'}`)
console.log(`Записано: ${OUT_PY}`)
for (const c of cases) {
  const flags = [c.live ? 'live' : null, c.has_detail ? null : 'без страницы кейса'].filter(Boolean)
  console.log(`  ${c.number} ${c.title}${flags.length ? '  [' + flags.join(', ') + ']' : ''}`)
}
