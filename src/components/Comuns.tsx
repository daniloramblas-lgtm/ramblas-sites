import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { linkWhatsApp } from '../lib/whatsapp'
import { evento } from '../lib/analytics'

/** Botão flutuante presente em todas as páginas. */
export function BotaoWhatsApp({
  mensagem,
  rotulo = 'WhatsApp',
  origem = 'flutuante',
}: {
  mensagem?: string
  rotulo?: string
  origem?: string
}) {
  return (
    <a
      className="whats-flutuante"
      href={linkWhatsApp(mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir conversa no WhatsApp"
      onClick={() => evento('whatsapp_click', { origem })}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.25-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.26.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.63 4.18 3.69.58.25 1.04.4 1.4.51.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
      </svg>
      <span>{rotulo}</span>
    </a>
  )
}

/** Sobe a página a cada troca de rota e leva até a âncora quando houver hash. */
export function RolarAoNavegar() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const alvo = document.querySelector(hash)
      if (alvo) {
        alvo.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}

export function EstadoVazio({ titulo, texto, acao }: { titulo: string; texto: string; acao?: React.ReactNode }) {
  return (
    <div className="vazio">
      <h3>{titulo}</h3>
      <p>{texto}</p>
      {acao}
    </div>
  )
}

/** Botão "Ver todos / Ver menos" usado na divulgação progressiva. */
export function BotaoVerMais({
  aberto,
  onClick,
  rotuloAbrir,
  rotuloFechar = 'Ver menos',
  controla,
}: {
  aberto: boolean
  onClick: () => void
  rotuloAbrir: string
  rotuloFechar?: string
  controla: string
}) {
  return (
    <button type="button" className="btn btn--contorno btn--pequeno" aria-expanded={aberto} aria-controls={controla} onClick={onClick}>
      {aberto ? rotuloFechar : rotuloAbrir}
    </button>
  )
}
