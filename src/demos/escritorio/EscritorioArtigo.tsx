import { Link, useParams } from 'react-router-dom'
import './escritorio.css'
import { artigos } from './dados'
import { CabecalhoAurea, RodapeAurea } from './LayoutAurea'
import { BarraDemonstracao } from '../../components/Comuns'
import { dataLonga } from '../../lib/format'
import { useSeo } from '../../lib/seo'

export default function EscritorioArtigo() {
  const { slug } = useParams()
  const artigo = artigos.find((a) => a.slug === slug)
  const outros = artigos.filter((a) => a.slug !== slug)

  useSeo({
    titulo: artigo ? `${artigo.titulo} — Áurea Consultoria (demonstração)` : 'Artigo não encontrado',
    descricao: artigo?.resumo ?? 'Artigo não encontrado nesta demonstração.',
    caminho: `/demonstracao/aurea/artigos/${slug ?? ''}`,
    imagem: artigo?.capa,
    dados: artigo
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: artigo.titulo,
          datePublished: artigo.data,
          description: artigo.resumo,
          author: { '@type': 'Organization', name: 'Áurea Consultoria (empresa fictícia)' },
        }
      : undefined,
  })

  if (!artigo) {
    return (
      <div className="demo-escritorio">
        <BarraDemonstracao nome="Áurea Consultoria" slug="aurea" />
        <CabecalhoAurea />
        <section className="au-interna">
          <div className="container">
            <h1>Artigo não encontrado</h1>
            <Link className="au-btn au-btn--verde" to="/demonstracao/aurea#conteudos">
              Ver todos os conteúdos
            </Link>
          </div>
        </section>
        <RodapeAurea />
      </div>
    )
  }

  return (
    <div className="demo-escritorio">
      <BarraDemonstracao nome="Áurea Consultoria" slug="aurea" />
      <CabecalhoAurea />

      <article className="au-interna">
        <div className="container">
          <p className="au-migalhas">
            <Link to="/demonstracao/aurea">Início</Link> /{' '}
            <Link to="/demonstracao/aurea#conteudos">Conteúdos</Link> / {artigo.titulo}
          </p>

          <div className="au-interna__grade">
            <div className="au-conteudo">
              <small style={{ color: 'var(--dourado)' }}>
                {dataLonga(artigo.data)} · {artigo.leitura}
              </small>
              <h1 style={{ marginTop: '0.6rem' }}>{artigo.titulo}</h1>
              <img
                src={artigo.capa}
                alt={`Fotografia ilustrativa do artigo ${artigo.titulo}`}
                style={{ width: '100%', borderRadius: 3, margin: '1.5rem 0' }}
                width={1000}
                height={620}
              />
              {artigo.paragrafos.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <aside className="au-lateral">
              <h2 style={{ fontSize: '1.2rem', marginTop: 0 }}>Outros conteúdos</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
                {outros.map((o) => (
                  <li key={o.slug}>
                    <Link to={`/demonstracao/aurea/artigos/${o.slug}`} style={{ color: 'var(--verde)', fontWeight: 600 }}>
                      {o.titulo}
                    </Link>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: 'var(--texto-2)' }}>{o.resumo}</p>
                  </li>
                ))}
              </ul>
              <Link className="au-btn au-btn--verde" to="/demonstracao/aurea#atendimento" style={{ marginTop: '1.5rem', width: '100%' }}>
                Falar com o escritório
              </Link>
            </aside>
          </div>
        </div>
      </article>

      <RodapeAurea />
    </div>
  )
}
