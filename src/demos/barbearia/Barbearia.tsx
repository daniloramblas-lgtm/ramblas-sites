import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './barbearia.css'
import {
  enderecoBarbearia,
  galeria,
  horariosBarbearia,
  planos,
  profissionais,
  servicos,
} from './dados'
import { horariosDoDia, profissionalAtende, proximosDias } from './agenda'
import { BarraDemonstracao } from '../../components/Comuns'
import { brl, dataLonga, diaSemanaCurto } from '../../lib/format'
import { linkWhatsApp, montarMensagem } from '../../lib/whatsapp'
import { useSeo } from '../../lib/seo'

const categorias = ['Corte', 'Barba', 'Acabamento', 'Combo'] as const

export default function Barbearia() {
  const hoje = useMemo(() => new Date(), [])
  const dias = useMemo(() => proximosDias(hoje, 14), [hoje])

  const [servicoId, setServicoId] = useState(servicos[0].id)
  const [profissionalId, setProfissionalId] = useState(profissionais[0].id)
  const [dia, setDia] = useState<string>('')
  const [hora, setHora] = useState<string>('')
  const [nome, setNome] = useState('')
  const [erro, setErro] = useState('')
  const [confirmado, setConfirmado] = useState(false)

  const servico = servicos.find((s) => s.id === servicoId)!
  const profissional = profissionais.find((p) => p.id === profissionalId)!
  const horarios = useMemo(
    () => (dia ? horariosDoDia(profissionalId, dia, servico.duracao) : []),
    [dia, profissionalId, servico.duracao],
  )

  function escolherProfissional(id: string) {
    setProfissionalId(id)
    setHora('')
    setConfirmado(false)
    if (dia && !profissionalAtende(id, dia)) setDia('')
  }

  function confirmar() {
    if (!dia || !hora) {
      setErro('Escolha um dia e um horário disponível.')
      return
    }
    if (nome.trim().length < 2) {
      setErro('Informe seu nome para a reserva.')
      return
    }
    setErro('')
    const mensagem = montarMensagem(
      'Agendamento — Distrito 13 Barbearia (demonstração)',
      [
        ['Cliente', nome],
        ['Serviço', `${servico.nome} (${servico.duracao} min)`],
        ['Profissional', profissional.nome],
        ['Data', dataLonga(dia)],
        ['Horário', hora],
        ['Valor', brl(servico.preco)],
      ],
      'Agendamento gerado por um site demonstrativo da Ramblas Sites. Horário sujeito a confirmação.',
    )
    window.open(linkWhatsApp(mensagem), '_blank', 'noopener')
    setConfirmado(true)
  }

  useSeo({
    titulo: 'Distrito 13 Barbearia — modelo demonstrativo | Ramblas Sites',
    descricao:
      'Modelo demonstrativo de barbearia com agendamento por profissional, data e horário. Empresa fictícia criada para apresentar possibilidades.',
    caminho: '/demonstracao/distrito-13',
    imagem: '/img/capa-distrito13.webp',
  })

  return (
    <div className="demo-barbearia">
      <BarraDemonstracao nome="Distrito 13 Barbearia" slug="distrito-13" />

      <header className="bb-cabecalho">
        <div className="container bb-cabecalho__interno">
          <a className="bb-logo" href="#agendar">
            Distrito <b>13</b>
          </a>
          <nav className="bb-nav" aria-label="Navegação da barbearia">
            <a href="#servicos">Serviços</a>
            <a href="#equipe">Equipe</a>
            <a href="#agendar">Agenda</a>
            <a href="#clube">Clube</a>
            <a href="#visita">Contato</a>
          </nav>
          <a className="bb-btn bb-btn--cobre bb-btn--pequeno" href="#agendar">
            Agendar horário
          </a>
        </div>
      </header>

      <section className="bb-hero">
        <img src="/img/hero-barbearia.webp" alt="Ambiente de barbearia com iluminação quente" width={1600} height={900} />
        <div className="container bb-hero__conteudo">
          <span className="bb-etiqueta">Desde 2016 no Bairro Alto</span>
          <h1>Corte marcado na hora certa, feito sem pressa</h1>
          <p>
            Escolha o barbeiro, o dia e o horário em menos de um minuto. Você recebe a confirmação no
            WhatsApp e a cadeira fica reservada.
          </p>
          <div className="bb-hero__acoes">
            <a className="bb-btn bb-btn--cobre" href="#agendar">
              Agendar agora
            </a>
            <a className="bb-btn bb-btn--contorno" href="#servicos">
              Ver serviços e valores
            </a>
          </div>
        </div>
      </section>

      <section className="bb-secao bb-secao--areia" id="servicos">
        <div className="container">
          <div className="bb-titulo">
            <h2>Serviços</h2>
            <p>Valores demonstrativos. Cada serviço tem duração própria e ocupa a agenda pelo tempo real.</p>
          </div>
          <div className="bb-servicos">
            {categorias.map((cat) => (
              <div key={cat}>
                <p className="bb-categoria">{cat}</p>
                {servicos
                  .filter((s) => s.categoria === cat)
                  .map((s) => (
                    <article className="bb-servico" key={s.id}>
                      <h3>{s.nome}</h3>
                      <span className="bb-servico__preco">
                        {brl(s.preco)}
                        <small>{s.duracao} min</small>
                      </span>
                      <p>{s.descricao}</p>
                    </article>
                  ))}
              </div>
            ))}
          </div>
          <p className="bb-nota">
            Projeto demonstrativo — empresa fictícia criada para apresentar possibilidades. Tabela e
            durações são ilustrativas.
          </p>
        </div>
      </section>

      <section className="bb-secao" id="equipe">
        <div className="container">
          <div className="bb-titulo">
            <h2>Quem vai te atender</h2>
            <p>Profissionais fictícios, criados para mostrar como funciona a escolha por barbeiro.</p>
          </div>
          <div className="bb-equipe">
            {profissionais.map((p) => (
              <article className="bb-pessoa" key={p.id}>
                <img src={p.foto} alt={p.alt} loading="lazy" width={700} height={700} />
                <div className="bb-pessoa__corpo">
                  <h3>{p.nome}</h3>
                  <span>{p.funcao}</span>
                  <ul>
                    {p.especialidades.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="bb-btn bb-btn--contorno bb-btn--pequeno"
                    style={{ marginTop: '1rem' }}
                    onClick={() => {
                      escolherProfissional(p.id)
                      document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Agendar com {p.nome.split(' ')[0]}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ agenda */}
      <section className="bb-secao" id="agendar">
        <div className="container">
          <div className="bb-titulo">
            <h2>Agende seu horário</h2>
            <p>Calendário demonstrativo: a disponibilidade é gerada no navegador, sem agenda real.</p>
          </div>

          <div className="bb-agenda">
            <div className="bb-quadro">
              <p className="bb-passo">1. Escolha o serviço</p>
              <div className="bb-escolhas">
                {servicos.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className="bb-escolha"
                    aria-pressed={servicoId === s.id}
                    onClick={() => {
                      setServicoId(s.id)
                      setHora('')
                      setConfirmado(false)
                    }}
                  >
                    {s.nome}
                    <small>
                      {brl(s.preco)} · {s.duracao} min
                    </small>
                  </button>
                ))}
              </div>

              <p className="bb-passo">2. Escolha o profissional</p>
              <div className="bb-escolhas">
                {profissionais.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="bb-escolha"
                    aria-pressed={profissionalId === p.id}
                    onClick={() => escolherProfissional(p.id)}
                  >
                    {p.nome}
                    <small>{p.funcao}</small>
                  </button>
                ))}
              </div>

              <p className="bb-passo">3. Escolha o dia</p>
              <div className="bb-dias" role="group" aria-label="Dias disponíveis">
                {dias.map((d) => {
                  const atende = profissionalAtende(profissionalId, d)
                  return (
                    <button
                      key={d}
                      type="button"
                      className="bb-dia"
                      aria-pressed={dia === d}
                      disabled={!atende}
                      title={atende ? dataLonga(d) : `${profissional.nome} não atende neste dia`}
                      onClick={() => {
                        setDia(d)
                        setHora('')
                        setConfirmado(false)
                      }}
                    >
                      <small>{diaSemanaCurto(d)}</small>
                      <b>{d.slice(-2)}</b>
                      <small>{['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'][Number(d.slice(5, 7)) - 1]}</small>
                    </button>
                  )
                })}
              </div>

              <p className="bb-passo">4. Escolha o horário</p>
              {!dia && <p style={{ color: 'rgba(230,220,201,.6)' }}>Selecione um dia para ver os horários livres.</p>}
              {dia && horarios.length === 0 && (
                <p style={{ color: 'rgba(230,220,201,.6)' }}>
                  {profissional.nome} não atende em {dataLonga(dia)}. Escolha outro dia ou outro profissional.
                </p>
              )}
              {horarios.length > 0 && (
                <div className="bb-horarios" role="group" aria-label="Horários disponíveis">
                  {horarios.map((h) => (
                    <button
                      key={h.hora}
                      type="button"
                      className="bb-hora"
                      aria-pressed={hora === h.hora}
                      disabled={!h.livre}
                      onClick={() => {
                        setHora(h.hora)
                        setConfirmado(false)
                      }}
                    >
                      {h.hora}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <aside className="bb-quadro bb-resumo">
              <h3 style={{ marginTop: 0 }}>Resumo</h3>
              <dl>
                <div>
                  <dt>Serviço</dt>
                  <dd>
                    {servico.nome} · {servico.duracao} min
                  </dd>
                </div>
                <div>
                  <dt>Profissional</dt>
                  <dd>{profissional.nome}</dd>
                </div>
                <div>
                  <dt>Data e horário</dt>
                  <dd>{dia && hora ? `${dataLonga(dia)} às ${hora}` : 'Ainda não escolhido'}</dd>
                </div>
              </dl>
              <div className="bb-resumo__total">
                <span>Total</span>
                <span>{brl(servico.preco)}</span>
              </div>

              <div style={{ marginTop: '1.2rem' }}>
                <label htmlFor="bb-nome" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>
                  Seu nome
                </label>
                <input
                  id="bb-nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  style={{
                    width: '100%',
                    font: 'inherit',
                    padding: '0.7rem 0.85rem',
                    borderRadius: 5,
                    border: '1px solid rgba(230,220,201,.25)',
                    background: 'transparent',
                    color: 'inherit',
                  }}
                />
              </div>

              <button
                type="button"
                className="bb-btn bb-btn--cobre"
                style={{ width: '100%', marginTop: '1rem' }}
                onClick={confirmar}
              >
                Confirmar pelo WhatsApp
              </button>

              {erro && (
                <p className="bb-alerta" role="alert">
                  {erro}
                </p>
              )}
              {confirmado && (
                <p className="bb-ok" role="status">
                  Agendamento montado e aberto no WhatsApp. Nesta demonstração nenhum horário é reservado de
                  fato.
                </p>
              )}
              <p className="bb-nota">
                Em um projeto contratado, o horário seria bloqueado no banco de dados, com lembrete
                automático um dia antes e aviso ao barbeiro.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="bb-secao" id="galeria">
        <div className="container">
          <div className="bb-titulo">
            <h2>Galeria</h2>
            <p>Imagens ilustrativas do ambiente e dos trabalhos.</p>
          </div>
          <div className="bb-galeria">
            {galeria.map((g) => (
              <img key={g.src} src={g.src} alt={g.alt} loading="lazy" width={800} height={800} />
            ))}
          </div>
        </div>
      </section>

      <section className="bb-secao bb-secao--areia" id="clube">
        <div className="container">
          <div className="bb-titulo">
            <h2>Clube Distrito</h2>
            <p>Assinatura mensal demonstrativa, com cobrança recorrente em um projeto real.</p>
          </div>
          <div className="bb-planos">
            {planos.map((p) => (
              <article className={`bb-plano ${p.destaque ? 'bb-plano--destaque' : ''}`} key={p.nome}>
                <h3>{p.nome}</h3>
                <span className="bb-plano__preco">{brl(p.preco)}/mês</span>
                <ul>
                  {p.itens.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <a
                  className={`bb-btn ${p.destaque ? 'bb-btn--cobre' : 'bb-btn--contorno'}`}
                  style={p.destaque ? undefined : { borderColor: 'rgba(27,26,23,.4)', color: '#1b1a17' }}
                  href={linkWhatsApp(`Olá! Quero saber mais sobre o ${p.nome} (demonstração Distrito 13).`)}
                  target="_blank"
                  rel="noopener"
                >
                  Quero assinar
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bb-secao" id="visita">
        <div className="container bb-contato">
          <div>
            <h2>Onde ficamos</h2>
            <p style={{ color: 'rgba(230,220,201,.75)' }}>{enderecoBarbearia}</p>
            <h3 style={{ marginTop: '1.6rem' }}>Horários</h3>
            <ul className="bb-lista-horarios">
              {horariosBarbearia.map((h) => (
                <li key={h.dia}>
                  <span>{h.dia}</span>
                  <strong>{h.hora}</strong>
                </li>
              ))}
            </ul>
            <p className="bb-nota">
              Lembretes automáticos, confirmação por mensagem e bloqueio de agenda dependem de backend e da
              API oficial do WhatsApp.
            </p>
          </div>
          <figure className="bb-mapa" style={{ margin: 0 }}>
            <img src="/img/mapa-barbearia.webp" alt="Ilustração de mapa com a localização da barbearia" loading="lazy" width={1200} height={620} />
          </figure>
        </div>
      </section>

      <footer className="bb-rodape">
        <div className="container">
          <p style={{ maxWidth: '70ch' }}>
            Distrito 13 Barbearia é uma empresa fictícia. Projeto demonstrativo — empresa fictícia criada
            para apresentar possibilidades. Preços, equipe e agenda são ilustrativos.
          </p>
          <p>
            <Link to="/modelos/distrito-13">Sobre este modelo</Link> · <Link to="/">Ramblas Sites</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
