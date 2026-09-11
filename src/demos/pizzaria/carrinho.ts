import { adicionais, bairros, produtos, type Produto } from './dados'

export type ItemCarrinho = {
  /** chave única: produto + tamanho + adicionais escolhidos */
  chave: string
  produtoId: string
  nome: string
  tamanhoId?: string
  tamanhoNome?: string
  adicionaisIds: string[]
  precoUnitario: number
  quantidade: number
}

export function precoAdicionais(ids: string[]): number {
  return ids.reduce((total, id) => total + (adicionais.find((a) => a.id === id)?.preco ?? 0), 0)
}

export function precoBase(produto: Produto, tamanhoId?: string): number {
  if (produto.tamanhos && produto.tamanhos.length > 0) {
    const t = produto.tamanhos.find((x) => x.id === tamanhoId) ?? produto.tamanhos[1] ?? produto.tamanhos[0]
    return t.preco
  }
  return produto.preco ?? 0
}

export function montarItem(produto: Produto, tamanhoId: string | undefined, adicionaisIds: string[]): ItemCarrinho {
  const tamanho = produto.tamanhos?.find((t) => t.id === tamanhoId)
  const ordenados = [...adicionaisIds].sort()
  return {
    chave: [produto.id, tamanho?.id ?? '-', ordenados.join('+') || '-'].join('|'),
    produtoId: produto.id,
    nome: produto.nome,
    tamanhoId: tamanho?.id,
    tamanhoNome: tamanho?.nome,
    adicionaisIds: ordenados,
    precoUnitario: precoBase(produto, tamanhoId) + precoAdicionais(ordenados),
    quantidade: 1,
  }
}

export function adicionar(itens: ItemCarrinho[], novo: ItemCarrinho): ItemCarrinho[] {
  const existente = itens.find((i) => i.chave === novo.chave)
  if (existente) {
    return itens.map((i) => (i.chave === novo.chave ? { ...i, quantidade: i.quantidade + novo.quantidade } : i))
  }
  return [...itens, novo]
}

export function alterarQuantidade(itens: ItemCarrinho[], chave: string, delta: number): ItemCarrinho[] {
  return itens
    .map((i) => (i.chave === chave ? { ...i, quantidade: i.quantidade + delta } : i))
    .filter((i) => i.quantidade > 0)
}

export function subtotal(itens: ItemCarrinho[]): number {
  return itens.reduce((t, i) => t + i.precoUnitario * i.quantidade, 0)
}

export function taxaEntrega(bairro: string, modo: 'entrega' | 'retirada'): number {
  if (modo === 'retirada') return 0
  return bairros.find((b) => b.nome === bairro)?.taxa ?? 0
}

export function total(itens: ItemCarrinho[], bairro: string, modo: 'entrega' | 'retirada'): number {
  return subtotal(itens) + taxaEntrega(bairro, modo)
}

export function buscar(termo: string, categoria: string): Produto[] {
  const t = termo
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  return produtos.filter((p) => {
    const naCategoria = categoria === 'todos' || p.categoria === categoria
    if (!naCategoria) return false
    if (!t) return true
    const alvo = `${p.nome} ${p.descricao}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    return alvo.includes(t)
  })
}

export function descricaoItem(item: ItemCarrinho): string {
  const partes = [item.nome]
  if (item.tamanhoNome) partes.push(item.tamanhoNome)
  if (item.adicionaisIds.length) {
    partes.push(
      item.adicionaisIds.map((id) => adicionais.find((a) => a.id === id)?.nome ?? id).join(' + '),
    )
  }
  return partes.join(' · ')
}
