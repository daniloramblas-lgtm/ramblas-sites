import { Link, useParams } from 'react-router-dom'
import './escritorio.css'
import { areas } from './dados'
import { CabecalhoAurea, FormularioAtendimento, RodapeAurea } from './LayoutAurea'
import { BarraDemo, PularParaConteudo } from '../../components/DemoShell'
import { metaDemoPorCaminho, meta404 } from '../../data/rotas'
import { useSeo } from '../../lib/seo'

export default function EscritorioServico() {
  const { slug } = useParams()
  const area = areas.find((a) => a.slug === slug)

  useSeo(metaDemoPorCaminho(`/demonstracao/aurea/areas/${slug ?? ''}`) ?? meta404)

  if (!area) {
    return (
      <div className="demo-escritorio">
        <PularParaConteudo />
      <BarraDemo id="aurea" />
        <CabecalhoAurea />
        <main id="conteudo">
      <section className="au-interna">
          <div className="container">
            <h1>Área não encontrada</h1>
            <p>O endereço acessado não corresponde a nenhuma área desta demonstração.</p>
            <Link className="au-btn au-btn--verde" to="/demonstracao/aurea#areas">
              Ver todas as áreas
            </Link>
          </div>
        </section>
        </main>

      <RodapeAurea />
      </div>
    )
  }

  return (
    <div className="demo-escritorio">
      <PularParaConteudo />
      <BarraDemo id="aurea" />
      <CabecalhoAurea />

      <main id="conteudo">
      <section className="au-interna">
        <div className="container">
          <p className="au-migalhas">
            <Link to="/demonstracao/aurea">Início</Link> /{' '}
            <Link to="/demonstracao/aurea#areas">Áreas de atuação</Link> / {area.nome}
          </p>

          <div className="au-interna__grade">
            <div className="au-conteudo">
              <div className="au-filete" />
              <h1>{area.nome}</h1>
              <p style={{ fontSize: '1.1rem' }}>{area.resumo}</p>
              {area.descricao.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}

              <h2 style={{ fontSize: '1.4rem', marginTop: '2rem' }}>O que está incluído</h2>
              <ul>
                {area.entregas.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>

              <h2 style={{ fontSize: '1.4rem', marginTop: '2rem' }}>Para quem é indicado</h2>
              <p>{area.paraQuem}</p>

              <p className="au-aviso" style={{ marginTop: '2rem' }}>
                Conteúdo informativo, sem promessa de resultado e sem análise de caso concreto. Áurea
                Consultoria é uma empresa fictícia criada para apresentar possibilidades.
              </p>
            </div>

            <aside className="au-lateral">
              <h2 style={{ fontSize: '1.25rem', marginTop: 0 }}>Falar sobre esta área</h2>
              <p style={{ color: 'var(--texto-2)', fontSize: '0.94rem' }}>
                O formulário já vem com a área preenchida.
              </p>
              <div style={{ marginTop: '1rem' }}>
                <FormularioAtendimento areaPadrao={area.nome} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      </main>

      <RodapeAurea />
    </div>
  )
}
