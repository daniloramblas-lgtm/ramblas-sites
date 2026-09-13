import { useEffect, useId, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { demos, demoPorId, type DemoInfo } from '../data/demos'
import { evento } from '../lib/analytics'

/* ------------------------------------------------------------------ seletor */

function PainelSeletor({
  atual,
  onFechar,
  aoTrocar,
}: {
  atual: DemoInfo
  onFechar: () => void
  aoTrocar: (d: DemoInfo) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onFechar()
      }
    }
    const aoClicar = (e: MouseEvent) => {
      const alvo = e.target
      const clicouNoSeletor = alvo instanceof Element && Boolean(alvo.closest('.seletor'))
      if (ref.current && !ref.current.contains(alvo as Node) && !clicouNoSeletor) onFechar()
    }
    document.addEventListener('keydown', aoTeclar)
    document.addEventListener('mousedown', aoClicar)
    return () => {
      document.removeEventListener('keydown', aoTeclar)
      document.removeEventListener('mousedown', aoClicar)
    }
  }, [onFechar])

  return (
    <div className="seletor__painel" ref={ref} role="menu" aria-label="Escolher demonstração">
      <p className="seletor__titulo">Trocar de modelo</p>
      <ul>
        {demos.map((d) => (
          <li key={d.id}>
            <Link
              to={d.rota}
              role="menuitem"
              className="seletor__item"
              aria-current={d.id === atual.id ? 'page' : undefined}
              onClick={() => aoTrocar(d)}
            >
              <img src={d.miniatura} alt="" width={1200} height={800} loading="lazy" />
              <span>
                <strong>{d.nome}</strong>
                <small>{d.curto}</small>
              </span>
              {d.id === atual.id && <em>aberto</em>}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/modelos" role="menuitem" className="seletor__vitrine" onClick={onFechar}>
        Ver os quatro modelos na vitrine
      </Link>
    </div>
  )
}

/**
 * Barra compacta no topo de toda demonstração: aviso de conteúdo fictício,
 * seletor entre os quatro modelos e volta para a vitrine.
 */
export function BarraDemo({ id }: { id: DemoInfo['id'] }) {
  const atual = demoPorId(id)!
  const [aberto, setAberto] = useState(false)
  const botao = useRef<HTMLButtonElement>(null)
  const idPainel = useId()
  const navegar = useNavigate()

  function trocar(d: DemoInfo) {
    setAberto(false)
    if (d.id !== atual.id) {
      evento('switch_demo', { de: atual.id, para: d.id })
      navegar(d.rota)
    }
  }

  return (
    <div className="barra-demo vidro">
      <div className="container barra-demo__interno">
        <span className="barra-demo__aviso">
          <span className="barra-demo__ponto" aria-hidden="true" />
          <span className="so-desktop">Demonstração fictícia</span>
          <span className="so-mobile">Demonstração</span>
        </span>

        <div className="seletor">
          <button
            type="button"
            ref={botao}
            className="seletor__botao"
            aria-expanded={aberto}
            aria-haspopup="menu"
            aria-controls={idPainel}
            onClick={() => setAberto((v) => !v)}
          >
            <span className="so-desktop">{atual.nome}</span>
            <span className="so-mobile">Modelos</span>
            <svg viewBox="0 0 20 20" aria-hidden="true" className="seletor__seta">
              <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          {aberto && (
            <div id={idPainel}>
              <PainelSeletor
                atual={atual}
                aoTrocar={trocar}
                onFechar={() => {
                  setAberto(false)
                  botao.current?.focus()
                }}
              />
            </div>
          )}
        </div>

        <Link className="barra-demo__voltar" to={`/modelos/${id}`}>
          <span className="so-desktop">Voltar à Ramblas Sites</span>
          <span className="so-mobile">Voltar</span>
        </Link>
      </div>
    </div>
  )
}

/* -------------------------------------------------------- menu de seções */

export type Secao = { href: string; rotulo: string }

/**
 * Navegação das seções da demonstração: linha horizontal no computador,
 * menu recolhido no celular (que antes simplesmente sumia).
 */
export function MenuSecoes({ secoes, rotulo }: { secoes: Secao[]; rotulo: string }) {
  const [aberto, setAberto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const idLista = useId()

  useEffect(() => {
    if (!aberto) return
    const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false)
    const aoClicar = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAberto(false)
    }
    document.addEventListener('keydown', aoTeclar)
    document.addEventListener('mousedown', aoClicar)
    return () => {
      document.removeEventListener('keydown', aoTeclar)
      document.removeEventListener('mousedown', aoClicar)
    }
  }, [aberto])

  return (
    <div className="menu-secoes" ref={ref}>
      <nav className="menu-secoes__linha" aria-label={rotulo}>
        {secoes.map((s) => (
          <Link key={s.href} to={s.href}>
            {s.rotulo}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className="menu-secoes__botao"
        aria-expanded={aberto}
        aria-controls={idLista}
        onClick={() => setAberto((v) => !v)}
      >
        Seções
        <svg viewBox="0 0 20 20" aria-hidden="true" className="seletor__seta">
          <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {aberto && (
        <nav className="menu-secoes__painel vidro" id={idLista} aria-label={`${rotulo} (celular)`}>
          {secoes.map((s) => (
            <Link key={s.href} to={s.href} onClick={() => setAberto(false)}>
              {s.rotulo}
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}

/** Link "pular para o conteúdo" usado também dentro das demonstrações. */
export function PularParaConteudo() {
  return (
    <a className="pular-para-conteudo" href="#conteudo">
      Pular para o conteúdo
    </a>
  )
}
