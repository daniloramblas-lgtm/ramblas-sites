import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { categorias, modelos, type Categoria } from '../data/modelos'
import { EstadoVazio } from './Comuns'
import { evento } from '../lib/analytics'
import { conjunto } from '../lib/imagens'

/**
 * Galeria dos modelos. Os cards ficaram enxutos: imagem em mockup,
 * nome, segmento, resumo curto e dois botões. A lista completa de
 * funcionalidades vive na página de cada modelo.
 */
export default function GaleriaModelos({ limite }: { limite?: number }) {
  const [filtro, setFiltro] = useState<Categoria | 'todos'>('todos')

  const lista = useMemo(() => {
    const base = filtro === 'todos' ? modelos : modelos.filter((m) => m.categoria === filtro)
    return limite ? base.slice(0, limite) : base
  }, [filtro, limite])

  return (
    <>
      <div className="filtros" role="group" aria-label="Filtrar modelos por segmento">
        {categorias.map((c) => (
          <button
            key={c.id}
            type="button"
            className="filtro"
            aria-pressed={filtro === c.id}
            aria-controls="lista-modelos"
            onClick={() => setFiltro(c.id)}
          >
            {c.rotulo}
          </button>
        ))}
      </div>

      {lista.length === 0 ? (
        <EstadoVazio
          titulo="Ainda não temos um modelo pronto para este segmento"
          texto="Podemos construir um do zero com a identidade da sua empresa. Conte o que você precisa e montamos a proposta."
          acao={
            <Link className="btn btn--primario" to="/#contato">
              Pedir um modelo novo
            </Link>
          }
        />
      ) : (
        <>
          {lista.length > 1 && (
            <p className="dica-arraste" aria-hidden="true">
              Deslize para conhecer todos <span>→</span>
            </p>
          )}
          <div
            className="grade-modelos com-perspectiva"
            id="lista-modelos"
            aria-live="polite"
            aria-label={`${lista.length} ${lista.length === 1 ? 'modelo encontrado' : 'modelos encontrados'}`}
          >
            {lista.map((m, i) => (
              <article className="card-modelo tem-relevo" key={m.slug}>
                <figure className="card-modelo__figura">
                  <div className="mockup">
                    <img
                      {...conjunto(m.capa, '(max-width: 760px) 92vw, 44vw')}
                      alt={m.alt}
                      width={1200}
                      height={800}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>
                  <span className="selo card-modelo__selo">Modelo demonstrativo</span>
                </figure>
                <div className="card-modelo__corpo">
                  <div className="card-modelo__topo">
                    <h3>{m.nome}</h3>
                    <span className="card-modelo__segmento">{m.segmento}</span>
                  </div>
                  <p>{m.resumoCurto}</p>
                  <div className="card-modelo__acoes">
                    <Link
                      className="btn btn--primario btn--pequeno"
                      to={m.rotaDemo}
                      onClick={() => evento('open_demo', { modelo: m.slug })}
                    >
                      Abrir site
                    </Link>
                    <Link
                      className="btn btn--contorno btn--pequeno"
                      to={`/modelos/${m.slug}`}
                      onClick={() => evento('view_model', { modelo: m.slug })}
                    >
                      Ver detalhes
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </>
  )
}
