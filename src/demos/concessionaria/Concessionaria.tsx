import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './concessionaria.css'
import { cambios, horariosLinhaNorte, marcas, modelosLista, veiculos } from './dados'
import { filtrar, filtrosIniciais, rotuloStatus, type Filtros } from './catalogo'
import { CabecalhoLN, RodapeLN } from './LayoutLN'
import { BarraDemo, PularParaConteudo } from '../../components/DemoShell'
import { metaDemoPorCaminho } from '../../data/rotas'
import { erroDeData, hojeSaoPaulo } from '../../lib/datas'
import { evento } from '../../lib/analytics'
import { brl, mascaraTelefone, telefoneValido } from '../../lib/format'
import { linkWhatsApp, montarMensagem } from '../../lib/whatsapp'
import { useSeo } from '../../lib/seo'
import { conjunto } from '../../lib/imagens'

export default function Concessionaria() {
  const [filtros, setFiltros] = useState<Filtros>(filtrosIniciais)
  const [comparar, setComparar] = useState<string[]>([])
  const navegar = useNavigate()

  const lista = useMemo(() => filtrar(filtros), [filtros])

  useSeo(metaDemoPorCaminho('/demonstracao/linha-norte')!)

  function alterar<C extends keyof Filtros>(campo: C, valor: Filtros[C]) {
    setFiltros((f) => ({ ...f, [campo]: valor }))
  }

  function alternarComparar(slug: string) {
    setComparar((c) => (c.includes(slug) ? c.filter((s) => s !== slug) : c.length < 3 ? [...c, slug] : c))
    evento('vehicle_compare', { veiculo: slug })
  }

  return (
    <div className="demo-concessionaria">
      <PularParaConteudo />
      <BarraDemo id="linha-norte" />
      <CabecalhoLN />

      <main id="conteudo">
      <section className="ln-hero">
        <img
          className="ln-hero__fundo"
          src="/img/hero-concessionaria.webp"
          alt="Showroom de veículos iluminado"
          width={1600}
          height={900}
        />
        <div className="container ln-hero__conteudo">
          <h1>Seminovos revisados, com histórico aberto e entrega no mesmo dia</h1>
          <p>
            Estoque atualizado, laudo cadastrado e simulação de parcelas antes mesmo de você sair de casa.
          </p>
          <div className="ln-hero__acoes">
            <a className="ln-btn ln-btn--azul" href="#estoque">
              Ver estoque
            </a>
            <a className="ln-btn ln-btn--contorno" href="#avaliar-usado">
              Avaliar meu usado
            </a>
          </div>
          <div className="ln-hero__dados">
            <div>
              <strong>{veiculos.filter((v) => v.status === 'disponivel').length}</strong>
              <span>veículos disponíveis</span>
            </div>
            <div>
              <strong>2022–2026</strong>
              <span>anos em estoque</span>
            </div>
            <div>
              <strong>12x</strong>
              <span>revisões registradas</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- estoque */}
      <section className="ln-secao" id="estoque">
        <div className="container">
          <div className="ln-titulo">
            <h2>Estoque</h2>
            <p>
              {lista.length} {lista.length === 1 ? 'veículo encontrado' : 'veículos encontrados'} — valores
              ilustrativos.
            </p>
          </div>

          <div className="ln-catalogo">
            <aside className="ln-filtros" aria-label="Filtros do catálogo">
              <div className="ln-campo">
                <label htmlFor="ln-busca">Buscar</label>
                <input
                  id="ln-busca"
                  type="search"
                  value={filtros.termo}
                  placeholder="Modelo, versão ou cor"
                  onChange={(e) => alterar('termo', e.target.value)}
                />
              </div>
              <div className="ln-campo">
                <label htmlFor="ln-marca">Marca</label>
                <select id="ln-marca" value={filtros.marca} onChange={(e) => alterar('marca', e.target.value)}>
                  <option value="">Todas</option>
                  {marcas.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ln-campo">
                <label htmlFor="ln-modelo">Modelo</label>
                <select id="ln-modelo" value={filtros.modelo} onChange={(e) => alterar('modelo', e.target.value)}>
                  <option value="">Todos</option>
                  {modelosLista.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ln-campo">
                <label htmlFor="ln-cambio">Câmbio</label>
                <select id="ln-cambio" value={filtros.cambio} onChange={(e) => alterar('cambio', e.target.value)}>
                  <option value="">Todos</option>
                  {cambios.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ln-campo">
                <label htmlFor="ln-ano">Ano a partir de</label>
                <input
                  id="ln-ano"
                  type="range"
                  min={2022}
                  max={2026}
                  step={1}
                  value={filtros.anoMin}
                  onChange={(e) => alterar('anoMin', Number(e.target.value))}
                />
                <output htmlFor="ln-ano">{filtros.anoMin}</output>
              </div>
              <div className="ln-campo">
                <label htmlFor="ln-preco">Preço até</label>
                <input
                  id="ln-preco"
                  type="range"
                  min={70000}
                  max={300000}
                  step={5000}
                  value={filtros.precoMax}
                  onChange={(e) => alterar('precoMax', Number(e.target.value))}
                />
                <output htmlFor="ln-preco">{brl(filtros.precoMax)}</output>
              </div>
              <div className="ln-campo">
                <label htmlFor="ln-km">Quilometragem até</label>
                <input
                  id="ln-km"
                  type="range"
                  min={0}
                  max={60000}
                  step={2000}
                  value={filtros.kmMax}
                  onChange={(e) => alterar('kmMax', Number(e.target.value))}
                />
                <output htmlFor="ln-km">{filtros.kmMax.toLocaleString('pt-BR')} km</output>
              </div>
              <div className="ln-campo">
                <label htmlFor="ln-ordem">Ordenar por</label>
                <select
                  id="ln-ordem"
                  value={filtros.ordem}
                  onChange={(e) => alterar('ordem', e.target.value as Filtros['ordem'])}
                >
                  <option value="relevancia">Destaques</option>
                  <option value="preco-asc">Menor preço</option>
                  <option value="preco-desc">Maior preço</option>
                  <option value="km-asc">Menor quilometragem</option>
                  <option value="ano-desc">Mais novos</option>
                </select>
              </div>
              <button type="button" className="ln-btn ln-btn--contorno" onClick={() => setFiltros(filtrosIniciais)}>
                Limpar filtros
              </button>
            </aside>

            <div className="ln-grade">
              {lista.length === 0 && (
                <div className="ln-vazio">
                  <h3>Nenhum veículo com esses filtros</h3>
                  <p>Amplie a faixa de preço ou limpe os filtros para ver o estoque completo.</p>
                  <button type="button" className="ln-btn ln-btn--azul" onClick={() => setFiltros(filtrosIniciais)}>
                    Limpar filtros
                  </button>
                </div>
              )}

              {lista.map((v) => (
                <article className="ln-card" key={v.slug}>
                  <figure>
                    <img
                      {...conjunto(v.fotos[0], '(max-width: 700px) 90vw, 300px')}
                      alt={`${v.marca} ${v.modelo} ${v.versao}, cor ${v.cor}`}
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={800}
                    />
                    {v.status !== 'disponivel' && (
                      <span className={`ln-selo ln-selo--${v.status}`}>{rotuloStatus[v.status]}</span>
                    )}
                    {v.status === 'disponivel' && v.destaque && <span className="ln-selo">Destaque</span>}
                  </figure>
                  <div className="ln-card__corpo">
                    <h3>
                      {v.marca} {v.modelo}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--grafite-2)' }}>{v.versao}</p>
                    <div className="ln-card__meta">
                      <span>{v.ano}</span>
                      <span>{v.km.toLocaleString('pt-BR')} km</span>
                      <span>{v.cambio}</span>
                      <span>{v.combustivel}</span>
                    </div>
                    <span className="ln-preco">{brl(v.preco)}</span>
                    <div className="ln-card__acoes">
                      <Link className="ln-btn ln-btn--azul ln-btn--pequeno" to={`/demonstracao/linha-norte/veiculo/${v.slug}`}>
                        Ver detalhes
                      </Link>
                      <label className="ln-comparar">
                        <input
                          type="checkbox"
                          checked={comparar.includes(v.slug)}
                          onChange={() => alternarComparar(v.slug)}
                          aria-label={`Comparar ${v.marca} ${v.modelo} ${v.versao}`}
                        />
                        Comparar
                      </label>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {comparar.length > 0 && (
        <div className="ln-barra-comparar">
          <div className="container ln-barra-comparar__interno">
            <span>
              {comparar.length} de 3 selecionados para comparação
              {comparar.length === 1 ? ' — escolha ao menos mais um' : ''}
            </span>
            <span style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <button type="button" className="ln-btn ln-btn--contorno ln-btn--pequeno" onClick={() => setComparar([])}>
                Limpar
              </button>
              <button
                type="button"
                className="ln-btn ln-btn--azul ln-btn--pequeno"
                disabled={comparar.length < 2}
                onClick={() => navegar(`/demonstracao/linha-norte/comparar?v=${comparar.join(',')}`)}
              >
                Comparar veículos
              </button>
            </span>
          </div>
        </div>
      )}

      <section className="ln-secao ln-secao--escuro" id="avaliacao">
        <div className="container">
          <div className="ln-titulo">
            <h2>Avaliação e test-drive</h2>
            <p style={{ color: '#b9c2cc' }}>Formulários demonstrativos: nada é gravado, tudo vai para o WhatsApp.</p>
          </div>
          <div className="ln-formularios">
            <div id="avaliar-usado">
              <FormularioAvaliacao />
            </div>
            <div id="test-drive">
              <FormularioTestDrive />
            </div>
          </div>
          <p className="ln-aviso">
            Em um projeto contratado, estes formulários alimentariam o CRM da loja, com histórico de contato
            e distribuição automática entre os vendedores.
          </p>
        </div>
      </section>

      <section className="ln-secao ln-secao--cinza" id="painel">
        <div className="container">
          <div className="ln-titulo">
            <h2>Painel de estoque</h2>
            <p>O que a equipe da loja faria sozinha, sem depender de quem fez o site.</p>
          </div>
          <div className="ln-grade">
            {[
              ['Cadastrar veículos', 'Fotos, ficha técnica, equipamentos e preço, com publicação imediata.'],
              ['Marcar status', 'Alternar entre disponível, reservado e vendido em um clique.'],
              ['Importar estoque', 'Carga por planilha ou XML, para lojas com giro alto.'],
              ['Acompanhar interesse', 'Ver quais veículos recebem mais pedidos de test-drive.'],
            ].map(([titulo, texto]) => (
              <article className="ln-card" key={titulo} style={{ padding: '1.4rem' }}>
                <h3>{titulo}</h3>
                <p style={{ margin: '0.5rem 0 0', color: 'var(--grafite-2)', fontSize: '0.94rem' }}>{texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ln-secao" id="visita">
        <div className="container ln-formularios">
          <div>
            <h2>Horários da loja</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 0', display: 'grid', gap: '0.55rem' }}>
              {horariosLinhaNorte.map((h) => (
                <li
                  key={h.dia}
                  style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--linha)', paddingBottom: '0.5rem' }}
                >
                  <span>{h.dia}</span>
                  <strong>{h.hora}</strong>
                </li>
              ))}
            </ul>
          </div>
          <figure style={{ margin: 0 }}>
            <img
              src="/img/mapa-concessionaria.webp"
              alt="Ilustração de mapa com a localização da concessionária"
              loading="lazy"
              width={1200}
              height={620}
              style={{ width: '100%', borderRadius: 14, border: '1px solid var(--linha)' }}
            />
          </figure>
        </div>
      </section>

      </main>

      <RodapeLN />
    </div>
  )
}

/* ------------------------------------------------------------------ formulários */

function FormularioAvaliacao() {
  const [dados, setDados] = useState({ nome: '', telefone: '', veiculo: '', ano: '', km: '', obs: '' })
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState(false)

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (dados.nome.trim().length < 2 || !telefoneValido(dados.telefone) || dados.veiculo.trim().length < 3) {
      setErro('Preencha nome, telefone com DDD e o veículo que você quer avaliar.')
      return
    }
    setErro('')
    window.open(
      linkWhatsApp(
        montarMensagem(
          'Avaliação de usado — Linha Norte Motors (demonstração)',
          [
            ['Nome', dados.nome],
            ['Telefone', dados.telefone],
            ['Veículo', dados.veiculo],
            ['Ano', dados.ano],
            ['Quilometragem', dados.km],
            ['Observações', dados.obs],
          ],
          'Enviado por um site demonstrativo da Ramblas Sites.',
        ),
      ),
      '_blank',
      'noopener,noreferrer',
    )
    setOk(true)
  }

  return (
    <form className="ln-form" onSubmit={enviar} noValidate>
      <h3 style={{ marginTop: 0 }}>Avaliar meu usado na troca</h3>
      <div className="ln-campo">
        <label htmlFor="av-nome">Nome</label>
        <input id="av-nome" type="text" value={dados.nome} onChange={(e) => setDados({ ...dados, nome: e.target.value })} />
      </div>
      <div className="ln-campo">
        <label htmlFor="av-tel">Telefone</label>
        <input
          id="av-tel"
          type="text"
          inputMode="tel"
          placeholder="(11) 90000-0000"
          value={dados.telefone}
          onChange={(e) => setDados({ ...dados, telefone: mascaraTelefone(e.target.value) })}
        />
      </div>
      <div className="ln-campo">
        <label htmlFor="av-veiculo">Veículo atual</label>
        <input
          id="av-veiculo"
          type="text"
          placeholder="Marca, modelo e versão"
          value={dados.veiculo}
          onChange={(e) => setDados({ ...dados, veiculo: e.target.value })}
        />
      </div>
      <div className="ln-campos-duplos">
        <div className="ln-campo">
          <label htmlFor="av-ano">Ano</label>
          <input id="av-ano" type="number" min={1990} max={2026} value={dados.ano} onChange={(e) => setDados({ ...dados, ano: e.target.value })} />
        </div>
        <div className="ln-campo">
          <label htmlFor="av-km">Km</label>
          <input id="av-km" type="number" min={0} value={dados.km} onChange={(e) => setDados({ ...dados, km: e.target.value })} />
        </div>
      </div>
      <div className="ln-campo">
        <label htmlFor="av-obs">Observações</label>
        <input id="av-obs" type="text" placeholder="Estado geral, itens opcionais…" value={dados.obs} onChange={(e) => setDados({ ...dados, obs: e.target.value })} />
      </div>
      {erro && (
        <p className="ln-erro" role="alert">
          {erro}
        </p>
      )}
      <button className="ln-btn ln-btn--azul" type="submit" style={{ width: '100%' }}>
        Pedir avaliação
      </button>
      {ok && (
        <p className="ln-ok" role="status">
          Pedido montado e aberto no WhatsApp. A avaliação real depende de vistoria presencial.
        </p>
      )}
    </form>
  )
}

function FormularioTestDrive() {
  const [dados, setDados] = useState({ nome: '', telefone: '', veiculo: veiculos[0].slug, data: '', periodo: 'Manhã' })
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState(false)

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (dados.nome.trim().length < 2 || !telefoneValido(dados.telefone)) {
      setErro('Preencha nome e telefone com DDD.')
      return
    }
    const problemaData = erroDeData(dados.data)
    if (problemaData) {
      setErro(problemaData)
      return
    }
    setErro('')
    const v = veiculos.find((x) => x.slug === dados.veiculo)!
    window.open(
      linkWhatsApp(
        montarMensagem(
          'Agendamento de test-drive — Linha Norte Motors (demonstração)',
          [
            ['Nome', dados.nome],
            ['Telefone', dados.telefone],
            ['Veículo', `${v.marca} ${v.modelo} ${v.versao}`],
            ['Data', dados.data],
            ['Período', dados.periodo],
          ],
          'Enviado por um site demonstrativo da Ramblas Sites. Horário sujeito a confirmação.',
        ),
      ),
      '_blank',
      'noopener,noreferrer',
    )
    evento('test_drive_submit', { veiculo: dados.veiculo })
    setOk(true)
  }

  return (
    <form className="ln-form" onSubmit={enviar} noValidate>
      <h3 style={{ marginTop: 0 }}>Agendar test-drive</h3>
      <div className="ln-campo">
        <label htmlFor="td-nome">Nome</label>
        <input id="td-nome" type="text" value={dados.nome} onChange={(e) => setDados({ ...dados, nome: e.target.value })} />
      </div>
      <div className="ln-campo">
        <label htmlFor="td-tel">Telefone</label>
        <input
          id="td-tel"
          type="text"
          inputMode="tel"
          placeholder="(11) 90000-0000"
          value={dados.telefone}
          onChange={(e) => setDados({ ...dados, telefone: mascaraTelefone(e.target.value) })}
        />
      </div>
      <div className="ln-campo">
        <label htmlFor="td-veiculo">Veículo</label>
        <select id="td-veiculo" value={dados.veiculo} onChange={(e) => setDados({ ...dados, veiculo: e.target.value })}>
          {veiculos
            .filter((v) => v.status !== 'vendido')
            .map((v) => (
              <option key={v.slug} value={v.slug}>
                {v.marca} {v.modelo} {v.versao}
              </option>
            ))}
        </select>
      </div>
      <div className="ln-campos-duplos">
        <div className="ln-campo">
          <label htmlFor="td-data">Data</label>
          <input
            id="td-data"
            type="date"
            min={hojeSaoPaulo()}
            value={dados.data}
            onChange={(e) => setDados({ ...dados, data: e.target.value })}
          />
        </div>
        <div className="ln-campo">
          <label htmlFor="td-periodo">Período</label>
          <select id="td-periodo" value={dados.periodo} onChange={(e) => setDados({ ...dados, periodo: e.target.value })}>
            <option>Manhã</option>
            <option>Tarde</option>
          </select>
        </div>
      </div>
      {erro && (
        <p className="ln-erro" role="alert">
          {erro}
        </p>
      )}
      <button className="ln-btn ln-btn--azul" type="submit" style={{ width: '100%' }}>
        Agendar test-drive
      </button>
      {ok && (
        <p className="ln-ok" role="status">
          Agendamento montado e aberto no WhatsApp. Nesta demonstração nenhum horário é reservado.
        </p>
      )}
    </form>
  )
}
