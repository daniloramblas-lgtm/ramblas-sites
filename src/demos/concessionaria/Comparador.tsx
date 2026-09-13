import { Link, useSearchParams } from 'react-router-dom'
import './concessionaria.css'
import { porSlug, rotuloStatus } from './catalogo'
import { CabecalhoLN, RodapeLN } from './LayoutLN'
import { BarraDemo, PularParaConteudo } from '../../components/DemoShell'
import { metaDemoPorCaminho } from '../../data/rotas'
import { brl } from '../../lib/format'
import { useSeo } from '../../lib/seo'

export default function Comparador() {
  const [params] = useSearchParams()
  const slugs = (params.get('v') ?? '').split(',').filter(Boolean).slice(0, 3)
  const lista = slugs.map(porSlug).filter((v): v is NonNullable<typeof v> => Boolean(v))

  useSeo(metaDemoPorCaminho('/demonstracao/linha-norte/comparar')!)

  const linhas: [string, (v: (typeof lista)[number]) => string][] = [
    ['Preço', (v) => brl(v.preco)],
    ['Ano', (v) => String(v.ano)],
    ['Quilometragem', (v) => `${v.km.toLocaleString('pt-BR')} km`],
    ['Câmbio', (v) => v.cambio],
    ['Combustível', (v) => v.combustivel],
    ['Carroceria', (v) => v.carroceria],
    ['Cor', (v) => v.cor],
    ['Situação', (v) => rotuloStatus[v.status]],
    ['Equipamentos', (v) => v.equipamentos.join(' · ')],
  ]

  return (
    <div className="demo-concessionaria">
      <PularParaConteudo />
      <BarraDemo id="linha-norte" />
      <CabecalhoLN />

      <main id="conteudo">
      <section className="ln-secao">
        <div className="container">
          <p className="ln-migalhas">
            <Link to="/demonstracao/linha-norte">Início</Link> /{' '}
            <Link to="/demonstracao/linha-norte#estoque">Estoque</Link> / Comparação
          </p>

          <div className="ln-titulo">
            <h1 style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.2rem)', margin: 0 }}>Comparação de veículos</h1>
            <Link className="ln-btn ln-btn--contorno ln-btn--pequeno" to="/demonstracao/linha-norte#estoque">
              Escolher outros veículos
            </Link>
          </div>

          {lista.length < 2 ? (
            <div className="ln-vazio">
              <h2>Escolha ao menos dois veículos</h2>
              <p>No estoque, marque a opção “Comparar” nos cards que você quer avaliar lado a lado.</p>
              <Link className="ln-btn ln-btn--azul" to="/demonstracao/linha-norte#estoque">
                Ir para o estoque
              </Link>
            </div>
          ) : (
            <div className="ln-tabela-wrap">
              <table className="ln-tabela-comparacao">
                <caption className="ln-aviso" style={{ captionSide: 'bottom', textAlign: 'left', marginTop: '1rem' }}>
                  Dados ilustrativos de veículos fictícios, apenas para demonstrar o comparador.
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    {lista.map((v) => (
                      <th scope="col" key={v.slug}>
                        <img
                          src={v.fotos[0]}
                          alt={`${v.marca} ${v.modelo} ${v.versao}`}
                          style={{ width: '100%', maxWidth: 220, borderRadius: 10, marginBottom: '0.6rem' }}
                          width={1200}
                          height={800}
                        />
                        <br />
                        {v.marca} {v.modelo}
                        <br />
                        <small style={{ fontWeight: 400, color: 'var(--grafite-2)' }}>{v.versao}</small>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {linhas.map(([rotulo, valor]) => (
                    <tr key={rotulo}>
                      <th scope="row">{rotulo}</th>
                      {lista.map((v) => (
                        <td key={v.slug}>{valor(v)}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <th scope="row">Detalhes</th>
                    {lista.map((v) => (
                      <td key={v.slug}>
                        <Link className="ln-btn ln-btn--azul ln-btn--pequeno" to={`/demonstracao/linha-norte/veiculo/${v.slug}`}>
                          Ver veículo
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
      </main>

      <RodapeLN />
    </div>
  )
}
