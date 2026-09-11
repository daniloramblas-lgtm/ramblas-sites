import { Link } from 'react-router-dom'
import {
  beneficios,
  contato,
  conversao,
  etapas,
  faq,
  hero,
  planos,
  servicos,
} from '../config/site.config'
import GaleriaModelos from '../components/GaleriaModelos'
import FormularioOrcamento from '../components/FormularioOrcamento'
import { useReveal } from '../lib/useReveal'
import { useSeo } from '../lib/seo'
import { linkWhatsApp } from '../lib/whatsapp'

const dadosEstruturados = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Ramblas Sites',
  description:
    'Criação de sites, catálogos, agendamentos e sistemas sob medida para pequenos e médios negócios.',
  url: contato.site,
  email: contato.email,
  areaServed: 'BR',
  address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressRegion: 'SP', addressCountry: 'BR' },
  makesOffer: servicos.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.nome } })),
  mainEntity: {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.p,
      acceptedAnswer: { '@type': 'Answer', text: f.r },
    })),
  },
}

export default function Inicio() {
  useReveal()
  useSeo({
    titulo: 'Ramblas Sites — sites e sistemas sob medida para pequenos e médios negócios',
    descricao:
      'Criamos sites profissionais, catálogos, agendamentos e sistemas sob medida para transformar visitas em atendimentos e vendas.',
    caminho: '/',
    dados: dadosEstruturados,
  })

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="hero">
        <div className="container hero__grade">
          <div>
            <h1>{hero.titulo}</h1>
            <p className="hero__texto">{hero.texto}</p>
            <div className="hero__acoes">
              <Link className="btn btn--primario" to="/modelos">
                {hero.botaoPrimario}
              </Link>
              <a className="btn btn--contorno" href={linkWhatsApp()} target="_blank" rel="noopener">
                {hero.botaoSecundario}
              </a>
            </div>
            <div className="hero__marcas">
              <span>Alimentação</span>
              <span>Beleza</span>
              <span>Escritórios</span>
              <span>Automóveis</span>
            </div>
          </div>

          <div className="composicao" aria-hidden="false">
            <div className="moldura moldura--desktop">
              <div className="moldura__barra">
                <i />
                <i />
                <i />
              </div>
              <img
                src="/img/capa-linhanorte.webp"
                alt="Prévia de um modelo de site para concessionária em tela de computador"
                width={1200}
                height={800}
              />
            </div>
            <div className="moldura moldura--celular">
              <img
                src="/img/capa-forno27.webp"
                alt="Prévia de um cardápio digital de pizzaria em tela de celular"
                width={600}
                height={1000}
              />
            </div>
            <p className="composicao__etiqueta">
              <strong>Quatro modelos prontos para explorar</strong>
              Cada um com funcionalidades reais no navegador.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ benefícios */}
      <section className="beneficios">
        <div className="container">
          <div className="secao-cabecalho" data-reveal>
            <h2>O que muda quando o site é feito para o seu negócio</h2>
            <p>
              Não é só ter uma página no ar. É ter uma ferramenta que responde quando você está atendendo
              alguém, fechando o caixa ou dormindo.
            </p>
          </div>
          <div className="grade-beneficios" data-reveal>
            {beneficios.map((b) => (
              <article className="beneficio" key={b.titulo}>
                <h3>{b.titulo}</h3>
                <p>{b.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- modelos */}
      <section id="modelos">
        <div className="container">
          <div className="secao-cabecalho" data-reveal>
            <h2>Modelos demonstrativos por segmento</h2>
            <p>
              Todas as empresas abaixo são fictícias, criadas para mostrar possibilidades. Você pode navegar
              por cada demonstração como se fosse um cliente do negócio.
            </p>
          </div>
          <GaleriaModelos />
        </div>
      </section>

      {/* -------------------------------------------------------- serviços */}
      <section id="servicos">
        <div className="container">
          <div className="secao-cabecalho" data-reveal>
            <h2>Serviços</h2>
            <p>
              Do primeiro domínio ao painel que a sua equipe usa todo dia. Você contrata só o que faz sentido
              para o momento do negócio.
            </p>
          </div>
        </div>
        <div className="grade-servicos" data-reveal>
          {servicos.map((s) => (
            <article className="servico" key={s.nome}>
              <h3>{s.nome}</h3>
              <p>{s.texto}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- como funciona */}
      <section id="como-funciona" className="como-funciona">
        <div className="container">
          <div className="secao-cabecalho" data-reveal>
            <h2>Como funciona</h2>
            <p>Quatro etapas, sem surpresa no meio do caminho. Você sabe o que acontece em cada uma delas.</p>
          </div>
          <div className="etapas">
            {etapas.map((e) => (
              <article className="etapa" key={e.titulo} data-reveal>
                <h3>{e.titulo}</h3>
                <p>{e.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- planos */}
      <section id="planos">
        <div className="container">
          <div className="secao-cabecalho" data-reveal>
            <h2>Planos</h2>
            <p>
              Os valores servem como ponto de partida. O orçamento final depende do número de páginas, das
              funcionalidades e do conteúdo que você já tem pronto.
            </p>
          </div>
          <div className="grade-planos">
            {planos.map((p) => (
              <article className={`plano ${p.destaque ? 'plano--destaque' : ''}`} key={p.nome} data-reveal>
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
                      <small>valor mediante orçamento</small>
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
                  rel="noopener"
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
                <a href={linkWhatsApp()} target="_blank" rel="noopener">
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
