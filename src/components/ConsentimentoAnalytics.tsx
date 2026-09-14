import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  analyticsConfigurado,
  definirConsentimentoAnalytics,
  EVENTO_ABRIR_PREFERENCIAS,
  iniciarAnalytics,
  lerConsentimentoAnalytics,
} from '../lib/analytics'

export default function ConsentimentoAnalytics() {
  const [aberto, setAberto] = useState(() => analyticsConfigurado() && lerConsentimentoAnalytics() === null)

  useEffect(() => {
    if (!analyticsConfigurado()) return
    if (lerConsentimentoAnalytics() === 'aceito') iniciarAnalytics()

    const abrir = () => setAberto(true)
    window.addEventListener(EVENTO_ABRIR_PREFERENCIAS, abrir)
    return () => window.removeEventListener(EVENTO_ABRIR_PREFERENCIAS, abrir)
  }, [])

  if (!analyticsConfigurado() || !aberto) return null

  const escolher = (valor: 'aceito' | 'recusado') => {
    definirConsentimentoAnalytics(valor)
    setAberto(false)
  }

  return (
    <aside className="consentimento-analytics" role="dialog" aria-label="Preferências de métricas" aria-live="polite">
      <div>
        <strong>Métricas de navegação</strong>
        <p>
          Usamos o Google Analytics somente com sua autorização para entender visitas e melhorar o site. Não
          enviamos os dados preenchidos nos formulários. <Link to="/privacidade">Saiba mais</Link>.
        </p>
      </div>
      <div className="consentimento-analytics__acoes">
        <button className="btn btn--contorno" type="button" onClick={() => escolher('recusado')}>
          Recusar
        </button>
        <button className="btn btn--primario" type="button" onClick={() => escolher('aceito')}>
          Aceitar métricas
        </button>
      </div>
    </aside>
  )
}
