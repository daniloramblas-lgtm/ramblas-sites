import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './concessionaria.css'
import { parcela, porSlug, rotuloStatus, totalFinanciado } from './catalogo'
import { CabecalhoLN, RodapeLN } from './LayoutLN'
import { BarraDemo, PularParaConteudo } from '../../components/DemoShell'
import { metaDemoPorCaminho, meta404 } from '../../data/rotas'
import { brl } from '../../lib/format'
import { linkWhatsApp, montarMensagem } from '../../lib/whatsapp'
import { useSeo } from '../../lib/seo'

export default function Veiculo() {
  const { slug } = useParams()
  const veiculo = porSlug(slug)
  const [foto, setFoto] = useState(0)
  const [entrada, setEntrada] = useState(() => Math.round((veiculo?.preco ?? 100000) * 0.3))
  const [meses, setMeses] = useState(48)

  useSeo(metaDemoPorCaminho(`/demonstracao/linha-norte/veiculo/${slug ?? ''}`) ?? meta404)

  if (!veiculo) {
    return (
      <div className="demo-concessionaria">
        <PularParaConteudo />
        <BarraDemo id="linha-norte" />
        <CabecalhoLN />
        <main id="conteudo">
        <section className="ln-secao">
          <div className="container">
            <h1>Veículo não encontrado</h1>
            <p>Este veículo pode ter saído do estoque demonstrativo.</p>
            <Link className="ln-btn ln-btn--azul" to="/demonstracao/linha-norte#estoque">
              Voltar ao estoque
            </Link>
          </div>
        </section>
        </main>
        <RodapeLN />
      </div>
    )
  }

  const valorParcela = parcela(veiculo.preco, entrada, meses)
  const mensagem = montarMensagem(
    'Interesse em veículo — Linha Norte Motors (demonstração)',
    [
      ['Veículo', `${veiculo.marca} ${veiculo.modelo} ${veiculo.versao}`],
      ['Ano', veiculo.ano],
      ['Preço anunciado', brl(veiculo.preco)],
      ['Simulação', `entrada ${brl(entrada)} + ${meses}x de ${brl(valorParcela)}`],
    ],
    'Simulação ilustrativa gerada por um site demonstrativo da Ramblas Sites.',
  )

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
            <Link to="/demonstracao/linha-norte#estoque">Estoque</Link> / {veiculo.modelo} {veiculo.versao}
          </p>

          <div className="ln-veiculo">
            <div>
              <img
                className="ln-galeria__principal"
                src={veiculo.fotos[foto]}
                alt={`${veiculo.marca} ${veiculo.modelo} ${veiculo.versao}, foto ${foto + 1} de ${veiculo.fotos.length}`}
                width={1200}
                height={800}
              />
              <div className="ln-galeria__miniaturas" role="group" aria-label="Fotos do veículo">
                {veiculo.fotos.map((f, i) => (
                  <button key={f} type="button" aria-pressed={foto === i} onClick={() => setFoto(i)} aria-label={`Ver foto ${i + 1}`}>
                    <img src={f} alt="" loading="lazy" width={1200} height={800} />
                  </button>
                ))}
              </div>

              <h2 style={{ marginTop: '2rem' }}>Equipamentos</h2>
              <ul className="ln-equipamentos">
                {veiculo.equipamentos.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>

              <div className="ln-simulador">
                <h3 style={{ marginTop: 0 }}>Simulação de financiamento</h3>
                <div className="ln-campo">
                  <label htmlFor="sim-entrada">Entrada</label>
                  <input
                    id="sim-entrada"
                    type="range"
                    min={0}
                    max={veiculo.preco}
                    step={1000}
                    value={entrada}
                    onChange={(e) => setEntrada(Number(e.target.value))}
                  />
                  <output htmlFor="sim-entrada">{brl(entrada)}</output>
                </div>
                <div className="ln-campo">
                  <label htmlFor="sim-meses">Parcelas</label>
                  <select id="sim-meses" value={meses} onChange={(e) => setMeses(Number(e.target.value))}>
                    {[12, 24, 36, 48, 60].map((m) => (
                      <option key={m} value={m}>
                        {m}x
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ln-simulador__resultado">
                  <span>
                    {meses}x de
                    <br />
                    <small>total estimado {brl(totalFinanciado(veiculo.preco, entrada, meses))}</small>
                  </span>
                  <strong>{brl(valorParcela)}</strong>
                </div>
                <p className="ln-aviso">
                  Cálculo ilustrativo a 1,49% ao mês, sem consulta a instituição financeira, sem análise de
                  crédito e sem tarifas. Não constitui oferta de crédito.
                </p>
              </div>
            </div>

            <aside className="ln-ficha">
              <h1 style={{ fontSize: '1.6rem', marginTop: 0 }}>
                {veiculo.marca} {veiculo.modelo}
              </h1>
              <p style={{ color: 'var(--grafite-2)', margin: '0.2rem 0 0.8rem' }}>{veiculo.versao}</p>
              <span className="ln-preco" style={{ fontSize: '1.8rem' }}>
                {brl(veiculo.preco)}
              </span>
              {veiculo.status !== 'disponivel' && (
                <p>
                  <span className={`ln-selo ln-selo--${veiculo.status}`} style={{ position: 'static', display: 'inline-block', marginTop: '0.8rem' }}>
                    {rotuloStatus[veiculo.status]}
                  </span>
                </p>
              )}

              <dl>
                <div>
                  <dt>Ano</dt>
                  <dd>{veiculo.ano}</dd>
                </div>
                <div>
                  <dt>Quilometragem</dt>
                  <dd>{veiculo.km.toLocaleString('pt-BR')} km</dd>
                </div>
                <div>
                  <dt>Câmbio</dt>
                  <dd>{veiculo.cambio}</dd>
                </div>
                <div>
                  <dt>Combustível</dt>
                  <dd>{veiculo.combustivel}</dd>
                </div>
                <div>
                  <dt>Carroceria</dt>
                  <dd>{veiculo.carroceria}</dd>
                </div>
                <div>
                  <dt>Cor</dt>
                  <dd>{veiculo.cor}</dd>
                </div>
              </dl>

              <p style={{ color: 'var(--grafite-2)', fontSize: '0.95rem' }}>{veiculo.resumo}</p>

              <a
                className="ln-btn ln-btn--azul"
                style={{ width: '100%' }}
                href={linkWhatsApp(mensagem)}
                target="_blank"
                rel="noopener"
              >
                Falar sobre este veículo
              </a>
              <Link
                className="ln-btn ln-btn--contorno"
                style={{ width: '100%', marginTop: '0.6rem' }}
                to="/demonstracao/linha-norte#test-drive"
              >
                Agendar test-drive
              </Link>
              <p className="ln-aviso">
                Veículo fictício. Preço, quilometragem e histórico são ilustrativos e não representam oferta.
              </p>
            </aside>
          </div>
        </div>
      </section>
      </main>

      <RodapeLN />
    </div>
  )
}
