import GaleriaModelos from '../components/GaleriaModelos'
import { useReveal } from '../lib/useReveal'
import { useSeo } from '../lib/seo'
import { avisoDemonstrativo } from '../config/site.config'

export default function Modelos() {
  useReveal()
  useSeo({
    titulo: 'Modelos demonstrativos — Ramblas Sites',
    descricao:
      'Explore modelos de site para pizzaria, barbearia, escritórios e concessionária. Empresas fictícias criadas para apresentar possibilidades.',
    caminho: '/modelos',
  })

  return (
    <section>
      <div className="container">
        <div className="secao-cabecalho" data-reveal>
          <h2>Modelos demonstrativos</h2>
          <p>
            Quatro pontos de partida, com funcionalidades que já rodam no navegador. Use os filtros para ver
            o segmento mais próximo do seu negócio.
          </p>
        </div>
        <p className="nota-demo" style={{ marginBottom: '2rem' }}>
          {avisoDemonstrativo} Nenhuma das marcas apresentadas é cliente, e os números, avaliações e preços
          são ilustrativos.
        </p>
        <GaleriaModelos />
      </div>
    </section>
  )
}
