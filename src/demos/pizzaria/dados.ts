export type CategoriaProduto = 'pizzas' | 'bebidas' | 'sobremesas' | 'combos'

export type Tamanho = { id: string; nome: string; fatias: string; preco: number }

export type Produto = {
  id: string
  nome: string
  categoria: CategoriaProduto
  descricao: string
  imagem: string
  alt: string
  /** Produtos com tamanho (pizzas). Quando ausente, usa `preco`. */
  tamanhos?: Tamanho[]
  preco?: number
  destaque?: boolean
  vegetariana?: boolean
}

export const adicionais = [
  { id: 'borda-catupiry', nome: 'Borda recheada de catupiry', preco: 9 },
  { id: 'borda-cheddar', nome: 'Borda recheada de cheddar', preco: 9 },
  { id: 'extra-queijo', nome: 'Queijo extra', preco: 7 },
  { id: 'extra-bacon', nome: 'Bacon', preco: 8 },
  { id: 'sem-cebola', nome: 'Sem cebola', preco: 0 },
  { id: 'azeite-ervas', nome: 'Azeite de ervas da casa', preco: 4 },
]

const tamanhosPadrao = (p: number): Tamanho[] => [
  { id: 'broto', nome: 'Broto', fatias: '4 fatias', preco: p - 18 },
  { id: 'media', nome: 'Média', fatias: '6 fatias', preco: p },
  { id: 'grande', nome: 'Grande', fatias: '8 fatias', preco: p + 14 },
  { id: 'familia', nome: 'Família', fatias: '12 fatias', preco: p + 28 },
]

export const produtos: Produto[] = [
  {
    id: 'margherita',
    nome: 'Margherita',
    categoria: 'pizzas',
    descricao: 'Molho de tomate italiano, muçarela de búfala, manjericão fresco e azeite.',
    imagem: '/img/pizza-margherita.webp',
    alt: 'Ilustração de pizza margherita vista de cima',
    tamanhos: tamanhosPadrao(59),
    destaque: true,
    vegetariana: true,
  },
  {
    id: 'calabresa',
    nome: 'Calabresa artesanal',
    categoria: 'pizzas',
    descricao: 'Calabresa curada em fatia grossa, cebola roxa e orégano da serra.',
    imagem: '/img/pizza-calabresa.webp',
    alt: 'Ilustração de pizza de calabresa vista de cima',
    tamanhos: tamanhosPadrao(57),
    destaque: true,
  },
  {
    id: 'portuguesa',
    nome: 'Portuguesa',
    categoria: 'pizzas',
    descricao: 'Presunto, ovo, cebola, ervilha, azeitona e muçarela.',
    imagem: '/img/pizza-portuguesa.webp',
    alt: 'Ilustração de pizza portuguesa vista de cima',
    tamanhos: tamanhosPadrao(62),
  },
  {
    id: 'quatro-queijos',
    nome: 'Quatro queijos',
    categoria: 'pizzas',
    descricao: 'Muçarela, gorgonzola, parmesão e catupiry, finalizada com nozes.',
    imagem: '/img/pizza-quatro-queijos.webp',
    alt: 'Ilustração de pizza de quatro queijos vista de cima',
    tamanhos: tamanhosPadrao(66),
    vegetariana: true,
  },
  {
    id: 'frango-catupiry',
    nome: 'Frango com catupiry',
    categoria: 'pizzas',
    descricao: 'Frango desfiado temperado, catupiry cremoso e milho.',
    imagem: '/img/pizza-frango-catupiry.webp',
    alt: 'Ilustração de pizza de frango com catupiry vista de cima',
    tamanhos: tamanhosPadrao(61),
  },
  {
    id: 'pepperoni',
    nome: 'Pepperoni',
    categoria: 'pizzas',
    descricao: 'Fatias generosas de pepperoni sobre muçarela e molho levemente picante.',
    imagem: '/img/pizza-pepperoni.webp',
    alt: 'Ilustração de pizza de pepperoni vista de cima',
    tamanhos: tamanhosPadrao(64),
    destaque: true,
  },
  {
    id: 'vegetariana',
    nome: 'Horta da casa',
    categoria: 'pizzas',
    descricao: 'Abobrinha, berinjela, tomate confitado, rúcula e muçarela.',
    imagem: '/img/pizza-vegetariana.webp',
    alt: 'Ilustração de pizza vegetariana vista de cima',
    tamanhos: tamanhosPadrao(60),
    vegetariana: true,
  },
  {
    id: 'doce-chocolate',
    nome: 'Chocolate com morango',
    categoria: 'pizzas',
    descricao: 'Chocolate meio amargo derretido, morangos frescos e raspas de laranja.',
    imagem: '/img/pizza-doce-chocolate.webp',
    alt: 'Ilustração de pizza doce de chocolate vista de cima',
    tamanhos: tamanhosPadrao(58),
    vegetariana: true,
  },

  {
    id: 'refrigerante',
    nome: 'Refrigerante 2 litros',
    categoria: 'bebidas',
    descricao: 'Cola, guaraná ou limão. Escolha o sabor na observação do pedido.',
    imagem: '/img/bebida-refrigerante.webp',
    alt: 'Ilustração de copo com refrigerante',
    preco: 14,
  },
  {
    id: 'suco',
    nome: 'Suco natural 500 ml',
    categoria: 'bebidas',
    descricao: 'Laranja, maracujá ou abacaxi com hortelã, feito na hora.',
    imagem: '/img/bebida-suco.webp',
    alt: 'Ilustração de copo com suco natural',
    preco: 12,
  },
  {
    id: 'cerveja',
    nome: 'Cerveja artesanal 600 ml',
    categoria: 'bebidas',
    descricao: 'Pilsen ou IPA de produtor local, servida gelada.',
    imagem: '/img/bebida-cerveja.webp',
    alt: 'Ilustração de copo de cerveja com colarinho',
    preco: 22,
  },
  {
    id: 'agua',
    nome: 'Água mineral 500 ml',
    categoria: 'bebidas',
    descricao: 'Com ou sem gás.',
    imagem: '/img/bebida-agua.webp',
    alt: 'Ilustração de copo de água',
    preco: 6,
  },

  {
    id: 'brownie',
    nome: 'Brownie com doce de leite',
    categoria: 'sobremesas',
    descricao: 'Brownie morno de chocolate 70% com doce de leite argentino.',
    imagem: '/img/sobremesa-brownie.webp',
    alt: 'Ilustração de brownie com cobertura',
    preco: 19,
  },
  {
    id: 'petit-gateau',
    nome: 'Petit gâteau',
    categoria: 'sobremesas',
    descricao: 'Bolo quente de chocolate com sorvete de creme.',
    imagem: '/img/sobremesa-petit.webp',
    alt: 'Ilustração de sobremesa com cobertura clara',
    preco: 24,
  },

  {
    id: 'combo-dupla',
    nome: 'Combo Dupla',
    categoria: 'combos',
    descricao: 'Uma pizza grande de até dois sabores e um refrigerante de 2 litros.',
    imagem: '/img/pizza-calabresa.webp',
    alt: 'Ilustração de pizza que compõe o combo para duas pessoas',
    preco: 89,
    destaque: true,
  },
  {
    id: 'combo-familia',
    nome: 'Combo Família',
    categoria: 'combos',
    descricao: 'Duas pizzas família, um refrigerante de 2 litros e um brownie.',
    imagem: '/img/pizza-portuguesa.webp',
    alt: 'Ilustração de pizza que compõe o combo família',
    preco: 179,
  },
  {
    id: 'combo-doce',
    nome: 'Combo Doce Fim',
    categoria: 'combos',
    descricao: 'Pizza média salgada, pizza broto doce e dois sucos.',
    imagem: '/img/pizza-doce-chocolate.webp',
    alt: 'Ilustração de pizza doce que compõe o combo',
    preco: 119,
  },
]

