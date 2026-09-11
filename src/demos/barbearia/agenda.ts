import { profissionais } from './dados'

/** Data ISO (YYYY-MM-DD) somando dias à referência. */
export function isoComDeslocamento(base: Date, dias: number): string {
  const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + dias)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

export function diaDaSemana(iso: string): number {
  const [a, m, d] = iso.split('-').map(Number)
  return new Date(a, m - 1, d).getDay()
}

/** Próximos `quantidade` dias a partir de hoje (inclusive). */
export function proximosDias(base: Date, quantidade = 14): string[] {
  return Array.from({ length: quantidade }, (_, i) => isoComDeslocamento(base, i))
}

export function profissionalAtende(profissionalId: string, iso: string): boolean {
  const p = profissionais.find((x) => x.id === profissionalId)
  if (!p) return false
  return p.dias.includes(diaDaSemana(iso))
}

/** Hash simples e estável: a mesma data sempre gera a mesma agenda. */
function hash(texto: string): number {
  let h = 0
  for (let i = 0; i < texto.length; i++) h = (h * 31 + texto.charCodeAt(i)) % 9973
  return h
}

const ABERTURA = 9 * 60
const FECHAMENTO_SEMANA = 20 * 60
const FECHAMENTO_SABADO = 18 * 60

export function minutosParaHora(min: number): string {
  return `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`
}

export type Horario = { hora: string; livre: boolean }

/**
 * Gera os horários do dia em intervalos de 30 minutos.
 * A ocupação é determinística (demonstrativa), não vem de banco de dados.
 */
export function horariosDoDia(profissionalId: string, iso: string, duracao: number): Horario[] {
  if (!profissionalAtende(profissionalId, iso)) return []
  const fim = diaDaSemana(iso) === 6 ? FECHAMENTO_SABADO : FECHAMENTO_SEMANA
  const lista: Horario[] = []
  for (let m = ABERTURA; m + duracao <= fim; m += 30) {
    const semente = hash(`${profissionalId}-${iso}-${m}`)
    lista.push({ hora: minutosParaHora(m), livre: semente % 10 > 2 })
  }
  return lista
}
