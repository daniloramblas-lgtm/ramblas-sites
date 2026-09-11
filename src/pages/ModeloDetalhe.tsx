import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { modeloPorSlug } from '../data/modelos'
import FormularioOrcamento from '../components/FormularioOrcamento'
import NaoEncontrada from './NaoEncontrada'
import { useReveal } from '../lib/useReveal'
import { useSeo } from '../lib/seo'
import { linkWhatsApp } from '../lib/whatsapp'
import { avisoDemonstrativo } from '../config/site.config'

export default function ModeloDetalhe() {
  const { slug } = useParams()
  const modelo = modeloPorSlug(slug)
  const [modo, setModo] = useState<'desktop' | 'celular'>('desktop')
  useReveal(slug)
  useSeo({
    titulo: modelo ? `${modelo.nome} — modelo demonstrativo | Ramblas Sites` : 'Modelo não encontrado',
    descricao: modelo?.resumo ?? 'Modelo não encontrado.',
    caminho: `/modelos/${slug ?? ''}`,
    imagem: modelo?.capa,
  })

  if (!modelo) return <NaoEncontrada />

  return (
    <>
      <section className="modelo-topo">
        <div className="container">
          <p className="migalhas">
            <Link to="/">Início</Link> / <Link to="/modelos">Modelos</Link> / {modelo.nome}
          </p>

          <div className="modelo-topo__grade">
            <div>
              <span className="selo">Modelo demonstrativo</span>
              <h1 style={{ marginTop: '1rem' }}>{modelo.nome}</h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--grafite-2)' }}>{modelo.resumo}</p>
              <p className="nota-demo">{avisoDemonstrativo}</p>
              <div className="hero__acoes">
                <a
                  className="btn btn--primario"
                  href={linkWhatsApp(`Olá! Quero um site como o modelo ${modelo.nome}.`)}
                  target="_blank"
                  rel="noopener"
                >
                  Quero um site como este
                </a>
                <Link className="btn btn--contorno" to={modelo.rotaDemo}>
                  Abrir demonstração em tela cheia
                </Link>
              </div>
            </div>

            <div className="visualizador">
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
              <div className="visualizador__tela" data-modo={modo}>
                <img src={modelo.capa} alt={modelo.alt} width={1200} height={800} />
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--grafite-2)', margin: '0.9rem 0 0' }}>
                A prévia mostra o enquadramento do layout. Para navegar de verdade,{' '}
                <Link to={modelo.rotaDemo}>abra a demonstração</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container colunas-info">
          <div className="bloco-info" data-reveal>
            <h3>Indicado para</h3>
            <ul>
              {modelo.indicadoPara.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
          <div className="bloco-info" data-reveal>
            <h3>O que pode ser personalizado</h3>
            <ul>
              {modelo.personalizavel.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
          <div className="bloco-info" data-reveal>
            <h3>Funcionalidades incluídas</h3>
            <ul>
              {modelo.incluso.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
          <div className="bloco-info" data-reveal>
            <h3>Integrações opcionais</h3>
            <ul>
              {modelo.integracoes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
          <div className="bloco-info" data-reveal>
            <h3>Prazo estimado</h3>
            <p style={{ color: 'var(--grafite-2)' }}>
              {modelo.prazo}, contados a partir da aprovação do escopo e da entrega dos conteúdos.
            </p>
          </div>
          <div className="bloco-info" data-reveal>
            <h3>O que é apenas demonstrativo</h3>
            <ul>
              {modelo.demonstrativo.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="conversao">
        <div className="container conversao__grade">
          <div data-reveal>
            <h2>Quero um site como este</h2>
            <p>
              Já deixamos o modelo selecionado no formulário. Complete o restante e a mensagem vai pronta
              para o WhatsApp.
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
