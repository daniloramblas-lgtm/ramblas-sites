import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { modeloPorSlug } from '../data/modelos'
import { metasModelo } from '../data/rotas'
import FormularioOrcamento from '../components/FormularioOrcamento'
import NaoEncontrada from './NaoEncontrada'
import { useReveal } from '../lib/useReveal'
import { useSeo } from '../lib/seo'
import { linkWhatsApp } from '../lib/whatsapp'
import { evento } from '../lib/analytics'
import { avisoDemonstrativo } from '../config/site.config'
import { meta404 } from '../data/rotas'

export default function ModeloDetalhe() {
  const { slug } = useParams()
  const modelo = modeloPorSlug(slug)
  const meta = metasModelo.find((m) => m.caminho === `/modelos/${slug}`)
  const [modo, setModo] = useState<'desktop' | 'celular'>('desktop')
  useReveal(slug)
  useSeo(meta ?? meta404)

  if (!modelo) return <NaoEncontrada />

  return (
    <>
      <section className="modelo-topo secao-relevo">
        <div className="container">
          <p className="migalhas">
            <Link to="/">Início</Link> / <Link to="/modelos">Modelos</Link> / {modelo.nome}
          </p>

          <div className="modelo-topo__grade">
            <div>
              <span className="selo">Estudo de caso conceitual</span>
              <h1 style={{ marginTop: '1rem' }}>{modelo.nome}</h1>
              <p style={{ fontSize: '1.08rem', color: 'var(--grafite-2)' }}>{modelo.resumo}</p>
              <p className="nota-demo">{avisoDemonstrativo}</p>
              <div className="hero__acoes">
                <a
                  className="btn btn--primario"
                  href={linkWhatsApp(`Olá! Quero um site como o modelo ${modelo.nome}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => evento('whatsapp_click', { origem: `modelo-${modelo.slug}` })}
                >
                  Quero um site como este
                </a>
                <Link
                  className="btn btn--contorno"
                  to={modelo.rotaDemo}
                  onClick={() => evento('open_demo', { modelo: modelo.slug })}
                >
                  Abrir demonstração
                </Link>
              </div>
            </div>

            <div className="visualizador com-perspectiva">
              <div className="visualizador__barra">
                <span style={{ fontSize: '0.88rem', color: 'var(--grafite-2)' }}>Prévia do modelo</span>
                <div className="alternador" role="group" aria-label="Alternar visualização">
                  <button type="button" aria-pressed={modo === 'desktop'} onClick={() => setModo('desktop')}>
                    Computador
                  </button>
                  <button type="button" aria-pressed={modo === 'celular'} onClick={() => setModo('celular')}>
                    Celular
                  </button>
                </div>
              </div>
              <div className="visualizador__tela tem-relevo" data-modo={modo}>
                <img src={modelo.capa} alt={modelo.alt} width={1200} height={800} decoding="async" />
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--grafite-2)', margin: '0.9rem 0 0' }}>
                Para navegar de verdade, <Link to={modelo.rotaDemo}>abra a demonstração</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="caso-grade" data-reveal>
            <div className="painel-elevado">
              <h2 style={{ fontSize: '1.3rem' }}>O problema do segmento</h2>
              <p style={{ color: 'var(--grafite-2)', margin: 0 }}>{modelo.problema}</p>
            </div>
            <div className="painel-elevado">
              <h2 style={{ fontSize: '1.3rem' }}>A solução construída</h2>
              <p style={{ color: 'var(--grafite-2)', margin: 0 }}>{modelo.solucao}</p>
            </div>
          </div>

          <div className="colunas-info" style={{ marginTop: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            <div className="bloco-info" data-reveal>
              <h2>Indicado para</h2>
              <ul>
                {modelo.indicadoPara.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <div className="bloco-info" data-reveal>
              <h2>O que pode ser personalizado</h2>
              <ul>
                {modelo.personalizavel.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <div className="bloco-info" data-reveal>
              <h2>Recursos demonstrados</h2>
              <ul>
                {modelo.incluso.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <div className="bloco-info" data-reveal>
              <h2>O que exigiria backend em um projeto real</h2>
              <ul>
                {modelo.integracoes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <div className="bloco-info" data-reveal>
              <h2>Prazo estimado</h2>
              <p style={{ color: 'var(--grafite-2)' }}>
                {modelo.prazo}, contados a partir da aprovação do escopo e da entrega dos conteúdos.
              </p>
            </div>
            <div className="bloco-info" data-reveal>
              <h2>O que é apenas demonstrativo</h2>
              <ul>
                {modelo.demonstrativo.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="conversao">
        <div className="container conversao__grade">
          <div data-reveal>
            <h2>Quero um site como este</h2>
            <p>
              O modelo já vai anotado na mensagem. Complete o restante e o WhatsApp abre com tudo
              organizado.
            </p>
          </div>
          <div data-reveal>
            <FormularioOrcamento modeloInicial={modelo.nome} />
          </div>
        </div>
      </section>
    </>
  )
}
