/**
 * ARQUIVO CENTRAL DE CONFIGURAÇÃO
 * ------------------------------------------------------------------
 * Praticamente tudo que muda de um cliente para outro está aqui:
 * contato, WhatsApp, preços dos planos, serviços, FAQ, apresentação
 * pessoal e textos institucionais. Edite este arquivo e o site muda.
 */

export const contato = {
  marca: 'Ramblas Sites',
  /** Somente números, com DDI 55. Ex.: 5511999999999 */
  whatsapp: '5511982663117',
  /** Como o número aparece escrito na tela. */
  whatsappExibicao: '(11) 98266-3117',
  email: 'daniloramblas@gmail.com',
  linkedin: 'https://linkedin.com/in/daniloramblas',
  portfolio: 'https://daniloramblas.netlify.app/',
  instagram: '',
  cidade: 'São Paulo, SP',
  atendimento: 'Atendimento remoto para todo o Brasil',
  /** Trocar assim que houver domínio próprio (ver README, item "Domínio"). */
  site: 'https://ramblassites.netlify.app',
} as const

export const mensagemPadrao =
  'Olá! Vim pelo site da Ramblas Sites e gostaria de um orçamento.'

export const navegacao = [
  { rotulo: 'Início', href: '/' },
  { rotulo: 'Modelos', href: '/modelos' },
  { rotulo: 'Serviços', href: '/#servicos' },
  { rotulo: 'Como funciona', href: '/#como-funciona' },
  { rotulo: 'Quem faz', href: '/#quem-faz' },
  { rotulo: 'Planos', href: '/#planos' },
  { rotulo: 'Contato', href: '/#contato' },
]

export const hero = {
  titulo: 'Seu negócio merece um site que também trabalhe por você.',
  texto:
    'Criamos sites profissionais, catálogos, agendamentos e sistemas sob medida para transformar visitas em atendimentos e vendas.',
  botaoPrimario: 'Conhecer os modelos',
  botaoSecundario: 'Falar pelo WhatsApp',
  /** Benefícios resumidos dentro do hero, no lugar de uma seção inteira. */
  pontos: ['Visual profissional', 'Perfeito no celular', 'Integrado ao WhatsApp', 'Sistemas sob medida'],
}

export const servicos = [
  {
    nome: 'Sites e landing pages',
    texto: 'De uma página focada em conversão ao site institucional completo da empresa.',
    destaque: true,
  },
  {
    nome: 'Catálogos e cardápios',
    texto: 'Produtos por categoria, com busca, filtros e envio do pedido já formatado.',
    destaque: true,
  },
  {
    nome: 'Agendamentos',
    texto: 'Serviço, profissional, data e horário, com confirmação e lembretes.',
    destaque: true,
  },
  {
    nome: 'Lojas e pedidos online',
    texto: 'Carrinho, cálculo de valores e fechamento por WhatsApp ou pagamento online.',
    destaque: true,
  },
  {
    nome: 'Painéis administrativos',
    texto: 'Área interna para editar preços, produtos, horários e conteúdos sem depender de ninguém.',
    destaque: true,
  },
  {
    nome: 'Automações e integrações',
    texto: 'Mensagens automáticas, lembretes e conexão do site com o WhatsApp e outros sistemas.',
    destaque: true,
  },
  { nome: 'Domínio, hospedagem e e-mail profissional', texto: 'Registro, publicação e e-mail com o nome da empresa.' },
  { nome: 'SEO, Analytics e Search Console', texto: 'Configuração para ser encontrado e para acompanhar as visitas.' },
  { nome: 'Manutenção e atualização', texto: 'Ajustes de conteúdo, correções e evolução depois da publicação.' },
]

export const etapas = [
  { titulo: 'Entendimento', texto: 'O que a empresa faz, quem procura e o que trava o atendimento hoje.' },
  { titulo: 'Escolha do modelo', texto: 'Um dos modelos vira ponto de partida e definimos as funcionalidades.' },
  { titulo: 'Personalização', texto: 'Identidade, textos, fotos e regras, com link de pré-visualização.' },
  { titulo: 'Publicação', texto: 'Revisão em conjunto, domínio próprio e acompanhamento no ar.' },
]

/**
 * QUEM FAZ — somente fatos conferidos. Não acrescente clientes,
 * resultados ou tempo de experiência que não existam.
 */
