export type Servico = {
  id: string
  nome: string
  categoria: 'Corte' | 'Barba' | 'Acabamento' | 'Combo'
  descricao: string
  duracao: number
  preco: number
}

export type Profissional = {
  id: string
  nome: string
  funcao: string
  foto: string
  alt: string
  /** 0 = domingo … 6 = sábado */
  dias: number[]
  especialidades: string[]
}

export const servicos: Servico[] = [
  {
    id: 'corte-social',
    nome: 'Corte social',
    categoria: 'Corte',
    descricao: 'Tesoura e máquina, com finalização e styling leve.',
    duracao: 45,
    preco: 65,
  },
  {
    id: 'corte-degrade',
    nome: 'Corte degradê',
    categoria: 'Corte',
    descricao: 'Transição trabalhada na máquina, com contorno na navalha.',
    duracao: 50,
    preco: 75,
  },
  {
    id: 'corte-infantil',
    nome: 'Corte infantil',
    categoria: 'Corte',
    descricao: 'Atendimento tranquilo para crianças até 10 anos.',
    duracao: 40,
    preco: 55,
  },
  {
    id: 'barba-terapia',
    nome: 'Barboterapia',
    categoria: 'Barba',
    descricao: 'Toalha quente, óleo, navalha e balm calmante.',
    duracao: 40,
    preco: 60,
  },
  {
    id: 'barba-desenhada',
    nome: 'Barba desenhada',
    categoria: 'Barba',
    descricao: 'Alinhamento de contornos com navalha e hidratação.',
    duracao: 30,
    preco: 45,
  },
  {
    id: 'pezinho',
    nome: 'Pezinho e contorno',
    categoria: 'Acabamento',
    descricao: 'Manutenção rápida entre um corte e outro.',
    duracao: 20,
    preco: 25,
  },
  {
    id: 'sobrancelha',
    nome: 'Sobrancelha na navalha',
    categoria: 'Acabamento',
    descricao: 'Limpeza e alinhamento sem tirar o traço natural.',
    duracao: 15,
    preco: 20,
  },
  {
    id: 'combo-classico',
    nome: 'Combo clássico',
    categoria: 'Combo',
    descricao: 'Corte social + barba desenhada.',
    duracao: 70,
    preco: 99,
  },
  {
    id: 'combo-completo',
    nome: 'Combo completo',
    categoria: 'Combo',
    descricao: 'Corte degradê + barboterapia + sobrancelha.',
    duracao: 95,
    preco: 139,
  },
]

export const profissionais: Profissional[] = [
  {
    id: 'rafa',
    nome: 'Rafa Menezes',
    funcao: 'Barbeiro-chefe',
    foto: '/img/barbeiro-1.webp',
    alt: 'Ilustração de barbeiro da equipe fictícia',
    dias: [2, 3, 4, 5, 6],
    especialidades: ['Degradê', 'Navalha'],
  },
  {
    id: 'nico',
    nome: 'Nico Arruda',
    funcao: 'Barbeiro',
    foto: '/img/barbeiro-2.webp',
    alt: 'Ilustração de barbeiro da equipe fictícia',
    dias: [1, 2, 3, 4, 5],
    especialidades: ['Barboterapia', 'Corte social'],
  },
  {
    id: 'tom',
    nome: 'Tom Vilela',
    funcao: 'Barbeiro',
    foto: '/img/barbeiro-3.webp',
    alt: 'Ilustração de barbeiro da equipe fictícia',
    dias: [3, 4, 5, 6],
    especialidades: ['Infantil', 'Acabamentos'],
  },
]

export const galeria = Array.from({ length: 6 }, (_, i) => ({
  src: `/img/barbearia-galeria-${i + 1}.webp`,
  alt: `Ilustração de ambiente e trabalho da barbearia, imagem ${i + 1}`,
}))

export const planos = [
  {
    nome: 'Clube Básico',
    preco: 129,
    itens: ['2 cortes por mês', '10% de desconto em produtos', 'Agendamento prioritário'],
  },
  {
    nome: 'Clube Completo',
    preco: 199,
    itens: ['4 cortes por mês', '2 barbas por mês', 'Sobrancelha inclusa', 'Horário fixo reservado'],
    destaque: true,
  },
  {
    nome: 'Clube Pai e Filho',
    preco: 239,
    itens: ['4 cortes adulto', '2 cortes infantil', 'Desconto em combos'],
  },
]

export const horariosBarbearia = [
  { dia: 'Segunda', hora: 'Fechado' },
  { dia: 'Terça a sexta', hora: '09h às 20h' },
  { dia: 'Sábado', hora: '09h às 18h' },
  { dia: 'Domingo', hora: 'Fechado' },
]

export const enderecoBarbearia = 'Avenida Distrito 13, 400 — Bairro Alto (endereço fictício)'
