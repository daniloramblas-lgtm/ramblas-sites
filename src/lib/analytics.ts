/**
 * Analytics opcional. Só carrega se VITE_GA_ID estiver definido no ambiente
 * (arquivo .env ou variável no Netlify) e o visitante aceitar a medição.
 * Sem essas duas condições, nada é carregado e nenhum cookie é criado.
 *
 * Os eventos NUNCA levam nome, telefone, endereço ou mensagem — apenas
 * rótulos técnicos como o modelo aberto ou o segmento escolhido.
 */
const ID = import.meta.env.VITE_GA_ID as string | undefined
const CHAVE_CONSENTIMENTO = 'ramblas-analytics-consentimento-v1'
export const EVENTO_ABRIR_PREFERENCIAS = 'ramblas:abrir-preferencias-analytics'

type Consentimento = 'aceito' | 'recusado'
type Janela = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}

let iniciado = false

export function analyticsConfigurado() {
  return Boolean(ID)
}

export function lerConsentimentoAnalytics(): Consentimento | null {
  if (typeof window === 'undefined') return null
  const valor = window.localStorage.getItem(CHAVE_CONSENTIMENTO)
  return valor === 'aceito' || valor === 'recusado' ? valor : null
}

export function iniciarAnalytics() {
  if (iniciado || !ID || typeof document === 'undefined' || lerConsentimentoAnalytics() !== 'aceito') return
  iniciado = true
  const w = window as Janela
  Reflect.set(w, `ga-disable-${ID}`, false)
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`
  script.dataset.ramblasAnalytics = 'true'
  document.head.appendChild(script)
  w.dataLayer = w.dataLayer || []
  w.gtag = function gtag(...args: unknown[]) {
    w.dataLayer!.push(args)
  }
  w.gtag('js', new Date())
  w.gtag('config', ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })
}

export function definirConsentimentoAnalytics(valor: Consentimento) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CHAVE_CONSENTIMENTO, valor)

  if (valor === 'aceito') {
    if (ID) {
      const w = window as Janela
      Reflect.set(w, `ga-disable-${ID}`, false)
      w.gtag?.('consent', 'update', { analytics_storage: 'granted' })
    }
    iniciarAnalytics()
    return
  }

  if (ID) {
    const w = window as Janela
    Reflect.set(w, `ga-disable-${ID}`, true)
    w.gtag?.('consent', 'update', { analytics_storage: 'denied' })
  }
}

export function abrirPreferenciasAnalytics() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(EVENTO_ABRIR_PREFERENCIAS))
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
  if (!ID || typeof window === 'undefined' || lerConsentimentoAnalytics() !== 'aceito') return
  const w = window as Janela
  w.gtag?.('event', nome, dados)
}
