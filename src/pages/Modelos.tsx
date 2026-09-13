import GaleriaModelos from '../components/GaleriaModelos'
import { useReveal } from '../lib/useReveal'
import { useSeo } from '../lib/seo'
import { metaModelos } from '../data/rotas'

export default function Modelos() {
  useReveal()
  useSeo(metaModelos)

  return (
    <section style={{ paddingTop: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
      <div className="container">
        <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', margin: '0 0 0.5rem' }}>Modelos demonstrativos</h1>
        <p style={{ color: 'var(--grafite-2)', margin: '0 0 1.25rem', maxWidth: '58ch' }}>
          Quatro estudos de caso conceituais, com recursos interativos funcionando na própria demonstração.
          As empresas são fictícias.
        </p>
        <h2 className="so-leitor">Lista de modelos por segmento</h2>
        <GaleriaModelos />
      </div>
    </section>
  )
}
