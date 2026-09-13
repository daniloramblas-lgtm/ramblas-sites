import { useEffect, useRef } from 'react'
import { conjunto } from '../lib/imagens'

/**
 * Cena tridimensional do topo da home.
 * Construída só com CSS transforms — o movimento do cursor entra por
 * variáveis CSS (--mx / --my) e só no computador. Com
 * `prefers-reduced-motion` o parallax é desligado por completo.
 */
export default function Hero3D() {
  const cena = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cena.current
    if (!el) return
    const finoEGrande = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 900px)')
    const movimentoOk = window.matchMedia('(prefers-reduced-motion: no-preference)')
    if (!finoEGrande.matches || !movimentoOk.matches) return

    let pendente = 0
    function aoMover(e: PointerEvent) {
      if (pendente) return
      pendente = requestAnimationFrame(() => {
        pendente = 0
        const r = el!.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        el!.style.setProperty('--mx', String(Math.max(-1, Math.min(1, x * 2))))
        el!.style.setProperty('--my', String(Math.max(-1, Math.min(1, y * 2))))
      })
    }
    function aoSair() {
      el!.style.setProperty('--mx', '0')
      el!.style.setProperty('--my', '0')
    }

    window.addEventListener('pointermove', aoMover, { passive: true })
    el.addEventListener('pointerleave', aoSair)
    return () => {
      window.removeEventListener('pointermove', aoMover)
      el.removeEventListener('pointerleave', aoSair)
      if (pendente) cancelAnimationFrame(pendente)
    }
  }, [])

  return (
    <div className="cena3d" ref={cena}>
      <div className="cena3d__palco">
        <span className="volume volume--oliva" aria-hidden="true" />
        <span className="volume volume--terracota" aria-hidden="true" />
        <span className="volume volume--bronze" aria-hidden="true" />

        <div className="tablet" data-entrada="1">
          <img
            {...conjunto('/img/capa-aurea.webp', '34vw')}
            alt="Modelo de site institucional para escritórios apresentado em um tablet"
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="notebook" data-entrada="2">
          <div className="notebook__tela reflexo">
            <img
              {...conjunto('/img/capa-forno27.webp', '(max-width: 900px) 78vw, 500px')}
              alt="Modelo de cardápio digital de pizzaria apresentado em um notebook"
              width={1200}
              height={800}
              decoding="async"
              {...({ fetchpriority: 'high' } as Record<string, string>)}
            />
          </div>
          <div className="notebook__base" aria-hidden="true" />
        </div>

        <div className="celular" data-entrada="3">
          <img
            {...conjunto('/img/capa-distrito13.webp', '27vw')}
            alt="Modelo de agendamento de barbearia apresentado em um celular"
            width={600}
            height={1100}
            loading="lazy"
            decoding="async"
          />
        </div>

        <span className="cartao-flutuante cartao-flutuante--cardapio" data-entrada="3" style={{ ['--cor' as string]: '#a04a2f' }}>
          <i aria-hidden="true" /> Cardápio digital
        </span>
        <span className="cartao-flutuante cartao-flutuante--agenda" data-entrada="4" style={{ ['--cor' as string]: '#96784c' }}>
          <i aria-hidden="true" /> Agenda online
        </span>
        <span className="cartao-flutuante cartao-flutuante--catalogo" data-entrada="4" style={{ ['--cor' as string]: '#1b3b6f' }}>
          <i aria-hidden="true" /> Catálogo com filtros
        </span>
        <span className="cartao-flutuante cartao-flutuante--whats" data-entrada="5" style={{ ['--cor' as string]: '#1f7a4d' }}>
          <i aria-hidden="true" /> Pedido no WhatsApp
        </span>
      </div>
    </div>
  )
}
