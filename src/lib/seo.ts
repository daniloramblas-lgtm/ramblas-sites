import { useEffect } from 'react'
import { contato } from '../config/site.config'
import type { MetaRota } from '../data/rotas'

function meta(seletor: string, attr: 'name' | 'property', valor: string, conteudo: string) {
  let el = document.head.querySelector<HTMLMetaElement>(seletor)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, valor)
    document.head.appendChild(el)
  }
  el.setAttribute('content', conteudo)
}

/**
 * Atualiza título, descrição, canonical, Open Graph, robots e dados
 * estruturados na troca de rota. O HTML inicial de cada rota já vem
 * correto pela prerenderização (scripts/prerender.mjs); isto cuida da
 * navegação feita pelo React Router.
 */
export function useSeo({ titulo, descricao, caminho, imagem, noindex, dados }: MetaRota) {
  useEffect(() => {
    const url = `${contato.site}${caminho}`
    const img = `${contato.site}${imagem || '/img/og-ramblas.webp'}`
    document.title = titulo
    meta('meta[name="description"]', 'name', 'description', descricao)
    meta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex,follow' : 'index,follow')
    meta('meta[property="og:title"]', 'property', 'og:title', titulo)
    meta('meta[property="og:description"]', 'property', 'og:description', descricao)
    meta('meta[property="og:url"]', 'property', 'og:url', url)
    meta('meta[property="og:image"]', 'property', 'og:image', img)
    meta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    meta('meta[name="twitter:title"]', 'name', 'twitter:title', titulo)
    meta('meta[name="twitter:description"]', 'name', 'twitter:description', descricao)
    meta('meta[name="twitter:image"]', 'name', 'twitter:image', img)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    const id = 'dados-estruturados'
    document.getElementById(id)?.remove()
    if (dados) {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.id = id
      s.textContent = JSON.stringify(dados)
      document.head.appendChild(s)
    }
  }, [titulo, descricao, caminho, imagem, noindex, dados])
}
