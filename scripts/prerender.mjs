/**
 * PRERENDERIZAÇÃO
 * ------------------------------------------------------------------
 * Roda depois do `vite build`. Para cada rota conhecida, grava um
 * arquivo HTML de entrada em dist/ já com title, description, canonical,
 * Open Graph, Twitter Card, robots e dados estruturados corretos —
 * sem depender do JavaScript.
 *
 * Efeitos colaterais úteis:
 *  - o Netlify serve o arquivo estático antes de qualquer redirect,
 *    então cada rota entrega o HTML certo;
 *  - as rotas que não existem caem no 404.html com status 404 real;
 *  - o sitemap.xml sai daqui, sem as páginas fictícias.
 */
import { build } from 'esbuild'
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(raiz, 'dist')

// 1. compila as rotas (TypeScript) para um módulo temporário que o Node consegue importar
const temporario = join(raiz, '.rotas.build.mjs')
await build({
  entryPoints: [join(raiz, 'src/data/rotas.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: temporario,
  logLevel: 'silent',
})
const { todasAsRotas, sitePublico } = await import(pathToFileURL(temporario).href)
const SITE = sitePublico || 'https://ramblassites.netlify.app'

const modelo = await readFile(join(dist, 'index.html'), 'utf8')

function trocarTag(html, regex, substituto) {
  return regex.test(html) ? html.replace(regex, substituto) : html.replace('</head>', `    ${substituto}\n  </head>`)
}

function escapar(texto) {
  return String(texto).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

function montarHtml(rota) {
  const url = `${SITE}${rota.caminho === '/404' ? '/404' : rota.caminho}`
  const imagem = `${SITE}${rota.imagem || '/img/og-ramblas.webp'}`
  let html = modelo

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapar(rota.titulo)}</title>`)
  html = trocarTag(
    html,
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${escapar(rota.descricao)}" />`,
  )
  html = trocarTag(
    html,
    /<meta\s+name="robots"[^>]*\/>/,
    `<meta name="robots" content="${rota.noindex ? 'noindex,follow' : 'index,follow'}" />`,
  )
  html = trocarTag(html, /<link\s+rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${url}" />`)
  html = trocarTag(
    html,
    /<meta\s+property="og:title"[\s\S]*?\/>/,
    `<meta property="og:title" content="${escapar(rota.titulo)}" />`,
  )
  html = trocarTag(
    html,
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${escapar(rota.descricao)}" />`,
  )
  html = trocarTag(html, /<meta\s+property="og:url"[^>]*\/>/, `<meta property="og:url" content="${url}" />`)
  html = trocarTag(html, /<meta\s+property="og:image"[^>]*\/>/, `<meta property="og:image" content="${imagem}" />`)
  html = trocarTag(
    html,
    /<meta\s+name="twitter:title"[\s\S]*?\/>/,
    `<meta name="twitter:title" content="${escapar(rota.titulo)}" />`,
  )
  html = trocarTag(
    html,
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${escapar(rota.descricao)}" />`,
  )
  html = trocarTag(html, /<meta\s+name="twitter:image"[^>]*\/>/, `<meta name="twitter:image" content="${imagem}" />`)

  if (rota.dados) {
    html = html.replace(
      '</head>',
      `    <script id="dados-estruturados" type="application/ld+json">${JSON.stringify(rota.dados)}</script>\n  </head>`,
    )
  }

  // pré-carrega apenas a imagem principal da home (LCP)
  if (rota.caminho === '/') {
    html = html.replace(
      '</head>',
      '    <link rel="preload" as="image" href="/img/capa-forno27-800.webp" imagesrcset="/img/capa-forno27-480.webp 480w, /img/capa-forno27-800.webp 800w" imagesizes="(max-width: 900px) 78vw, 500px" fetchpriority="high" />\n  </head>',
    )
  }

  return html
}

let gerados = 0
for (const rota of todasAsRotas) {
  const html = montarHtml(rota)
  if (rota.caminho === '/') {
    await writeFile(join(dist, 'index.html'), html)
  } else if (rota.caminho === '/404') {
    await writeFile(join(dist, '404.html'), html)
  } else {
    const pasta = join(dist, rota.caminho)
    await mkdir(pasta, { recursive: true })
    await writeFile(join(pasta, 'index.html'), html)
  }
  gerados++
}

// 2. sitemap somente com páginas comerciais indexáveis
const paraSitemap = todasAsRotas.filter((r) => !r.noindex && !r.semSitemap)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paraSitemap
  .map((r) => `  <url><loc>${SITE}${r.caminho}</loc><priority>${r.prioridade ?? '0.5'}</priority></url>`)
  .join('\n')}
</urlset>
`
await writeFile(join(dist, 'sitemap.xml'), sitemap)

await rm(temporario, { force: true })
console.log(`prerender: ${gerados} rotas geradas, ${paraSitemap.length} no sitemap`)
