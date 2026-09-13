import { Link } from 'react-router-dom'
import './escritorio.css'
import { areas, artigos, enderecoAurea, equipe, faqAurea } from './dados'
import { CabecalhoAurea, FormularioAtendimento, RodapeAurea } from './LayoutAurea'
import { BarraDemo, PularParaConteudo } from '../../components/DemoShell'
import { metaDemoPorCaminho } from '../../data/rotas'
import { dataLonga } from '../../lib/format'
import { useSeo } from '../../lib/seo'

export default function Escritorio() {
  useSeo(metaDemoPorCaminho('/demonstracao/aurea')!)

  return (
    <div className="demo-escritorio">
      <PularParaConteudo />
      <BarraDemo id="aurea" />
      <CabecalhoAurea />

      <main id="conteudo">
      <section className="au-hero">
        <img src="/img/hero-escritorio.webp" alt="Ambiente de escritório com luz natural" width={1600} height={900} />
        <div className="container au-hero__conteudo">
          <div className="au-filete" />
          <h1>Assessoria para decisões que a sua empresa não pode tomar no escuro</h1>
          <p>
            Consultoria empresarial, contratos, conformidade e planejamento patrimonial, com linguagem clara
            e acompanhamento próximo em cada etapa.
          </p>
          <div className="au-hero__acoes">
            <a className="au-btn au-btn--claro" href="#atendimento">
              Iniciar atendimento
            </a>
            <a className="au-btn au-btn--contorno" href="#areas" style={{ borderColor: 'rgba(251,248,240,.6)', color: '#fbf8f0' }}>
              Ver áreas de atuação
            </a>
          </div>
        </div>
      </section>

      <section className="au-secao" id="sobre">
        <div className="container au-sobre">
          <div>
            <div className="au-titulo">
              <h2>O escritório</h2>
              <p>
                A Áurea reúne profissionais de direito empresarial, conformidade e planejamento patrimonial
                em torno de um método simples: entender o negócio antes de propor documento.
              </p>
            </div>
            <p style={{ color: 'var(--texto-2)' }}>
              O atendimento começa por um diagnóstico documental e segue com reuniões periódicas, para que o
              cliente saiba em que etapa cada assunto está. As comunicações ficam registradas e o escopo de
              cada trabalho é definido por escrito antes do início.
            </p>
            <div className="au-numeros">
              <p>
                <strong>4</strong> áreas de atuação
              </p>
              <p>
                <strong>48h</strong> prazo de retorno ao primeiro contato
              </p>
              <p>
                <strong>Remoto</strong> reuniões por videoconferência
              </p>
            </div>
          </div>
          <img src="/img/aurea-sobre.webp" alt="Ilustração do ambiente do escritório" loading="lazy" width={1200} height={800} />
        </div>
      </section>

      <section className="au-secao au-secao--claro" id="areas">
        <div className="container">
          <div className="au-titulo">
            <h2>Áreas de atuação</h2>
            <p>Cada área tem uma página própria com escopo, entregas e para quem é indicada.</p>
          </div>
          <div className="au-areas">
            {areas.map((a) => (
              <article className="au-area" key={a.slug}>
                <h3>{a.nome}</h3>
                <p>{a.resumo}</p>
                <Link to={`/demonstracao/aurea/areas/${a.slug}`}>Conhecer a área</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="au-secao" id="equipe">
        <div className="container">
          <div className="au-titulo">
            <h2>Equipe</h2>
            <p>Profissionais fictícios, criados para demonstrar a apresentação institucional.</p>
          </div>
          <div className="au-equipe">
            {equipe.map((p) => (
              <article className="au-pessoa" key={p.nome}>
                <img src={p.foto} alt={p.alt} loading="lazy" width={700} height={700} />
                <h3>{p.nome}</h3>
                <span>{p.funcao}</span>
                <small>{p.formacao}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="au-secao au-secao--verde" id="atendimento">
        <div className="container au-colunas">
          <div>
            <div className="au-titulo">
              <h2>Atendimento inicial</h2>
              <p>
                Conte o essencial sobre o assunto e indique uma data para a reunião. O retorno acontece em
                até 48 horas úteis.
              </p>
            </div>
            <p className="au-aviso">
              Este formulário não cria relação profissional e não substitui análise de caso concreto. Nenhum
              resultado é prometido. Os dados são usados apenas para responder ao contato, conforme a LGPD.
            </p>
            <p className="au-aviso" style={{ marginTop: '1.2rem' }}>
              Nesta demonstração, o formulário valida os campos e monta a mensagem no WhatsApp. Envio por
              e-mail, guarda de documentos e área do cliente exigem backend.
            </p>
          </div>
          <FormularioAtendimento />
        </div>
      </section>

      <section className="au-secao" id="conteudos">
        <div className="container">
          <div className="au-titulo">
            <h2>Conteúdos</h2>
            <p>Artigos informativos escritos para clientes e equipes internas.</p>
          </div>
          <div className="au-artigos">
            {artigos.slice(0, 2).map((a) => (
              <article className="au-artigo" key={a.slug}>
                <img src={a.capa} alt={`Ilustração do artigo ${a.titulo}`} loading="lazy" width={1000} height={620} />
                <div className="au-artigo__corpo">
                  <small>
                    {dataLonga(a.data)} · {a.leitura}
                  </small>
                  <h3>{a.titulo}</h3>
                  <p>{a.resumo}</p>
                  <Link to={`/demonstracao/aurea/artigos/${a.slug}`}>Ler artigo</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="au-secao au-secao--claro" id="faq">
        <div className="container au-colunas">
          <div className="au-titulo">
            <h2>Perguntas frequentes</h2>
            <p>As dúvidas mais comuns antes do primeiro atendimento.</p>
            <p style={{ marginTop: '1.5rem' }}>{enderecoAurea}</p>
            <img
              src="/img/mapa-escritorio.webp"
              alt="Ilustração de mapa com a localização do escritório"
              loading="lazy"
              width={1200}
              height={620}
              style={{ width: '100%', borderRadius: 3, marginTop: '1rem', border: '1px solid var(--linha)' }}
            />
          </div>
          <div className="au-faq">
            {faqAurea.map((f) => (
              <details key={f.p}>
                <summary>{f.p}</summary>
                <p>{f.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      </main>

      <RodapeAurea />
    </div>
  )
}
