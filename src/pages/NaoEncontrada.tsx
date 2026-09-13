import { Link } from 'react-router-dom'
import { useSeo } from '../lib/seo'
import { meta404 } from '../data/rotas'

export default function NaoEncontrada() {
  useSeo(meta404)

  return (
    <section className="container erro-404">
      <h1>Esta página não existe</h1>
      <p>O endereço pode ter mudado ou o link estar incompleto.</p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link className="btn btn--primario" to="/">
          Voltar ao início
        </Link>
        <Link className="btn btn--contorno" to="/modelos">
          Ver os modelos
        </Link>
      </div>
    </section>
  )
}
