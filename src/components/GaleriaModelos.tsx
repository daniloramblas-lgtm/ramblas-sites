import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { categorias, modelos, type Categoria } from '../data/modelos'
import { EstadoVazio } from './Comuns'

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
        <div className="grade-modelos">
          {lista.map((m) => (
            <article className="card-modelo" key={m.slug} data-reveal>
              <figure className="card-modelo__figura">
                <img src={m.capa} alt={m.alt} loading="lazy" width={1200} height={800} />
                <span className="selo card-modelo__selo">Modelo demonstrativo</span>
              </figure>
              <div className="card-modelo__corpo">
                <div className="card-modelo__topo">
                  <h3>{m.nome}</h3>
                  <span className="card-modelo__segmento">{m.segmento}</span>
                </div>
                <p>{m.resumo}</p>
                <ul className="lista-funcoes">
                  {m.funcionalidades.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="card-modelo__acoes">
                  <Link className="btn btn--primario btn--pequeno" to={m.rotaDemo}>
                    Explorar demonstração
                  </Link>
                  <Link className="btn btn--contorno btn--pequeno" to={`/modelos/${m.slug}`}>
                    Sobre o modelo
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
