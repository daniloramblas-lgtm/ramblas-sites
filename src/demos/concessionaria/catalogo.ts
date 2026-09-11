import { veiculos, type Veiculo } from './dados'

export type Filtros = {
  termo: string
  marca: string
  modelo: string
  cambio: string
  anoMin: number
  precoMax: number
  kmMax: number
  ordem: 'relevancia' | 'preco-asc' | 'preco-desc' | 'km-asc' | 'ano-desc'
}

export const filtrosIniciais: Filtros = {
  termo: '',
  marca: '',
  modelo: '',
  cambio: '',
  anoMin: 2022,
  precoMax: 300000,
  kmMax: 60000,
  ordem: 'relevancia',
}

function normalizar(t: string) {
  return t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function filtrar(f: Filtros, lista: Veiculo[] = veiculos): Veiculo[] {
  const termo = normalizar(f.termo.trim())
  const resultado = lista.filter((v) => {
    if (f.marca && v.marca !== f.marca) return false
    if (f.modelo && v.modelo !== f.modelo) return false
    if (f.cambio && v.cambio !== f.cambio) return false
    if (v.ano < f.anoMin) return false
    if (v.preco > f.precoMax) return false
    if (v.km > f.kmMax) return false
    if (termo) {
      const alvo = normalizar(`${v.marca} ${v.modelo} ${v.versao} ${v.cor} ${v.carroceria} ${v.combustivel}`)
      if (!alvo.includes(termo)) return false
    }
    return true
  })

  const ordenado = [...resultado]
  switch (f.ordem) {
    case 'preco-asc':
      ordenado.sort((a, b) => a.preco - b.preco)
      break
    case 'preco-desc':
      ordenado.sort((a, b) => b.preco - a.preco)
      break
    case 'km-asc':
      ordenado.sort((a, b) => a.km - b.km)
      break
    case 'ano-desc':
      ordenado.sort((a, b) => b.ano - a.ano)
      break
    default:
      ordenado.sort((a, b) => Number(!!b.destaque) - Number(!!a.destaque))
  }
  return ordenado
}

/**
 * Parcela pela fórmula de juros compostos (Price).
 * Cálculo ILUSTRATIVO: não representa proposta de crédito.
 */
export function parcela(valor: number, entrada: number, meses: number, jurosMensal = 0.0149): number {
  const financiado = Math.max(valor - entrada, 0)
  if (financiado === 0) return 0
  if (jurosMensal === 0) return financiado / meses
  const fator = Math.pow(1 + jurosMensal, meses)
  return (financiado * jurosMensal * fator) / (fator - 1)
}

export function totalFinanciado(valor: number, entrada: number, meses: number, jurosMensal = 0.0149): number {
  return parcela(valor, entrada, meses, jurosMensal) * meses + entrada
}

export function porSlug(slug: string | undefined): Veiculo | undefined {
  return veiculos.find((v) => v.slug === slug)
}

export const rotuloStatus: Record<Veiculo['status'], string> = {
  disponivel: 'Disponível',
  reservado: 'Reservado',
  vendido: 'Vendido',
}
