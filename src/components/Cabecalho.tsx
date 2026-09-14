import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { contato, navegacao } from '../config/site.config'
import { linkWhatsApp } from '../lib/whatsapp'

export default function Cabecalho() {
  const [aberto, setAberto] = useState(false)
  const [rolado, setRolado] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => setAberto(false), [pathname, hash])

  useEffect(() => {
    const aoRolar = () => setRolado(window.scrollY > 12)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false)
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [])

  return (
    <header className="cabecalho" data-rolado={rolado}>
      <div className="container cabecalho__interno">
        <Link to="/" className="logo" aria-label={`${contato.marca} — página inicial`}>
          Ramblas <span>Sites</span>
        </Link>

        <nav className="menu" aria-label="Principal">
          {navegacao.map((item) => (
            <Link key={item.href} to={item.href}>
              {item.rotulo}
            </Link>
          ))}
        </nav>

        <div className="cabecalho__acoes">
          <a className="btn btn--primario btn--pequeno" href={linkWhatsApp()} target="_blank" rel="noopener">
            Falar sobre um projeto
          </a>
          <button
            type="button"
            className="menu-botao"
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setAberto((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {aberto && (
        <div className="menu-mobile" id="menu-mobile">
          <div className="container">
            <nav aria-label="Menu mobile">
              <ul>
                {navegacao.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href}>{item.rotulo}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <a className="btn btn--primario" href={linkWhatsApp()} target="_blank" rel="noopener">
              Falar sobre um projeto
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
