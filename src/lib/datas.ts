/**
 * Datas no fuso de São Paulo (America/Sao_Paulo), independentemente
 * do relógio do aparelho do visitante.
 */
const FUSO = 'America/Sao_Paulo'

/** Data de hoje em São Paulo no formato YYYY-MM-DD. */
export function hojeSaoPaulo(agora: Date = new Date()): string {
  // en-CA devolve exatamente YYYY-MM-DD.
  return agora.toLocaleDateString('en-CA', { timeZone: FUSO })
}

/** Soma dias a uma data ISO sem passar por Date local (evita virada de mês/ano errada). */
export function somarDias(iso: string, dias: number): string {
  const [a, m, d] = iso.split('-').map(Number)
  const base = new Date(Date.UTC(a, m - 1, d))
  base.setUTCDate(base.getUTCDate() + dias)
  return base.toISOString().slice(0, 10)
}

/** true quando a data ISO é anterior a hoje em São Paulo. */
export function dataNoPassado(iso: string, agora: Date = new Date()): boolean {
  if (!iso) return false
  return iso < hojeSaoPaulo(agora)
}

/** Validação usada pelos formulários: devolve a mensagem de erro ou vazio. */
export function erroDeData(iso: string, obrigatoria = true, agora: Date = new Date()): string {
  if (!iso) return obrigatoria ? 'Escolha uma data.' : ''
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return 'Data inválida.'
  if (dataNoPassado(iso, agora)) return 'A data precisa ser hoje ou uma data futura.'
  return ''
}
