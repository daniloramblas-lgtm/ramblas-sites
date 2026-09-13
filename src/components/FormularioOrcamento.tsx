import { useState } from 'react'
import { Link } from 'react-router-dom'
import { avisoPrivacidadeCurto, segmentosFormulario } from '../config/site.config'
import { mascaraTelefone, telefoneValido } from '../lib/format'
import { linkWhatsApp, montarMensagem } from '../lib/whatsapp'
import { evento } from '../lib/analytics'

export type DadosOrcamento = {
  nome: string
  whatsapp: string
  segmento: string
  necessidade: string
  /** Preenchido automaticamente quando o formulário abre a partir de um modelo. */
  modelo?: string
}

const inicial: DadosOrcamento = { nome: '', whatsapp: '', segmento: '', necessidade: '' }

export function textoOrcamento(d: DadosOrcamento): string {
  return montarMensagem(
    'Pedido de orçamento pelo site da Ramblas Sites',
    [
      ['Nome', d.nome],
      ['WhatsApp', d.whatsapp],
      ['Segmento', d.segmento],
      ['Modelo de interesse', d.modelo],
      ['O que precisa', d.necessidade],
    ],
    'Enviado pelo formulário do site.',
  )
}

export function validar(d: DadosOrcamento): Partial<Record<keyof DadosOrcamento, string>> {
  const erros: Partial<Record<keyof DadosOrcamento, string>> = {}
  if (d.nome.trim().length < 2) erros.nome = 'Escreva seu nome para sabermos com quem falamos.'
  if (!telefoneValido(d.whatsapp)) erros.whatsapp = 'Informe um WhatsApp com DDD, como (11) 90000-0000.'
  if (!d.segmento) erros.segmento = 'Escolha o segmento do seu negócio.'
  return erros
}

export default function FormularioOrcamento({ modeloInicial = '' }: { modeloInicial?: string }) {
  const [dados, setDados] = useState<DadosOrcamento>({ ...inicial, modelo: modeloInicial })
  const [erros, setErros] = useState<Partial<Record<keyof DadosOrcamento, string>>>({})
  const [enviado, setEnviado] = useState(false)

  function alterar<C extends keyof DadosOrcamento>(campo: C, valor: DadosOrcamento[C]) {
    setDados((d) => ({ ...d, [campo]: valor }))
    setErros((e) => ({ ...e, [campo]: undefined }))
    setEnviado(false)
  }

  /**
   * Abre o WhatsApp de forma síncrona, ainda dentro do clique do usuário:
   * qualquer espera (setTimeout) faz o navegador do celular tratar a aba
   * nova como popup e bloquear.
   */
  function enviar(e: React.FormEvent) {
    e.preventDefault()
    const achados = validar(dados)
    setErros(achados)
    if (Object.keys(achados).length > 0) {
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }
    window.open(linkWhatsApp(textoOrcamento(dados)), '_blank', 'noopener,noreferrer')
    evento('quote_submit', { segmento: dados.segmento, modelo: dados.modelo || 'nenhum' })
    setEnviado(true)
  }

  return (
    <form onSubmit={enviar} noValidate>
      <div className="form-grade">
        <div className="campo">
          <label htmlFor="of-nome">Nome</label>
          <input
            id="of-nome"
            name="nome"
            autoComplete="name"
            value={dados.nome}
            aria-invalid={!!erros.nome}
            aria-describedby={erros.nome ? 'erro-nome' : undefined}
            onChange={(e) => alterar('nome', e.target.value)}
          />
          {erros.nome && (
            <span className="campo__erro" id="erro-nome">
              {erros.nome}
            </span>
          )}
        </div>

        <div className="campo">
          <label htmlFor="of-whatsapp">WhatsApp</label>
          <input
            id="of-whatsapp"
            name="whatsapp"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 90000-0000"
            value={dados.whatsapp}
            aria-invalid={!!erros.whatsapp}
            aria-describedby={erros.whatsapp ? 'erro-whatsapp' : undefined}
            onChange={(e) => alterar('whatsapp', mascaraTelefone(e.target.value))}
          />
          {erros.whatsapp && (
            <span className="campo__erro" id="erro-whatsapp">
              {erros.whatsapp}
            </span>
          )}
        </div>

        <div className="campo campo--largo">
          <label htmlFor="of-segmento">Segmento</label>
          <select
            id="of-segmento"
            name="segmento"
            value={dados.segmento}
            aria-invalid={!!erros.segmento}
            aria-describedby={erros.segmento ? 'erro-segmento' : undefined}
            onChange={(e) => alterar('segmento', e.target.value)}
          >
            <option value="">Selecione</option>
            {segmentosFormulario.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {erros.segmento && (
            <span className="campo__erro" id="erro-segmento">
              {erros.segmento}
            </span>
          )}
        </div>

        <div className="campo campo--largo">
          <label htmlFor="of-necessidade">O que o site precisa resolver</label>
          <textarea
            id="of-necessidade"
            name="necessidade"
            placeholder="Ex.: receber pedidos sem ficar respondendo cardápio por mensagem."
            value={dados.necessidade}
            onChange={(e) => alterar('necessidade', e.target.value)}
          />
        </div>

        {dados.modelo && (
          <p className="campo--largo" style={{ margin: 0, fontSize: '0.9rem', color: 'var(--grafite-2)' }}>
            Modelo de interesse: <strong>{dados.modelo}</strong>
          </p>
        )}

        <div className="campo campo--largo">
          <button className="btn btn--primario" type="submit">
            Enviar pelo WhatsApp
          </button>
          <p style={{ fontSize: '0.84rem', color: 'var(--grafite-2)', margin: '0.7rem 0 0' }}>
            {avisoPrivacidadeCurto} Consulte a <Link to="/privacidade">Política de Privacidade</Link>.
          </p>
        </div>

        {Object.keys(erros).length > 0 && (
          <p className="mensagem-erro campo--largo" role="alert">
            Faltou preencher alguns campos. Corrija os itens destacados e envie de novo.
          </p>
        )}

        {enviado && (
          <div className="mensagem-sucesso campo--largo" role="status">
            Mensagem montada e aberta no WhatsApp. Se o aparelho não abriu automaticamente,{' '}
            <a href={linkWhatsApp(textoOrcamento(dados))} target="_blank" rel="noopener noreferrer">
              toque aqui
            </a>
            .
          </div>
        )}
      </div>
    </form>
  )
}
