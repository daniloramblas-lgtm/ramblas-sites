import { useState } from 'react'
import { Link } from 'react-router-dom'
import { areas, enderecoAurea } from './dados'
import { mascaraTelefone, telefoneValido, emailValido, dataLonga } from '../../lib/format'
import { erroDeData, hojeSaoPaulo } from '../../lib/datas'
import { MenuSecoes } from '../../components/DemoShell'
import { linkWhatsApp, montarMensagem } from '../../lib/whatsapp'
import { contato } from '../../config/site.config'

export function CabecalhoAurea() {
  return (
    <header className="au-cabecalho">
      <div className="container au-cabecalho__interno">
        <Link className="au-logo" to="/demonstracao/aurea">
          <i aria-hidden="true" />
          Áurea Consultoria
        </Link>
        <MenuSecoes
          rotulo="Navegação do escritório"
          secoes={[
            { href: '/demonstracao/aurea#sobre', rotulo: 'O escritório' },
            { href: '/demonstracao/aurea#areas', rotulo: 'Áreas' },
            { href: '/demonstracao/aurea#equipe', rotulo: 'Equipe' },
            { href: '/demonstracao/aurea#conteudos', rotulo: 'Conteúdos' },
            { href: '/demonstracao/aurea#atendimento', rotulo: 'Atendimento' },
          ]}
        />
        <Link className="au-btn au-btn--verde au-btn--pequeno" to="/demonstracao/aurea#atendimento">
          Contato
        </Link>
      </div>
    </header>
  )
}

