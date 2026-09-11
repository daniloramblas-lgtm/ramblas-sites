export function brl(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function somenteDigitos(v: string): string {
  return v.replace(/\D/g, '')
}

/** Máscara progressiva de telefone brasileiro: (11) 90000-0000 */
export function mascaraTelefone(v: string): string {
  const d = somenteDigitos(v).slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function telefoneValido(v: string): boolean {
  const d = somenteDigitos(v)
  return d.length === 10 || d.length === 11
}

export function emailValido(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim())
}

export function dataLonga(iso: string): string {
  const [a, m, d] = iso.split('-').map(Number)
  return new Date(a, m - 1, d).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function diaSemanaCurto(iso: string): string {
  const [a, m, d] = iso.split('-').map(Number)
  return new Date(a, m - 1, d)
    .toLocaleDateString('pt-BR', { weekday: 'short' })
    .replace('.', '')
}
