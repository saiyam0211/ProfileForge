import { defineConfig, type Connect } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { ServerResponse } from 'node:http'

// Stat-card services (github-readme-stats, streak, trophy, komarev…) block
// browser fetch with CORS AND return HTTP 200 even when rate-limited, so the
// client can't tell a real card from a "Something went wrong" card. This proxy
// fetches them server-side (no CORS), inspects the SVG, and returns 502 on an
// error/empty card so the preview can render its own empty-state instead.
const ERROR_RE =
  /something went wrong|maximum retries exceeded|max retries|too many requests|rate limit exceeded|bad credentials|invalid username|could not (fetch|resolve)/i

const cache = new Map<string, { t: number; ok: boolean; body: string; type: string }>()
const TTL = 60_000

async function handleSvg(req: Connect.IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url || '', 'http://localhost')
  const target = url.searchParams.get('u')
  if (!target || !/^https:\/\//.test(target)) {
    res.statusCode = 400
    return res.end('bad url')
  }
  const hit = cache.get(target)
  if (hit && Date.now() - hit.t < TTL) {
    if (!hit.ok) {
      res.statusCode = 502
      return res.end('cached-error')
    }
    res.setHeader('content-type', hit.type)
    res.setHeader('cache-control', 'no-cache')
    return res.end(hit.body)
  }
  try {
    const upstream = await fetch(target, { headers: { 'user-agent': 'ProfileForge-preview' } })
    const body = await upstream.text()
    const type = upstream.headers.get('content-type') || 'image/svg+xml'
    const isErr = !upstream.ok || (/svg|xml|text/.test(type) && ERROR_RE.test(body))
    cache.set(target, { t: Date.now(), ok: !isErr, body, type })
    if (isErr) {
      res.statusCode = 502
      return res.end('upstream-error')
    }
    res.setHeader('content-type', type)
    res.setHeader('cache-control', 'no-cache')
    return res.end(body)
  } catch {
    cache.set(target, { t: Date.now(), ok: false, body: '', type: '' })
    res.statusCode = 502
    return res.end('fetch-failed')
  }
}

const svgProxy = {
  name: 'svg-proxy',
  configureServer(server: { middlewares: Connect.Server }) {
    server.middlewares.use('/__svg', handleSvg)
  },
  configurePreviewServer(server: { middlewares: Connect.Server }) {
    server.middlewares.use('/__svg', handleSvg)
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss(), svgProxy],
})
