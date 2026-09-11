import { useEffect } from 'react'
import { contato } from '../config/site.config'

type SeoProps = {
  titulo: string
  descricao: string
  caminho: string
  imagem?: string
  /** JSON-LD já pronto (objeto). */
  dados?: Record<string, unknown>
}

function meta(seletor: string, attr: 'name' | 'property', valor: string, conteudo: string) {
  let el = document.head.querySelector<HTMLMetaElement>(seletor)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, valor)
    document.head.appendChild(el)
  }
  el.setAttribute('content', conteudo)
}

/** Atualiza título, descrição, canonical, Open Graph e dados estruturados. */
export function useSeo({ titulo, descricao, caminho, imagem, dados }: SeoProps) {
  useEffect(() => {
    const url = `${contato.site}${caminho}`
    const img = `${contato.site}${imagem ?? '/img/og-ramblas.webp'}`
    document.title = titulo
    meta('meta[name="description"]', 'name', 'description', descricao)
    meta('meta[property="og:title"]', 'property', 'og:title', titulo)
    meta('meta[property="og:description"]', 'property', 'og:description', descricao)
    meta('meta[property="og:url"]', 'property', 'og:url', url)
    meta('meta[property="og:image"]', 'property', 'og:image', img)
    meta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')

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
  }, [titulo, descricao, caminho, imagem, dados])
}
