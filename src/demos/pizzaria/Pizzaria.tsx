import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './pizzaria.css'
import {
  adicionais,
  avaliacoes,
  bairros,
  categoriasCardapio,
  enderecoPizzaria,
  horarios,
  type CategoriaProduto,
  type Produto,
} from './dados'
import {
  adicionar,
  alterarQuantidade,
  buscar,
  descricaoItem,
  montarItem,
  precoAdicionais,
  precoBase,
  subtotal,
  taxaEntrega,
  type ItemCarrinho,
} from './carrinho'
import { BarraDemonstracao } from '../../components/Comuns'
import { brl, mascaraTelefone, telefoneValido } from '../../lib/format'
import { linkWhatsApp, montarMensagem } from '../../lib/whatsapp'
import { useSeo } from '../../lib/seo'

const dadosEstruturados = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Forno 27 Pizzaria (empresa fictícia)',
  servesCuisine: 'Pizza',
  priceRange: '$$',
  address: { '@type': 'PostalAddress', streetAddress: 'Rua das Oliveiras, 27', addressCountry: 'BR' },
  disambiguatingDescription:
    'Projeto demonstrativo — empresa fictícia criada para apresentar possibilidades de site.',
}

export default function Pizzaria() {
  const [categoria, setCategoria] = useState<CategoriaProduto | 'todos'>('todos')
  const [termo, setTermo] = useState('')
  const [selecionado, setSelecionado] = useState<Produto | null>(null)
  const [tamanhoId, setTamanhoId] = useState<string>('media')
  const [extras, setExtras] = useState<string[]>([])
  const [itens, setItens] = useState<ItemCarrinho[]>([])
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [modo, setModo] = useState<'entrega' | 'retirada'>('entrega')
  const [bairro, setBairro] = useState(bairros[0].nome)
  const [cliente, setCliente] = useState({ nome: '', telefone: '', endereco: '', obs: '' })
  const [erro, setErro] = useState('')
  const [enviado, setEnviado] = useState(false)

  useSeo({
    titulo: 'Forno 27 Pizzaria — modelo demonstrativo | Ramblas Sites',
    descricao:
      'Modelo demonstrativo de cardápio digital com carrinho e pedido por WhatsApp. Empresa fictícia criada para apresentar possibilidades.',
    caminho: '/demonstracao/forno-27',
    imagem: '/img/capa-forno27.webp',
    dados: dadosEstruturados,
  })

  const lista = useMemo(() => buscar(termo, categoria), [termo, categoria])
  const quantidadeTotal = itens.reduce((t, i) => t + i.quantidade, 0)
  const sub = subtotal(itens)
  const taxa = taxaEntrega(bairro, modo)

  function abrirProduto(p: Produto) {
    setSelecionado(p)
    setTamanhoId(p.tamanhos ? 'media' : '')
    setExtras([])
  }

  function confirmarProduto() {
    if (!selecionado) return
    setItens((atuais) => adicionar(atuais, montarItem(selecionado, tamanhoId, extras)))
    setSelecionado(null)
    setCarrinhoAberto(true)
    setEnviado(false)
  }

  function enviarPedido() {
    if (itens.length === 0) {
      setErro('Adicione ao menos um item ao carrinho.')
      return
    }
    if (cliente.nome.trim().length < 2) {
      setErro('Informe o nome de quem vai receber o pedido.')
      return
    }
    if (!telefoneValido(cliente.telefone)) {
      setErro('Informe um telefone com DDD.')
      return
    }
    if (modo === 'entrega' && cliente.endereco.trim().length < 6) {
      setErro('Informe o endereço completo para a entrega.')
      return
    }
    setErro('')
    const mensagem = montarMensagem(
      'Pedido — Forno 27 Pizzaria (demonstração)',
      [
        ['Cliente', cliente.nome],
        ['Telefone', cliente.telefone],
        ['Modo', modo === 'entrega' ? 'Entrega' : 'Retirada no balcão'],
        ['Bairro', modo === 'entrega' ? bairro : ''],
        ['Endereço', modo === 'entrega' ? cliente.endereco : ''],
        ['Itens', ''],
        ...itens.map(
          (i) => [`  ${i.quantidade}x`, `${descricaoItem(i)} — ${brl(i.precoUnitario * i.quantidade)}`] as [string, string],
        ),
        ['Subtotal', brl(sub)],
        ['Taxa de entrega', modo === 'entrega' ? brl(taxa) : 'Retirada'],
        ['Total', brl(sub + taxa)],
        ['Observações', cliente.obs],
      ],
      'Pedido gerado por um site demonstrativo da Ramblas Sites. Valores ilustrativos.',
    )
    window.open(linkWhatsApp(mensagem), '_blank', 'noopener')
    setEnviado(true)
  }

  return (
    <div className="demo-pizzaria">
      <BarraDemonstracao nome="Forno 27 Pizzaria" slug="forno-27" />

      <header className="pz-cabecalho">
        <div className="container pz-cabecalho__interno">
          <a className="pz-logo" href="#cardapio">
            <i aria-hidden="true" />
            Forno 27
          </a>
          <nav className="pz-nav" aria-label="Navegação da pizzaria">
            <a href="#cardapio">Cardápio</a>
            <a href="#visita">Onde estamos</a>
            <a href="#avaliacoes">Avaliações</a>
            <a href="#painel">Painel</a>
          </nav>
          <button
            type="button"
            className="pz-carrinho-botao"
            onClick={() => setCarrinhoAberto(true)}
            aria-label={`Abrir carrinho com ${quantidadeTotal} itens`}
          >
            Carrinho <span>{quantidadeTotal}</span>
          </button>
        </div>
      </header>

      <section className="pz-hero">
        <img src="/img/hero-pizzaria.webp" alt="Forno a lenha aceso em pizzaria artesanal" width={1600} height={900} />
        <div className="container pz-hero__conteudo">
          <span className="pz-promo">Terça e quarta: pizza grande com refrigerante por {brl(79)}</span>
          <h1>Massa de fermentação natural, assada no forno a lenha</h1>
          <p>
            Cardápio enxuto, ingredientes escolhidos a dedo e entrega no bairro. Monte seu pedido e receba
            quentinho, sem precisar ligar.
          </p>
          <div className="pz-hero__acoes">
            <a className="pz-btn pz-btn--principal" href="#cardapio">
              Fazer pedido
            </a>
            <a className="pz-btn pz-btn--claro" href="#visita">
              Ver horários e endereço
            </a>
          </div>
        </div>
      </section>

      <section className="pz-secao" id="cardapio">
        <div className="container">
          <div className="pz-titulo">
            <h2>Cardápio</h2>
            <p>Preços ilustrativos. Escolha tamanho e adicionais em cada pizza.</p>
          </div>

          <div className="pz-barra-busca">
            <div className="pz-busca">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.2-3.2" />
              </svg>
              <input
                type="search"
                value={termo}
                onChange={(e) => setTermo(e.target.value)}
                placeholder="Buscar por sabor ou ingrediente"
                aria-label="Buscar no cardápio"
              />
            </div>
            <div className="pz-filtros" role="group" aria-label="Filtrar por categoria">
              {categoriasCardapio.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="pz-filtro"
                  aria-pressed={categoria === c.id}
                  onClick={() => setCategoria(c.id)}
                >
                  {c.rotulo}
                </button>
              ))}
            </div>
          </div>

          <div className="pz-grade">
            {lista.length === 0 && (
              <div className="pz-vazio">
                <h3>Nada encontrado para “{termo}”</h3>
                <p>Tente outro ingrediente ou volte para o cardápio completo.</p>
                <button
                  type="button"
                  className="pz-btn pz-btn--principal pz-btn--pequeno"
                  onClick={() => {
                    setTermo('')
                    setCategoria('todos')
                  }}
                >
                  Limpar busca
                </button>
              </div>
            )}

            {lista.map((p) => (
              <article className="pz-card" key={p.id}>
                <figure>
                  <img src={p.imagem} alt={p.alt} loading="lazy" width={800} height={800} />
                  {p.destaque && <span className="pz-card__marca">Mais pedida</span>}
                  {!p.destaque && p.vegetariana && <span className="pz-card__marca">Vegetariana</span>}
                </figure>
                <div className="pz-card__corpo">
                  <h3>{p.nome}</h3>
                  <p>{p.descricao}</p>
                  <div className="pz-card__rodape">
                    <span className="pz-preco">
                      {brl(precoBase(p, 'media'))}
                      <small>{p.tamanhos ? 'média · outros tamanhos' : 'unidade'}</small>
                    </span>
                    <button type="button" className="pz-btn pz-btn--principal pz-btn--pequeno" onClick={() => abrirProduto(p)}>
                      Adicionar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pz-secao pz-secao--claro" id="visita">
        <div className="container pz-info-grade">
          <div>
            <h2>Onde estamos</h2>
            <p>{enderecoPizzaria}</p>
            <h3 style={{ marginTop: '1.8rem' }}>Horário de funcionamento</h3>
            <ul className="pz-horarios">
              {horarios.map((h) => (
                <li key={h.dia}>
                  <span>{h.dia}</span>
                  <strong>{h.hora}</strong>
                </li>
              ))}
            </ul>
            <p className="pz-aviso" style={{ marginTop: '1.5rem' }}>
              Endereço, mapa e horários são ilustrativos. Em um projeto real, entram mapa interativo e
              atualização automática do status “aberto agora”.
            </p>
          </div>
          <figure className="pz-mapa" style={{ margin: 0 }}>
            <img src="/img/mapa-pizzaria.webp" alt="Ilustração de mapa com a localização da pizzaria" loading="lazy" width={1200} height={620} />
          </figure>
        </div>
      </section>

      <section className="pz-secao" id="avaliacoes">
        <div className="container">
          <div className="pz-titulo">
            <h2>O que dizem os clientes</h2>
            <p>Comentários ilustrativos, criados apenas para demonstrar o layout.</p>
          </div>
          <div className="pz-avaliacoes">
            {avaliacoes.map((a) => (
              <article className="pz-avaliacao" key={a.nome}>
                <span className="pz-estrelas" aria-label={`Nota ${a.nota} de 5`}>
                  {'★'.repeat(a.nota)}
                  {'☆'.repeat(5 - a.nota)}
                </span>
                <p style={{ margin: '0.6rem 0' }}>{a.texto}</p>
                <strong style={{ fontSize: '0.9rem' }}>{a.nome}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pz-secao pz-painel-admin" id="painel">
        <div className="container">
          <h2>Com painel, o cardápio é seu</h2>
          <p style={{ maxWidth: '60ch' }}>
            Na versão contratada, esta pizzaria teria uma área interna para mudar preço, esgotar um sabor ou
            criar uma promoção sem depender de ninguém.
          </p>
          <div className="pz-admin-grade">
            <div className="pz-admin-card">
              <h3>Produtos e preços</h3>
              <p>Cadastrar sabores, tamanhos, adicionais e marcar itens indisponíveis.</p>
            </div>
            <div className="pz-admin-card">
              <h3>Promoções</h3>
              <p>Ativar a promoção do dia e programar início e fim automático.</p>
            </div>
            <div className="pz-admin-card">
              <h3>Entrega</h3>
              <p>Definir bairros atendidos, taxas e valor mínimo do pedido.</p>
            </div>
            <div className="pz-admin-card">
              <h3>Pedidos</h3>
              <p>Acompanhar pedidos recebidos, com histórico e impressão de comanda.</p>
            </div>
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
            Pagamento online, roteirização de entrega e integração com sistema de PDV dependem de contratação
            e de um backend próprio.
          </p>
        </div>
      </section>

      <footer className="pz-rodape">
        <div className="container">
          <p style={{ maxWidth: '70ch' }}>
            Forno 27 Pizzaria é uma empresa fictícia. Projeto demonstrativo — empresa fictícia criada para
            apresentar possibilidades. Preços, avaliações e endereço são ilustrativos.
          </p>
          <p>
            <Link to="/modelos/forno-27">Sobre este modelo</Link> ·{' '}
            <Link to="/">Ramblas Sites</Link>
          </p>
        </div>
      </footer>

      {/* ---------------------------------------------------- painel do produto */}
      {selecionado && (
        <div
          className="pz-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Montar ${selecionado.nome}`}
          onClick={(e) => e.target === e.currentTarget && setSelecionado(null)}
        >
          <div className="pz-painel">
            <div className="pz-painel__topo">
              <h2>{selecionado.nome}</h2>
              <button type="button" className="pz-fechar" onClick={() => setSelecionado(null)} aria-label="Fechar">
                ✕
              </button>
            </div>
            <img
              src={selecionado.imagem}
              alt={selecionado.alt}
              style={{ borderRadius: 16, marginBottom: '1rem' }}
              width={800}
              height={800}
            />
            <p style={{ color: 'var(--grafite-2)' }}>{selecionado.descricao}</p>

            {selecionado.tamanhos && (
              <>
                <p className="pz-legenda">Escolha o tamanho</p>
                <div className="pz-opcoes">
                  {selecionado.tamanhos.map((t) => (
                    <label className="pz-opcao" key={t.id}>
                      <input
                        type="radio"
                        name="tamanho"
                        value={t.id}
                        checked={tamanhoId === t.id}
                        onChange={() => setTamanhoId(t.id)}
                      />
                      <span>
                        {t.nome} <small style={{ color: 'var(--grafite-2)' }}>· {t.fatias}</small>
                      </span>
                      <span className="pz-opcao__valor">{brl(t.preco)}</span>
                    </label>
                  ))}
                </div>
              </>
            )}

            <p className="pz-legenda">Adicionais</p>
            <div className="pz-opcoes">
              {adicionais.map((a) => (
                <label className="pz-opcao" key={a.id}>
                  <input
                    type="checkbox"
                    checked={extras.includes(a.id)}
                    onChange={() =>
                      setExtras((e) => (e.includes(a.id) ? e.filter((x) => x !== a.id) : [...e, a.id]))
                    }
                  />
                  <span>{a.nome}</span>
                  <span className="pz-opcao__valor">{a.preco > 0 ? `+ ${brl(a.preco)}` : 'grátis'}</span>
                </label>
              ))}
            </div>

            <button type="button" className="pz-btn pz-btn--principal" style={{ width: '100%' }} onClick={confirmarProduto}>
              Adicionar {brl(precoBase(selecionado, tamanhoId) + precoAdicionais(extras))}
            </button>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- carrinho */}
      {carrinhoAberto && (
        <div
          className="pz-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Carrinho"
          onClick={(e) => e.target === e.currentTarget && setCarrinhoAberto(false)}
        >
          <div className="pz-painel">
            <div className="pz-painel__topo">
              <h2>Seu pedido</h2>
              <button type="button" className="pz-fechar" onClick={() => setCarrinhoAberto(false)} aria-label="Fechar carrinho">
                ✕
              </button>
            </div>

            {itens.length === 0 ? (
              <div className="pz-vazio">
                <h3>Carrinho vazio</h3>
                <p>Escolha uma pizza no cardápio para começar.</p>
                <button
                  type="button"
                  className="pz-btn pz-btn--principal pz-btn--pequeno"
                  onClick={() => setCarrinhoAberto(false)}
                >
                  Ver cardápio
                </button>
              </div>
            ) : (
              <>
                {itens.map((i) => (
                  <div className="pz-item" key={i.chave}>
                    <div>
                      <strong>{i.nome}</strong>
                      <small>{descricaoItem(i).replace(`${i.nome} · `, '')}</small>
                    </div>
                    <span>{brl(i.precoUnitario * i.quantidade)}</span>
                    <div className="pz-qtd">
                      <button type="button" onClick={() => setItens((a) => alterarQuantidade(a, i.chave, -1))} aria-label={`Remover um ${i.nome}`}>
                        −
                      </button>
                      <span>{i.quantidade}</span>
                      <button type="button" onClick={() => setItens((a) => alterarQuantidade(a, i.chave, 1))} aria-label={`Adicionar um ${i.nome}`}>
                        +
                      </button>
                    </div>
                  </div>
                ))}

                <p className="pz-legenda" style={{ marginTop: '1.5rem' }}>
                  Como você quer receber?
                </p>
                <div className="pz-opcoes">
                  <label className="pz-opcao">
                    <input type="radio" name="modo" checked={modo === 'entrega'} onChange={() => setModo('entrega')} />
                    <span>Entrega</span>
                  </label>
                  <label className="pz-opcao">
                    <input type="radio" name="modo" checked={modo === 'retirada'} onChange={() => setModo('retirada')} />
                    <span>Retirada no balcão</span>
                  </label>
                </div>

                {modo === 'entrega' && (
                  <div className="pz-campo">
                    <label htmlFor="pz-bairro">Bairro</label>
                    <select id="pz-bairro" value={bairro} onChange={(e) => setBairro(e.target.value)}>
                      {bairros.map((b) => (
                        <option key={b.nome} value={b.nome}>
                          {b.nome} — {brl(b.taxa)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="pz-campo">
                  <label htmlFor="pz-nome">Nome</label>
                  <input id="pz-nome" value={cliente.nome} onChange={(e) => setCliente({ ...cliente, nome: e.target.value })} />
                </div>
                <div className="pz-campo">
                  <label htmlFor="pz-tel">Telefone</label>
                  <input
                    id="pz-tel"
                    inputMode="tel"
                    placeholder="(11) 90000-0000"
                    value={cliente.telefone}
                    onChange={(e) => setCliente({ ...cliente, telefone: mascaraTelefone(e.target.value) })}
                  />
                </div>
                {modo === 'entrega' && (
                  <div className="pz-campo">
                    <label htmlFor="pz-end">Endereço</label>
                    <input
                      id="pz-end"
                      value={cliente.endereco}
                      onChange={(e) => setCliente({ ...cliente, endereco: e.target.value })}
                      placeholder="Rua, número e complemento"
                    />
                  </div>
                )}
                <div className="pz-campo">
                  <label htmlFor="pz-obs">Observações</label>
                  <textarea
                    id="pz-obs"
                    value={cliente.obs}
                    onChange={(e) => setCliente({ ...cliente, obs: e.target.value })}
                    placeholder="Sabor do refrigerante, ponto da massa, troco…"
                  />
                </div>

                <div className="pz-resumo">
                  <div>
                    <span>Subtotal</span>
                    <span>{brl(sub)}</span>
                  </div>
                  <div>
                    <span>{modo === 'entrega' ? `Entrega · ${bairro}` : 'Retirada no balcão'}</span>
                    <span>{modo === 'entrega' ? brl(taxa) : brl(0)}</span>
                  </div>
                  <div className="pz-total">
                    <span>Total</span>
                    <span>{brl(sub + taxa)}</span>
                  </div>
                </div>

                {erro && (
                  <p className="pz-erro" role="alert" style={{ marginTop: '0.8rem' }}>
                    {erro}
                  </p>
                )}
                {enviado && (
                  <p style={{ color: 'var(--oliva)', fontSize: '0.9rem', marginTop: '0.8rem' }} role="status">
                    Pedido montado e enviado para o WhatsApp. Nesta demonstração nada é gravado nem cobrado.
                  </p>
                )}

                <button type="button" className="pz-btn pz-btn--verde" style={{ width: '100%', marginTop: '1rem' }} onClick={enviarPedido}>
                  Enviar pedido pelo WhatsApp
                </button>
                <p className="pz-aviso" style={{ marginTop: '1rem' }}>
                  Cálculo ilustrativo. Pagamento, confirmação e entrega dependem de contratação.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