export const categoriasCardapio: { id: CategoriaProduto | 'todos'; rotulo: string }[] = [
  { id: 'todos', rotulo: 'Tudo' },
  { id: 'pizzas', rotulo: 'Pizzas' },
  { id: 'bebidas', rotulo: 'Bebidas' },
  { id: 'sobremesas', rotulo: 'Sobremesas' },
  { id: 'combos', rotulo: 'Combos' },
]

export const bairros = [
  { nome: 'Vila Aurora', taxa: 8 },
  { nome: 'Jardim Bandeirantes', taxa: 10 },
  { nome: 'Centro', taxa: 6 },
  { nome: 'Parque das Oliveiras', taxa: 12 },
  { nome: 'Bairro Alto', taxa: 14 },
]

export const horarios = [
  { dia: 'Terça a quinta', hora: '18h às 23h' },
  { dia: 'Sexta e sábado', hora: '18h às 00h30' },
  { dia: 'Domingo', hora: '18h às 23h' },
  { dia: 'Segunda', hora: 'Fechado' },
]

export const avaliacoes = [
  {
    nome: 'Comentário ilustrativo 1',
    texto: 'A massa fica leve e a borda vem bem assada. Pedido chegou no tempo combinado.',
    nota: 5,
  },
  {
    nome: 'Comentário ilustrativo 2',
    texto: 'Cardápio fácil de usar no celular e o pedido chegou certinho no WhatsApp.',
    nota: 5,
  },
  {
    nome: 'Comentário ilustrativo 3',
    texto: 'A doce de chocolate com morango virou tradição de domingo aqui em casa.',
    nota: 4,
  },
]

export const enderecoPizzaria = 'Rua das Oliveiras, 27 — Vila Aurora (endereço fictício)'
