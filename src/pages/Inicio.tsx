import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  contato,
  conversao,
  etapas,
  faq,
  hero,
  planos,
  planosIntro,
  quemFaz,
  servicos,
} from '../config/site.config'
import GaleriaModelos from '../components/GaleriaModelos'
import FormularioOrcamento from '../components/FormularioOrcamento'
import Hero3D from '../components/Hero3D'
import { BotaoVerMais } from '../components/Comuns'
import { useReveal } from '../lib/useReveal'
import { useSeo } from '../lib/seo'
import { metaHome } from '../data/rotas'
import { linkWhatsApp } from '../lib/whatsapp'
import { evento } from '../lib/analytics'

export default function Inicio() {
  const [todosServicos, setTodosServicos] = useState(false)
  useReveal(todosServicos)
  useSeo(metaHome)

  const principais = servicos.filter((s) => s.destaque)
  const extras = servicos.filter((s) => !s.destaque)

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="hero secao-relevo">
        <div className="container hero__grade">
          <div>
            <h1>{hero.titulo}</h1>
            <p className="hero__texto">{hero.texto}</p>
            <ul className="hero__pontos">
              {hero.pontos.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="hero__acoes">
              <Link className="btn btn--primario" to="/modelos">
                {hero.botaoPrimario}
              </Link>
              <a
                className="btn btn--contorno"
                href={linkWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => evento('whatsapp_click', { origem: 'hero' })}
              >
                {hero.botaoSecundario}
              </a>
            </div>
          </div>

          <Hero3D />
        </div>
      </section>

      {/* --------------------------------------------------------- modelos */}
      <section id="modelos">
        <div className="container">
          <div className="secao-cabecalho" data-reveal>
            <h2>Modelos demonstrativos por segmento</h2>
            <p>
              Empresas fictícias criadas para mostrar possibilidades. Você navega em cada demonstração como
              se fosse cliente do negócio.
            </p>
          </div>
          <GaleriaModelos />
        </div>
      </section>

      {/* -------------------------------------------------------- serviços */}
      <section id="servicos" className="beneficios secao-relevo secao-relevo--terracota">
        <div className="container">
          <div className="secao-cabecalho" data-reveal>
            <h2>Serviços</h2>
            <p>Você contrata só o que faz sentido para o momento do negócio.</p>
          </div>
          <div className="grade-servicos-compacta" id="lista-servicos" data-reveal>
            {principais.map((s) => (
              <article className="servico-card" key={s.nome}>
                <h3>{s.nome}</h3>
                <p>{s.texto}</p>
              </article>
            ))}
            {todosServicos &&
              extras.map((s) => (
                <article className="servico-card" key={s.nome}>
                  <h3>{s.nome}</h3>
                  <p>{s.texto}</p>
                </article>
              ))}
          </div>
          <p style={{ marginTop: '1.25rem' }}>
            <BotaoVerMais
              aberto={todosServicos}
              onClick={() => setTodosServicos((v) => !v)}
              rotuloAbrir={`Ver todos os serviços (+${extras.length})`}
              controla="lista-servicos"
            />
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------- como funciona */}
      <section id="como-funciona" className="como-funciona">
        <div className="container">
          <div className="secao-cabecalho" data-reveal>
            <h2>Como funciona</h2>
            <p>Quatro etapas, sem surpresa no meio do caminho.</p>
          </div>
          <ol className="etapas-compactas" data-reveal>
            {etapas.map((e) => (
              <li key={e.titulo}>
                <h3>{e.titulo}</h3>
                <p>{e.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------- quem faz */}
      <section id="quem-faz">
        <div className="container quem-faz painel-elevado" data-reveal>
          <div className="quem-faz__retrato">
            {quemFaz.foto ? (
              <img src={quemFaz.foto} alt={`Foto de ${quemFaz.nome}`} width={700} height={700} loading="lazy" />
            ) : (
              <span className="monograma" aria-hidden="true">
                DR
              </span>
            )}
          </div>
          <div>
            <h2>Quem está por trás da Ramblas Sites</h2>
            <p style={{ fontWeight: 600 }}>
              {quemFaz.nome} — {quemFaz.papel}
            </p>
            {quemFaz.apresentacao.map((p) => (
              <p key={p.slice(0, 20)} style={{ color: 'var(--grafite-2)' }}>
                {p}
              </p>
            ))}
            <ul className="quem-faz__pontos">
              {quemFaz.pontos.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p style={{ color: 'var(--grafite-2)' }}>{quemFaz.comoConduz}</p>
            <p className="nota-demo">{quemFaz.aviso}</p>
            <div className="hero__acoes" style={{ marginTop: '1.25rem' }}>
              <a
                className="btn btn--primario btn--pequeno"
                href={linkWhatsApp('Olá, Danilo! Vim pelo site da Ramblas Sites e quero conversar sobre um projeto.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => evento('whatsapp_click', { origem: 'quem-faz' })}
              >
                Conversar pelo WhatsApp
              </a>
              <a className="btn btn--contorno btn--pequeno" href={contato.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a className="btn btn--contorno btn--pequeno" href={contato.portfolio} target="_blank" rel="noopener noreferrer">
                Portfólio pessoal
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- planos */}
      <section id="planos">
        <div className="container">
          <div className="secao-cabecalho" data-reveal>
            <h2>Planos</h2>
            <p>{planosIntro}</p>
          </div>
          <div className="grade-planos">
            {planos.map((p) => (
              <article className={`plano tem-relevo ${p.destaque ? 'plano--destaque' : ''}`} key={p.nome} data-reveal>
                <h3>{p.nome}</h3>
                <div className="plano__preco">
                  {p.apartirDe ? (
                    <>
                      R$ {p.apartirDe}
                      <small>a partir de</small>
                    </>
                  ) : (
                    <>
                      Sob consulta
                      <small>orçamento após uma conversa rápida</small>
                    </>
                  )}
                </div>
                <p className="plano__resumo">{p.resumo}</p>
                <ul>
                  {p.itens.map((i) => (
                    <li key={i}>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
                <a
                  className={`btn ${p.destaque ? 'btn--claro' : 'btn--contorno'}`}
                  href={linkWhatsApp(`Olá! Tenho interesse no plano ${p.nome} da Ramblas Sites.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => evento('whatsapp_click', { origem: `plano-${p.nome}` })}
                >
                  Falar sobre o plano {p.nome}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- conversão */}
      <section id="contato" className="conversao">
        <div className="container conversao__grade">
          <div className="conversao__aside" data-reveal>
            <h2>{conversao.titulo}</h2>
            <p>{conversao.texto}</p>
            <ul className="contato-lista">
              <li>
                WhatsApp:{' '}
                <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer">
                  {contato.whatsappExibicao}
                </a>
              </li>
              <li>
                E-mail: <a href={`mailto:${contato.email}`}>{contato.email}</a>
              </li>
              <li>{contato.atendimento}</li>
            </ul>
          </div>
          <div data-reveal>
            <FormularioOrcamento />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- FAQ */}
      <section id="faq">
        <div className="container">
          <div className="secao-cabecalho" data-reveal>
            <h2>Perguntas frequentes</h2>
            <p>As dúvidas que aparecem em quase toda primeira conversa.</p>
          </div>
          <div className="faq" data-reveal>
            {faq.map((f) => (
              <details key={f.p}>
                <summary>{f.p}</summary>
                <p>{f.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