export const quemFaz = {
  nome: 'Danilo Ramblas',
  papel: 'Desenvolvedor dos projetos e responsável pelo atendimento',
  /**
   * Coloque uma foto sua em /public/img (ex.: '/img/danilo.webp').
   * Enquanto estiver vazio, o site mostra um monograma — nunca uma
   * foto genérica de banco de imagens.
   */
  foto: '',
  apresentacao: [
    'Estudante de Direito na Universidade São Judas Tadeu, com conclusão prevista para 2029, e estagiário jurídico em São Paulo. Atuo com Direito Médico, Cível e Criminal e cuido da administração do sistema de gestão documental do escritório.',
    'Foi nessa rotina que comecei a programar: criei ferramentas próprias para gerar procurações automaticamente, organizar bancos de dados de clientes e montar documentos em lote, integrando planilhas e automações ao dia a dia da equipe.',
  ],
  pontos: [
    'Experiência em escritórios de Direito Público, Previdenciário, Médico, Cível e Criminal',
    'Automação de documentos, bancos de dados e integrações com planilhas',
    'Administração de sistema de gestão documental em escritório',
    'Projetos autorais de automação jurídica (Ramblas Legal)',
  ],
  comoConduz:
    'O projeto é conduzido diretamente comigo, do primeiro contato à publicação: sem intermediário, com prazos combinados por escrito e um link de pré-visualização acompanhando cada etapa.',
  aviso:
    'A Ramblas Sites está começando. Os quatro modelos deste site são estudos de caso conceituais, criados por mim para mostrar o que consigo construir — não são clientes, e não apresento números ou depoimentos que ainda não existem.',
}

/**
 * PREÇOS
 * Deixe `apartirDe` vazio ('') para exibir "Sob consulta".
 * Se publicar valores, ajuste também `planosIntro`.
 */
export const planos = [
  {
    nome: 'Essencial',
    apartirDe: '',
    resumo: 'Uma página completa para quem precisa estar no ar rápido e bem apresentado.',
    itens: ['Landing page', 'Design responsivo', 'Botão de WhatsApp', 'Formulário de contato', 'SEO básico'],
    destaque: false,
  },
  {
    nome: 'Profissional',
    apartirDe: '',
    resumo: 'Site completo com a funcionalidade principal do seu negócio já incluída.',
    itens: [
      'Site com até cinco páginas',
      'Catálogo, cardápio ou agendamento',
      'Analytics configurado',
      'Personalização completa de identidade',
      'Integração com WhatsApp',
    ],
    destaque: true,
  },
  {
    nome: 'Sob Medida',
    apartirDe: '',
    resumo: 'Para quem precisa de sistema próprio, banco de dados e processos automatizados.',
    itens: [
      'Painel administrativo',
      'Banco de dados',
      'Integrações com outros sistemas',
      'Automação de processos',
      'Escopo definido em conjunto',
    ],
    destaque: false,
  },
]

export const planosIntro =
  'Todos os projetos são orçados após uma conversa rápida sobre páginas, funcionalidades e conteúdo.'

/** FAQ compacto na home; os detalhes ficam nas páginas dos modelos. */
export const faq = [
  {
    p: 'Posso usar um modelo como ponto de partida?',
    r: 'Sim. Os modelos existem para acelerar a conversa. A partir deles ajustamos cores, textos, fotos, seções e funcionalidades para a sua empresa.',
  },
  {
    p: 'Qual é o prazo de entrega?',
    r: 'Uma landing page costuma levar de 5 a 10 dias. Sites com catálogo ou agenda, de 2 a 4 semanas. Sistemas sob medida dependem do escopo e são estimados no orçamento.',
  },
  {
    p: 'Consigo editar textos, preços e produtos depois?',
    r: 'Com painel administrativo (plano Sob Medida), você mesmo edita. Sem painel, os conteúdos ficam em um arquivo de configuração que atualizo a pedido, dentro da manutenção.',
  },
  {
    p: 'O agendamento e o carrinho funcionam de verdade?',
    r: 'Nas demonstrações deste site eles funcionam no navegador e terminam no WhatsApp, sem gravar nada. Em um projeto contratado, passam a gravar em banco de dados, bloquear horários e enviar lembretes.',
  },
  {
    p: 'Vocês cuidam de domínio, hospedagem e e-mail?',
    r: 'Sim. Faço o registro e a configuração; o domínio fica no seu nome, com a taxa anual paga diretamente ao registrador.',
  },
]

export const conversao = {
  titulo: 'Vamos transformar sua ideia em um site que realmente ajuda o seu negócio?',
  texto: 'Quatro campos e a mensagem vai pronta para o WhatsApp — você só confere e envia.',
}

export const segmentosFormulario = [
  'Alimentação',
  'Beleza e bem-estar',
  'Escritórios e serviços profissionais',
  'Automóveis',
  'Comércio e varejo',
  'Saúde',
  'Educação',
  'Outro',
]

export const avisoPrivacidadeCurto =
  'Ao continuar, você concorda com o uso dos dados enviados para responder ao seu contato.'

export const avisoDemonstrativo =
  'Projeto demonstrativo — empresa fictícia criada para apresentar possibilidades.'
