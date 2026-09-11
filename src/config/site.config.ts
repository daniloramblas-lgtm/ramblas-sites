/**
 * ARQUIVO CENTRAL DE CONFIGURAÇÃO
 * ------------------------------------------------------------------
 * Praticamente tudo que muda de um cliente para outro está aqui:
 * contato, WhatsApp, preços dos planos, lista de serviços, FAQ e
 * textos institucionais. Edite este arquivo e o site inteiro muda.
 */

export const contato = {
  marca: 'Ramblas Sites',
  /** Somente números, com DDI 55. Ex.: 5511999999999 */
  whatsapp: '5511982663117',
  /** Como o número aparece escrito na tela. */
  whatsappExibicao: '(11) 98266-3117',
  email: 'daniloramblas@gmail.com',
  linkedin: 'https://linkedin.com/in/daniloramblas',
  instagram: '',
  cidade: 'São Paulo, SP',
  atendimento: 'Atendimento remoto para todo o Brasil',
  site: 'https://ramblassites.netlify.app',
} as const

/** Mensagem padrão do botão flutuante e dos CTAs simples. */
export const mensagemPadrao =
  'Olá! Vim pelo site da Ramblas Sites e gostaria de um orçamento.'

export const navegacao = [
  { rotulo: 'Início', href: '/' },
  { rotulo: 'Modelos', href: '/modelos' },
  { rotulo: 'Serviços', href: '/#servicos' },
  { rotulo: 'Como funciona', href: '/#como-funciona' },
  { rotulo: 'Planos', href: '/#planos' },
  { rotulo: 'Contato', href: '/#contato' },
]

export const hero = {
  titulo: 'Seu negócio merece um site que também trabalhe por você.',
  texto:
    'Criamos sites profissionais, catálogos, agendamentos e sistemas sob medida para transformar visitas em atendimentos e vendas.',
  botaoPrimario: 'Conhecer os modelos',
  botaoSecundario: 'Falar pelo WhatsApp',
}

export const beneficios = [
  {
    titulo: 'Visual profissional',
    texto:
      'Layout desenhado para o seu segmento, com tipografia, cores e fotos que passam credibilidade desde o primeiro segundo.',
  },
  {
    titulo: 'Experiência perfeita no celular',
    texto:
      'A maior parte das visitas chega pelo telefone. Cada tela é construída primeiro para o celular e depois ampliada para o computador.',
  },
  {
    titulo: 'Integração com WhatsApp',
    texto:
      'Pedidos, agendamentos e formulários chegam prontos na sua conversa, já organizados, sem precisar de retrabalho.',
  },
  {
    titulo: 'Sistemas adaptados à rotina do negócio',
    texto:
      'Cardápio, agenda, estoque ou painel administrativo: o sistema acompanha o jeito que a sua equipe já trabalha.',
  },
]

export const servicos = [
  { nome: 'Landing pages', texto: 'Uma página focada em uma única ação: pedir orçamento, agendar ou comprar.' },
  { nome: 'Sites institucionais', texto: 'Apresentação da empresa, serviços, equipe e canais de contato.' },
  { nome: 'Catálogos e cardápios', texto: 'Produtos organizados por categoria, com busca, filtros e envio do pedido.' },
  { nome: 'Agendamentos', texto: 'Escolha de serviço, profissional, data e horário com confirmação automática.' },
  { nome: 'Lojas e pedidos online', texto: 'Carrinho, cálculo de valores e fechamento por WhatsApp ou pagamento online.' },
  { nome: 'Painéis administrativos', texto: 'Área interna para editar preços, produtos, horários e conteúdos sem depender de ninguém.' },
  { nome: 'Automações de atendimento', texto: 'Mensagens automáticas, lembretes e respostas para as dúvidas mais frequentes.' },
  { nome: 'Integrações com WhatsApp', texto: 'Do botão flutuante ao envio estruturado de pedidos e cadastros.' },
  { nome: 'Domínio, hospedagem e e-mail profissional', texto: 'Registro do domínio, publicação e e-mail com o nome da sua empresa.' },
  { nome: 'SEO, Analytics e Search Console', texto: 'Configuração para o site ser encontrado e para você acompanhar as visitas.' },
  { nome: 'Manutenção e atualização', texto: 'Ajustes de conteúdo, correções e evolução do site depois da publicação.' },
]

