export type Veiculo = {
  slug: string
  marca: string
  modelo: string
  versao: string
  ano: number
  preco: number
  km: number
  cambio: 'Automático' | 'Manual'
  combustivel: 'Flex' | 'Diesel' | 'Híbrido' | 'Elétrico'
  carroceria: 'Sedan' | 'SUV' | 'Hatch'
  cor: string
  status: 'disponivel' | 'reservado' | 'vendido'
  destaque?: boolean
  fotos: string[]
  equipamentos: string[]
  resumo: string
}

const fotos = (base: string) => [1, 2, 3].map((i) => `/img/veiculo-${base}-${i}.webp`)

export const veiculos: Veiculo[] = [
  {
    slug: 'aurora-sedan-lx',
    marca: 'Vantre',
    modelo: 'Aurora',
    versao: 'LX 1.4 Turbo',
    ano: 2024,
    preco: 128900,
    km: 18400,
    cambio: 'Automático',
    combustivel: 'Flex',
    carroceria: 'Sedan',
    cor: 'Prata',
    status: 'disponivel',
    destaque: true,
    fotos: fotos('sedan-prata'),
    equipamentos: ['Câmbio automático de 6 marchas', 'Central multimídia', 'Sensor de estacionamento', 'Faróis full LED', 'Piloto automático'],
    resumo: 'Sedan de porte médio com revisões em dia e único dono no cadastro fictício.',
  },
  {
    slug: 'cordilheira-suv-advance',
    marca: 'Meridia',
    modelo: 'Cordilheira',
    versao: 'Advance 2.0 AWD',
    ano: 2025,
    preco: 214500,
    km: 9200,
    cambio: 'Automático',
    combustivel: 'Diesel',
    carroceria: 'SUV',
    cor: 'Azul',
    status: 'disponivel',
    destaque: true,
    fotos: fotos('suv-azul'),
    equipamentos: ['Tração integral', 'Teto solar panorâmico', 'Bancos em couro', 'Assistente de faixa', 'Sete lugares'],
    resumo: 'SUV grande de sete lugares, indicada para família e estrada.',
  },
  {
    slug: 'brisa-hatch-life',
    marca: 'Vantre',
    modelo: 'Brisa',
    versao: 'Life 1.0',
    ano: 2023,
    preco: 74900,
    km: 32600,
    cambio: 'Manual',
    combustivel: 'Flex',
    carroceria: 'Hatch',
    cor: 'Branco',
    status: 'disponivel',
    fotos: fotos('hatch-branco'),
    equipamentos: ['Ar-condicionado', 'Direção elétrica', 'Quatro airbags', 'Rodas de liga leve'],
    resumo: 'Hatch econômico para cidade, com manutenção simples e consumo baixo.',
  },
  {
    slug: 'aurora-sedan-black',
    marca: 'Vantre',
    modelo: 'Aurora',
    versao: 'Black Edition 1.4 Turbo',
    ano: 2025,
    preco: 146900,
    km: 6100,
    cambio: 'Automático',
    combustivel: 'Flex',
    carroceria: 'Sedan',
    cor: 'Grafite',
    status: 'reservado',
    fotos: fotos('sedan-grafite'),
    equipamentos: ['Acabamento escurecido', 'Bancos ventilados', 'Som premium', 'Câmera 360°'],
    resumo: 'Série especial com acabamento escurecido e itens de conforto adicionais.',
  },
  {
    slug: 'cordilheira-suv-black',
    marca: 'Meridia',
    modelo: 'Cordilheira',
    versao: 'Signature 2.0 Híbrido',
    ano: 2026,
    preco: 268900,
    km: 1800,
    cambio: 'Automático',
    combustivel: 'Híbrido',
    carroceria: 'SUV',
    cor: 'Preto',
    status: 'disponivel',
    destaque: true,
    fotos: fotos('suv-preto'),
    equipamentos: ['Motorização híbrida', 'Suspensão adaptativa', 'Head-up display', 'Frenagem automática', 'Carregador por indução'],
    resumo: 'Topo de linha híbrido, com consumo urbano baixo e pacote completo de assistências.',
  },
  {
    slug: 'brisa-hatch-sport',
    marca: 'Vantre',
    modelo: 'Brisa',
    versao: 'Sport 1.3 Turbo',
    ano: 2024,
    preco: 97500,
    km: 21300,
    cambio: 'Automático',
    combustivel: 'Flex',
    carroceria: 'Hatch',
    cor: 'Vermelho',
    status: 'vendido',
    fotos: fotos('hatch-vermelho'),
    equipamentos: ['Motor turbo', 'Suspensão esportiva', 'Volante multifuncional', 'Modo de condução Sport'],
    resumo: 'Hatch turbo com acerto esportivo. Exemplo de veículo já vendido no catálogo.',
  },
  {
    slug: 'aurora-sedan-azul',
    marca: 'Vantre',
    modelo: 'Aurora',
    versao: 'Comfort 1.6',
    ano: 2022,
    preco: 98900,
    km: 47800,
    cambio: 'Manual',
    combustivel: 'Flex',
    carroceria: 'Sedan',
    cor: 'Azul',
    status: 'disponivel',
    fotos: fotos('sedan-azul'),
    equipamentos: ['Central multimídia', 'Sensor de ré', 'Controle de estabilidade', 'Rodas 16"'],
    resumo: 'Opção de entrada do sedan, com quilometragem compatível com o ano.',
  },
  {
    slug: 'cordilheira-suv-prata',
    marca: 'Meridia',
    modelo: 'Cordilheira',
    versao: 'Urban 1.5 Turbo',
    ano: 2024,
    preco: 179900,
    km: 24500,
    cambio: 'Automático',
    combustivel: 'Flex',
    carroceria: 'SUV',
    cor: 'Prata',
    status: 'disponivel',
    fotos: fotos('suv-prata'),
    equipamentos: ['Piloto adaptativo', 'Porta-malas elétrico', 'Faróis LED', 'Carregador USB-C traseiro'],
    resumo: 'SUV compacto para uso urbano, com boa altura livre do solo.',
  },
]

export const marcas = Array.from(new Set(veiculos.map((v) => v.marca)))
export const modelosLista = Array.from(new Set(veiculos.map((v) => v.modelo)))
export const cambios = ['Automático', 'Manual'] as const

export const enderecoLinhaNorte = 'Rodovia Linha Norte, km 12 — Distrito Industrial (endereço fictício)'

export const horariosLinhaNorte = [
  { dia: 'Segunda a sexta', hora: '08h30 às 18h30' },
  { dia: 'Sábado', hora: '09h às 15h' },
  { dia: 'Domingo', hora: 'Somente com agendamento' },
]
