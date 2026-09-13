/**
 * AUDITORIA DE ESTRUTURA
 * ------------------------------------------------------------------
 * Renderiza cada rota no Node (sem navegador) e confere o que costuma
 * quebrar acessibilidade e SEO:
 *   - exatamente um <main> por página e um link "pular para o conteúdo";
 *   - exatamente um <h1>, sem salto de nível de título;
 *   - toda imagem com alt, width e height;
 *   - toda âncora #destino existente na própria página;
 *   - nenhum arquivo de imagem inexistente.
 *
 * Uso: node scripts/auditoria.mjs
 */
import { build } from 'esbuild'
import { existsSync } from 'node:fs'
import { rm } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const saida = join(raiz, '.auditoria.mjs')

await build({
  stdin: {
    contents: `
      import { renderToStaticMarkup } from 'react-dom/server'
      import { StaticRouter, Routes, Route, Outlet } from 'react-router'
      import { createElement as h } from 'react'
      import Cabecalho from './src/components/Cabecalho'
      import Rodape from './src/components/Rodape'
      import { BotaoWhatsApp } from './src/components/Comuns'
      import Inicio from './src/pages/Inicio'
      import Modelos from './src/pages/Modelos'
      import ModeloDetalhe from './src/pages/ModeloDetalhe'
      import Privacidade from './src/pages/Privacidade'
      import NaoEncontrada from './src/pages/NaoEncontrada'
      import Pizzaria from './src/demos/pizzaria/Pizzaria'
      import Barbearia from './src/demos/barbearia/Barbearia'
      import Escritorio from './src/demos/escritorio/Escritorio'
      import EscritorioServico from './src/demos/escritorio/EscritorioServico'
      import EscritorioArtigo from './src/demos/escritorio/EscritorioArtigo'
      import Concessionaria from './src/demos/concessionaria/Concessionaria'
      import Veiculo from './src/demos/concessionaria/Veiculo'
      import Comparador from './src/demos/concessionaria/Comparador'
      import { todasAsRotas } from './src/data/rotas'

      export const rotasConhecidas = todasAsRotas.map((rota) => rota.caminho)

      // mesma árvore do App.tsx, só que sem React.lazy (que não resolve no Node)
      function Layout() {
        return h('div', null,
          h('a', { className: 'pular-para-conteudo', href: '#conteudo' }, 'Pular para o conteúdo'),
          h(Cabecalho), h('main', { id: 'conteudo' }, h(Outlet)), h(Rodape), h(BotaoWhatsApp))
      }

      export function render(rota) {
        return renderToStaticMarkup(
          h(StaticRouter, { location: rota },
            h(Routes, null,
              h(Route, { element: h(Layout) },
                h(Route, { path: '/', element: h(Inicio) }),
                h(Route, { path: '/modelos', element: h(Modelos) }),
                h(Route, { path: '/modelos/:slug', element: h(ModeloDetalhe) }),
                h(Route, { path: '/privacidade', element: h(Privacidade) }),
                h(Route, { path: '*', element: h(NaoEncontrada) }),
              ),
              h(Route, { path: '/demonstracao/forno-27', element: h(Pizzaria) }),
              h(Route, { path: '/demonstracao/distrito-13', element: h(Barbearia) }),
              h(Route, { path: '/demonstracao/aurea', element: h(Escritorio) }),
              h(Route, { path: '/demonstracao/aurea/areas/:slug', element: h(EscritorioServico) }),
              h(Route, { path: '/demonstracao/aurea/artigos/:slug', element: h(EscritorioArtigo) }),
              h(Route, { path: '/demonstracao/linha-norte', element: h(Concessionaria) }),
              h(Route, { path: '/demonstracao/linha-norte/veiculo/:slug', element: h(Veiculo) }),
              h(Route, { path: '/demonstracao/linha-norte/comparar', element: h(Comparador) }),
            )))
      }
    `,
    resolveDir: raiz,
    loader: 'tsx',
  },
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: saida,
  packages: 'external',
  jsx: 'automatic',
  define: { 'import.meta.env.VITE_GA_ID': 'undefined' },
  loader: { '.css': 'empty' },
  logLevel: 'silent',
})

const { render, rotasConhecidas } = await import(pathToFileURL(saida).href)
const rotas = [...rotasConhecidas, '/rota-que-nao-existe']

let falhas = 0
function conferir(condicao, mensagem, rota) {
  if (!condicao) {
    falhas++
    console.log(`  ✗ ${rota}: ${mensagem}`)
  }
}

for (const rota of rotas) {
  let html = ''
  try {
    html = render(rota)
  } catch (erro) {
    falhas++
    console.log(`  ✗ ${rota}: erro ao renderizar — ${erro.message}`)
    continue
  }

  const mains = (html.match(/<main[\s>]/g) || []).length
  conferir(mains === 1, `esperava 1 <main>, encontrou ${mains}`, rota)
  conferir(html.includes('pular-para-conteudo'), 'sem link "pular para o conteúdo"', rota)

  const h1 = (html.match(/<h1[\s>]/g) || []).length
  conferir(h1 === 1, `esperava 1 <h1>, encontrou ${h1}`, rota)

  const niveis = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]))
  for (let i = 1; i < niveis.length; i++) {
    conferir(
      niveis[i] <= niveis[i - 1] + 1,
      `salto de título h${niveis[i - 1]} para h${niveis[i]}`,
      rota,
    )
  }

  for (const img of html.match(/<img[^>]*>/g) || []) {
    conferir(/alt="/.test(img), `imagem sem alt: ${img.slice(0, 70)}`, rota)
    conferir(/width="/.test(img) && /height="/.test(img), `imagem sem width/height: ${img.slice(0, 70)}`, rota)
    const src = /src="([^"]+)"/.exec(img)?.[1]
    if (src?.startsWith('/img/')) {
      conferir(existsSync(join(raiz, 'public', src)), `arquivo ausente: ${src}`, rota)
    }
    const srcset = /srcSet="([^"]+)"|srcset="([^"]+)"/.exec(img)
    if (srcset) {
      for (const parte of (srcset[1] || srcset[2]).split(',')) {
        const arquivo = parte.trim().split(' ')[0]
        conferir(existsSync(join(raiz, 'public', arquivo)), `variante ausente: ${arquivo}`, rota)
      }
    }
  }

  const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]))
  for (const m of html.matchAll(/href="#([^"]+)"/g)) {
    conferir(ids.has(m[1]), `âncora #${m[1]} não existe nesta página`, rota)
  }

  // links internos com target _blank precisam de rel seguro
  for (const a of html.match(/<a[^>]*target="_blank"[^>]*>/g) || []) {
    conferir(/rel="[^"]*noopener/.test(a), `link _blank sem noopener: ${a.slice(0, 60)}`, rota)
  }

  const texto = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  console.log(`  ${rota} — ${texto.length} caracteres de texto, ${mains} main, ${h1} h1`)
}

await rm(saida, { force: true })
console.log(falhas === 0 ? '\nAuditoria: nenhum problema encontrado.' : `\nAuditoria: ${falhas} problema(s).`)
process.exit(falhas === 0 ? 0 : 1)
