/**
 * Analytics opcional. Só carrega se VITE_GA_ID estiver definido no ambiente
 * (arquivo .env ou variável no Netlify). Sem a variável, nada é carregado
 * e nenhum cookie é criado.
 *
 * Os eventos NUNCA levam nome, telefone, endereço ou mensagem — apenas
 * rótulos técnicos como o modelo aberto ou o segmento escolhido.
 */
const ID = import.meta.env.VITE_GA_ID as string | undefined

type Janela = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }

let iniciado = false

export function iniciarAnalytics() {
  if (iniciado || !ID || typeof document === 'undefined') return
  iniciado = true
  const w = window as Janela
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`
  document.head.appendChild(script)
  w.dataLayer = w.dataLayer || []
  w.gtag = function gtag(...args: unknown[]) {
    w.dataLayer!.push(args)
  }
  w.gtag('js', new Date())
  w.gtag('config', ID, { anonymize_ip: true })
}

export type EventoSite =
  | 'view_model'
  | 'open_demo'
  | 'switch_demo'
  | 'whatsapp_click'
  | 'quote_submit'
  | 'pizza_add_to_cart'
  | 'booking_complete'
  | 'vehicle_compare'
  | 'test_drive_submit'

/** Dispara um evento. Sem GA configurado, vira uma função vazia. */
export function evento(nome: EventoSite, dados: Record<string, string | number> = {}) {
  if (!ID || typeof window === 'undefined') return
  const w = window as Janela
  w.gtag?.('event', nome, dados)
}
