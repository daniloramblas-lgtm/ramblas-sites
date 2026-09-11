import { useState } from 'react'
import { funcionalidadesDesejadas, segmentosFormulario } from '../config/site.config'
import { modelos } from '../data/modelos'
import { mascaraTelefone, telefoneValido } from '../lib/format'
import { linkWhatsApp, montarMensagem } from '../lib/whatsapp'

type Dados = {
  nome: string
  empresa: string
  segmento: string
  whatsapp: string
  modelo: string
  funcionalidades: string[]
  mensagem: string
}

const inicial: Dados = {
  nome: '',
  empresa: '',
  segmento: '',
  whatsapp: '',
  modelo: '',
  funcionalidades: [],
  mensagem: '',
}

export function textoOrcamento(d: Dados): string {
  return montarMensagem(
    'Pedido de orçamento pelo site da Ramblas Sites',
    [
      ['Nome', d.nome],
      ['Empresa', d.empresa],
      ['Segmento', d.segmento],
      ['WhatsApp', d.whatsapp],
      ['Modelo de interesse', d.modelo],
      ['Funcionalidades', d.funcionalidades.join(', ')],
      ['Mensagem', d.mensagem],
    ],
    'Enviado pelo formulário do site.',
  )
}

export function validar(d: Dados): Partial<Record<keyof Dados, string>> {
  const erros: Partial<Record<keyof Dados, string>> = {}
  if (d.nome.trim().length < 2) erros.nome = 'Escreva seu nome para sabermos com quem falamos.'
  if (!telefoneValido(d.whatsapp)) erros.whatsapp = 'Informe um WhatsApp com DDD, como (11) 90000-0000.'
  if (!d.segmento) erros.segmento = 'Escolha o segmento do seu negócio.'
  return erros
}

export default function FormularioOrcamento({ modeloInicial = '' }: { modeloInicial?: string }) {
  const [dados, setDados] = useState<Dados>({ ...inicial, modelo: modeloInicial })
  const [erros, setErros] = useState<Partial<Record<keyof Dados, string>>>({})
  const [estado, setEstado] = useState<'parado' | 'enviando' | 'pronto'>('parado')

  function alterar<C extends keyof Dados>(campo: C, valor: Dados[C]) {
    setDados((d) => ({ ...d, [campo]: valor }))
    setErros((e) => ({ ...e, [campo]: undefined }))
    setEstado('parado')
  }

  function alternarFuncionalidade(f: string) {
    setDados((d) => ({
      ...d,
      funcionalidades: d.funcionalidades.includes(f)
        ? d.funcionalidades.filter((x) => x !== f)
        : [...d.funcionalidades, f],
    }))
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    const achados = validar(dados)
    setErros(achados)
    if (Object.keys(achados).length > 0) {
      const primeiro = document.querySelector<HTMLElement>('[aria-invalid="true"]')
      primeiro?.focus()
      return
    }
    setEstado('enviando')
    // Pequena espera só para dar retorno visual antes de abrir o WhatsApp.
    window.setTimeout(() => {
      window.open(linkWhatsApp(textoOrcamento(dados)), '_blank', 'noopener')
      setEstado('pronto')
    }, 450)
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
          <label htmlFor="of-empresa">Empresa</label>
          <input
            id="of-empresa"
            name="empresa"
            autoComplete="organization"
            value={dados.empresa}
            onChange={(e) => alterar('empresa', e.target.value)}
          />
        </div>

        <div className="campo">
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
          <label htmlFor="of-modelo">Modelo de interesse</label>
          <select
            id="of-modelo"
            name="modelo"
            value={dados.modelo}
            onChange={(e) => alterar('modelo', e.target.value)}
          >
            <option value="">Ainda não sei</option>
            {modelos.map((m) => (
              <option key={m.slug} value={m.nome}>
                {m.nome} — {m.segmento}
              </option>
            ))}
            <option value="Projeto do zero">Projeto do zero</option>
          </select>
        </div>

        <fieldset className="campo campo--largo" style={{ border: 0, margin: 0, padding: 0 }}>
          <legend style={{ fontSize: '0.92rem', fontWeight: 600, padding: 0, marginBottom: '0.5rem' }}>
            Funcionalidades desejadas
          </legend>
          <div className="opcoes">
            {funcionalidadesDesejadas.map((f) => (
              <label className="opcao" key={f}>
                <input
                  type="checkbox"
                  name="funcionalidades"
                  value={f}
                  checked={dados.funcionalidades.includes(f)}
                  onChange={() => alternarFuncionalidade(f)}
                />
                {f}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="campo campo--largo">
          <label htmlFor="of-mensagem">Mensagem</label>
          <textarea
            id="of-mensagem"
            name="mensagem"
            placeholder="Conte o que o site precisa resolver no seu dia a dia."
            value={dados.mensagem}
            onChange={(e) => alterar('mensagem', e.target.value)}
          />
        </div>

        <div className="campo campo--largo">
          <button className="btn btn--primario" type="submit" disabled={estado === 'enviando'}>
            {estado === 'enviando' ? (
              <>
                <span className="carregando" aria-hidden="true" /> Montando sua mensagem…
              </>
            ) : (
              'Enviar pelo WhatsApp'
            )}
          </button>
        </div>

        {Object.keys(erros).length > 0 && (
          <p className="mensagem-erro campo--largo" role="alert">
            Faltou preencher alguns campos. Corrija os itens destacados e envie de novo.
          </p>
        )}

        {estado === 'pronto' && (
          <div className="mensagem-sucesso campo--largo" role="status">
            Mensagem montada. A conversa do WhatsApp abriu em outra aba — se o navegador bloqueou,{' '}
            <a href={linkWhatsApp(textoOrcamento(dados))} target="_blank" rel="noopener">
              abra por aqui
            </a>
            .
          </div>
        )}
      </div>
    </form>
  )
}