export function RodapeAurea() {
  return (
    <footer className="au-rodape">
      <div className="container">
        <div className="au-rodape__grade">
          <div>
            <strong style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.2rem', color: '#fbf8f0' }}>
              Áurea Consultoria
            </strong>
            <p style={{ maxWidth: '36ch', marginTop: '0.8rem' }}>
              {enderecoAurea}. Atendimento presencial com hora marcada e reuniões por videoconferência.
            </p>
          </div>
          <div>
            <h2 className="au-rodape__titulo">Áreas de atuação</h2>
            <ul>
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link to={`/demonstracao/aurea/areas/${a.slug}`}>{a.nome}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="au-rodape__titulo">Contato</h2>
            <ul>
              <li>
                <a href={linkWhatsApp('Olá! Vim pela demonstração da Áurea Consultoria.')} target="_blank" rel="noopener">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${contato.email}`}>contato@aureaconsultoria.exemplo</a>
              </li>
              <li>
                <Link to="/privacidade">Política de privacidade</Link>
              </li>
            </ul>
          </div>
        </div>
        <p style={{ marginTop: '2.5rem', fontSize: '0.85rem', maxWidth: '78ch', opacity: 0.75 }}>
          Áurea Consultoria é uma empresa fictícia. Projeto demonstrativo — empresa fictícia criada para
          apresentar possibilidades. O conteúdo tem caráter informativo, não constitui orientação para casos
          concretos e não promete resultados. Dados enviados nesta demonstração não são armazenados.
        </p>
        <p style={{ fontSize: '0.85rem' }}>
          <Link to="/modelos/aurea">Sobre este modelo</Link> · <Link to="/">Ramblas Sites</Link>
        </p>
      </div>
    </footer>
  )
}

type DadosContato = {
  nome: string
  email: string
  telefone: string
  area: string
  assunto: string
  data: string
  periodo: string
  aceite: boolean
}

const inicial: DadosContato = {
  nome: '',
  email: '',
  telefone: '',
  area: '',
  assunto: '',
  data: '',
  periodo: 'Manhã',
  aceite: false,
}

/** Formulário de atendimento inicial + agendamento de reunião. */
export function FormularioAtendimento({ areaPadrao = '' }: { areaPadrao?: string }) {
  const [dados, setDados] = useState<DadosContato>({ ...inicial, area: areaPadrao })
  const [erros, setErros] = useState<Record<string, string>>({})
  const [enviado, setEnviado] = useState(false)
  const [arquivos, setArquivos] = useState<{ nome: string; tamanho: string }[]>([])

  function validar() {
    const e: Record<string, string> = {}
    if (dados.nome.trim().length < 2) e.nome = 'Informe seu nome completo.'
    if (!emailValido(dados.email)) e.email = 'Informe um e-mail válido.'
    if (!telefoneValido(dados.telefone)) e.telefone = 'Informe um telefone com DDD.'
    if (!dados.area) e.area = 'Escolha a área mais próxima do seu assunto.'
    if (dados.assunto.trim().length < 10) e.assunto = 'Descreva o assunto em pelo menos uma frase.'
    const erroData = erroDeData(dados.data, false)
    if (erroData) e.data = erroData
    if (!dados.aceite) e.aceite = 'É necessário concordar com o tratamento dos dados.'
    return e
  }

  function enviar(ev: React.FormEvent) {
    ev.preventDefault()
    const achados = validar()
    setErros(achados)
    if (Object.keys(achados).length) return
    const mensagem = montarMensagem(
      'Atendimento inicial — Áurea Consultoria (demonstração)',
      [
        ['Nome', dados.nome],
        ['E-mail', dados.email],
        ['Telefone', dados.telefone],
        ['Área', dados.area],
        ['Assunto', dados.assunto],
        ['Reunião pretendida', dados.data ? `${dataLonga(dados.data)} — ${dados.periodo}` : ''],
        ['Documentos indicados', arquivos.map((a) => a.nome).join(', ')],
      ],
      'Enviado por um site demonstrativo da Ramblas Sites. Nenhum dado foi armazenado.',
    )
    window.open(linkWhatsApp(mensagem), '_blank', 'noopener,noreferrer')
    setEnviado(true)
  }

  function simularUpload(lista: FileList | null) {
    if (!lista) return
    const novos = Array.from(lista).map((f) => ({
      nome: f.name,
      tamanho: `${Math.max(1, Math.round(f.size / 1024))} KB`,
    }))
    setArquivos((a) => [...a, ...novos].slice(0, 5))
  }

  return (
    <form className="au-formulario" onSubmit={enviar} noValidate>
      <div className="au-campo">
        <label htmlFor="au-nome">Nome completo</label>
        <input
          id="au-nome"
          value={dados.nome}
          aria-invalid={!!erros.nome}
          onChange={(e) => setDados({ ...dados, nome: e.target.value })}
        />
        {erros.nome && <span className="au-erro">{erros.nome}</span>}
      </div>

      <div className="au-campo">
        <label htmlFor="au-email">E-mail</label>
        <input
          id="au-email"
          type="email"
          value={dados.email}
          aria-invalid={!!erros.email}
          onChange={(e) => setDados({ ...dados, email: e.target.value })}
        />
        {erros.email && <span className="au-erro">{erros.email}</span>}
      </div>

      <div className="au-campo">
        <label htmlFor="au-telefone">Telefone</label>
        <input
          id="au-telefone"
          inputMode="tel"
          placeholder="(11) 90000-0000"
          value={dados.telefone}
          aria-invalid={!!erros.telefone}
          onChange={(e) => setDados({ ...dados, telefone: mascaraTelefone(e.target.value) })}
        />
        {erros.telefone && <span className="au-erro">{erros.telefone}</span>}
      </div>

      <div className="au-campo">
        <label htmlFor="au-area">Área</label>
        <select
          id="au-area"
          value={dados.area}
          aria-invalid={!!erros.area}
          onChange={(e) => setDados({ ...dados, area: e.target.value })}
        >
          <option value="">Selecione</option>
          {areas.map((a) => (
            <option key={a.slug} value={a.nome}>
              {a.nome}
            </option>
          ))}
        </select>
        {erros.area && <span className="au-erro">{erros.area}</span>}
      </div>

      <div className="au-campo">
        <label htmlFor="au-assunto">Assunto</label>
        <textarea
          id="au-assunto"
          value={dados.assunto}
          aria-invalid={!!erros.assunto}
          placeholder="Descreva em linhas gerais o que precisa ser analisado."
          onChange={(e) => setDados({ ...dados, assunto: e.target.value })}
        />
        {erros.assunto && <span className="au-erro">{erros.assunto}</span>}
      </div>

      <div className="au-campos-duplos">
        <div className="au-campo">
          <label htmlFor="au-data">Reunião — data pretendida</label>
          <input
            id="au-data"
            type="date"
            min={hojeSaoPaulo()}
            value={dados.data}
            aria-invalid={!!erros.data}
            onChange={(e) => setDados({ ...dados, data: e.target.value })}
          />
          {erros.data && <span className="au-erro">{erros.data}</span>}
        </div>
        <div className="au-campo">
          <label htmlFor="au-periodo">Período</label>
          <select id="au-periodo" value={dados.periodo} onChange={(e) => setDados({ ...dados, periodo: e.target.value })}>
            <option>Manhã</option>
            <option>Tarde</option>
            <option>Fim do dia</option>
          </select>
        </div>
      </div>

      <div className="au-campo">
        <label htmlFor="au-arquivos">Documentos (envio demonstrativo)</label>
        <div className="au-arquivos">
          <input
            id="au-arquivos"
            type="file"
            multiple
            onChange={(e) => simularUpload(e.target.files)}
            style={{ border: 0, padding: 0 }}
          />
          <p style={{ margin: '0.6rem 0 0' }}>
            Os arquivos ficam somente no seu navegador: nada é enviado ou armazenado nesta demonstração.
          </p>
          {arquivos.length > 0 && (
            <ul>
              {arquivos.map((a, i) => (
                <li key={`${a.nome}-${i}`}>
                  <span>{a.nome}</span>
                  <span>{a.tamanho}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <label style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.88rem', marginBottom: '1rem' }}>
        <input
          type="checkbox"
          checked={dados.aceite}
          onChange={(e) => setDados({ ...dados, aceite: e.target.checked })}
          style={{ marginTop: '0.25rem' }}
        />
        <span>
          Concordo que meus dados sejam usados para responder a este contato, conforme a{' '}
          <Link to="/privacidade">política de privacidade</Link> e a LGPD.
        </span>
      </label>
      {erros.aceite && <span className="au-erro">{erros.aceite}</span>}

      <button type="submit" className="au-btn au-btn--verde" style={{ width: '100%' }}>
        Enviar e abrir o WhatsApp
      </button>

      {enviado && (
        <p className="au-ok" role="status">
          Mensagem montada e aberta no WhatsApp. Em um projeto contratado, o mesmo formulário enviaria por
          e-mail e registraria o atendimento internamente.
        </p>
      )}
    </form>
  )
}