export const etapas = [
  {
    titulo: 'Entendimento do negócio',
    texto:
      'Conversamos sobre o que a empresa faz, quem procura, o que trava o atendimento hoje e qual resultado o site precisa entregar.',
  },
  {
    titulo: 'Escolha do modelo e funcionalidades',
    texto:
      'Você escolhe um dos modelos como ponto de partida e definimos juntos as funcionalidades que entram no projeto.',
  },
  {
    titulo: 'Personalização e desenvolvimento',
    texto:
      'Adaptamos identidade visual, textos, fotos e regras de funcionamento. Você acompanha o andamento por um link de pré-visualização.',
  },
  {
    titulo: 'Revisão, publicação e suporte',
    texto:
      'Revisamos juntos, publicamos com domínio próprio e acompanhamos os primeiros dias no ar.',
  },
]

/**
 * PREÇOS
 * Substitua os valores abaixo pelos seus. Se preferir não exibir valor,
 * deixe `apartirDe` vazio ('') que o card mostra "Sob consulta".
 */
export const planos = [
  {
    nome: 'Essencial',
    apartirDe: '',
    resumo: 'Uma página completa para quem precisa estar no ar rápido e bem apresentado.',
    itens: [
      'Landing page',
      'Design responsivo',
      'Botão de WhatsApp',
      'Formulário de contato',
      'SEO básico',
    ],
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

export const faq = [
  {
    p: 'Posso usar um modelo como ponto de partida?',
    r: 'Sim. Os modelos existem para acelerar a conversa. A partir deles ajustamos cores, textos, fotos, seções e funcionalidades para a sua empresa.',
  },
  {
    p: 'O site funciona no celular?',
    r: 'Sim. Todo projeto é construído primeiro para telas pequenas e testado em celular, tablet e computador antes da publicação.',
  },
  {
    p: 'Vocês registram o domínio?',
    r: 'Cuidamos do registro e da configuração do domínio. O registro fica no seu nome, com custo anual pago diretamente ao registrador.',
  },
  {
    p: 'Posso alterar textos e imagens?',
    r: 'Sim. Nos planos com painel administrativo você mesmo edita. Nos demais, as alterações entram no serviço de manutenção.',
  },
  {
    p: 'É possível ter painel administrativo?',
    r: 'Sim, no plano Sob Medida. O painel permite cadastrar produtos, preços, horários, veículos ou conteúdos, com login e permissões.',
  },
  {
    p: 'O cardápio ou catálogo pode ser atualizado?',
    r: 'Pode. Com painel, a atualização é feita por você a qualquer momento. Sem painel, os itens ficam em um arquivo de configuração que atualizamos a pedido.',
  },
  {
    p: 'O agendamento é realmente funcional?',
    r: 'Nas demonstrações deste site o agendamento é apenas ilustrativo e termina no WhatsApp. Em um projeto contratado ele grava em banco de dados, bloqueia horários ocupados e envia lembretes.',
  },
  {
    p: 'O site pode ser integrado ao WhatsApp?',
    r: 'Sim. O formato mais simples monta a mensagem pronta e abre a conversa. Também é possível usar a API oficial para respostas e lembretes automáticos.',
  },
  {
    p: 'Qual é o prazo de entrega?',
    r: 'Uma landing page costuma levar de 5 a 10 dias. Sites com catálogo ou agenda, de 2 a 4 semanas. Sistemas sob medida dependem do escopo e são estimados no orçamento.',
  },
  {
    p: 'Existe manutenção mensal?',
    r: 'É opcional. Inclui hospedagem monitorada, backups, pequenos ajustes de conteúdo e atualizações de segurança.',
  },
]

export const conversao = {
  titulo: 'Vamos transformar sua ideia em um site que realmente ajuda o seu negócio?',
  texto:
    'Preencha os campos abaixo. A mensagem é montada organizada e abre direto na conversa do WhatsApp — você só confere e envia.',
}

/** Funcionalidades oferecidas no formulário de orçamento. */
export const funcionalidadesDesejadas = [
  'Catálogo ou cardápio',
  'Carrinho e pedidos',
  'Agendamento online',
  'Painel administrativo',
  'Formulários e cadastros',
  'Blog ou área de conteúdo',
  'Integração com WhatsApp',
  'Domínio e e-mail profissional',
]

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

export const avisoDemonstrativo =
  'Projeto demonstrativo — empresa fictícia criada para apresentar possibilidades. Imagens ilustrativas criadas com IA.'
