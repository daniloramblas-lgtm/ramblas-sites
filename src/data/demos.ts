/** Demonstrações disponíveis — usada pelo seletor compartilhado. */
export type DemoInfo = {
  id: 'forno-27' | 'distrito-13' | 'aurea' | 'linha-norte'
  nome: string
  curto: string
  segmento: string
  rota: string
  miniatura: string
  /** Cor de acento usada no destaque do seletor. */
  cor: string
}

export const demos: DemoInfo[] = [
  {
    id: 'forno-27',
    nome: 'Forno 27',
    curto: 'Pizzaria',
    segmento: 'Alimentação',
    rota: '/demonstracao/forno-27',
    miniatura: '/img/capa-forno27.webp',
    cor: '#8e2c22',
  },
  {
    id: 'distrito-13',
    nome: 'Distrito 13',
    curto: 'Barbearia',
    segmento: 'Beleza',
    rota: '/demonstracao/distrito-13',
    miniatura: '/img/capa-distrito13.webp',
    cor: '#b0713c',
  },
  {
    id: 'aurea',
    nome: 'Áurea',
    curto: 'Escritório',
    segmento: 'Serviços profissionais',
    rota: '/demonstracao/aurea',
    miniatura: '/img/capa-aurea.webp',
    cor: '#10352c',
  },
  {
    id: 'linha-norte',
    nome: 'Linha Norte',
    curto: 'Concessionária',
    segmento: 'Automóveis',
    rota: '/demonstracao/linha-norte',
    miniatura: '/img/capa-linhanorte.webp',
    cor: '#1b3b6f',
  },
]

export function demoPorId(id: string): DemoInfo | undefined {
  return demos.find((d) => d.id === id)
}
