export type Area = {
  slug: string
  nome: string
  resumo: string
  descricao: string[]
  entregas: string[]
  paraQuem: string
}

export const areas: Area[] = [
  {
    slug: 'consultoria-empresarial',
    nome: 'Consultoria empresarial',
    resumo: 'Organização societária, contratos e rotinas administrativas de empresas em crescimento.',
    descricao: [
      'Acompanhamos empresas que cresceram mais rápido do que a sua estrutura interna. O trabalho começa pelo mapeamento de contratos, obrigações e responsabilidades em aberto.',
      'A partir do diagnóstico, organizamos documentos, revisamos modelos de contrato e definimos um calendário de obrigações para o ano.',
    ],
    entregas: [
      'Diagnóstico documental e societário',
      'Revisão de modelos de contrato',
      'Calendário de obrigações',
      'Reuniões periódicas de acompanhamento',
    ],
    paraQuem: 'Empresas de pequeno e médio porte com estrutura administrativa enxuta.',
  },
  {
    slug: 'contratos',
    nome: 'Contratos e negociações',
    resumo: 'Elaboração, revisão e negociação de contratos com clientes, fornecedores e parceiros.',
    descricao: [
      'Cada contrato é lido a partir do que a empresa realmente faz no dia a dia, e não de um modelo pronto guardado em pasta.',
      'A revisão aponta pontos de atenção, obrigações assumidas e prazos que costumam passar despercebidos.',
    ],
    entregas: [
      'Elaboração de contratos sob medida',
      'Parecer de revisão com pontos de atenção',
      'Apoio em negociações',
      'Versões comentadas para a equipe interna',
    ],
    paraQuem: 'Empresas que fecham contratos recorrentes e querem padronizar condições.',
  },
  {
    slug: 'compliance',
    nome: 'Conformidade e LGPD',
    resumo: 'Adequação de processos internos ao tratamento de dados pessoais e a políticas internas.',
    descricao: [
      'O trabalho mapeia quais dados a empresa coleta, onde ficam armazenados e quem tem acesso a eles.',
      'Com o mapa pronto, definimos políticas, avisos e rotinas possíveis de manter no dia a dia da equipe.',
    ],
    entregas: [
      'Mapeamento de dados pessoais',
      'Política de privacidade e avisos',
      'Treinamento breve da equipe',
      'Plano de resposta a incidentes',
    ],
    paraQuem: 'Negócios que lidam com cadastros, pagamentos ou dados de clientes.',
  },
  {
    slug: 'planejamento',
    nome: 'Planejamento e sucessão',
    resumo: 'Estruturação patrimonial e organização de sucessão familiar em empresas.',
    descricao: [
      'Reunimos a documentação da família e da empresa para entender o cenário atual antes de propor qualquer estrutura.',
      'As alternativas são apresentadas com custos, prazos e efeitos práticos, para que a decisão seja da família.',
    ],
    entregas: [
      'Levantamento patrimonial e documental',
      'Cenários de estruturação',
      'Acompanhamento de formalização',
      'Reuniões com a família',
    ],
    paraQuem: 'Empresas familiares e grupos que planejam a transição entre gerações.',
  },
]

export const equipe = [
  {
    nome: 'Helena Corvo',
    funcao: 'Sócia — consultoria empresarial',
    formacao: 'Pós-graduada em direito empresarial',
    foto: '/img/aurea-equipe-1.webp',
    alt: 'Ilustração de integrante fictícia da equipe',
  },
  {
    nome: 'Bruno Sartori',
    funcao: 'Sócio — contratos',
    formacao: 'Mestre em direito civil',
    foto: '/img/aurea-equipe-2.webp',
    alt: 'Ilustração de integrante fictício da equipe',
  },
  {
    nome: 'Marina Duarte',
    funcao: 'Coordenadora — conformidade e LGPD',
    formacao: 'Especialista em proteção de dados',
    foto: '/img/aurea-equipe-3.webp',
    alt: 'Ilustração de integrante fictícia da equipe',
  },
  {
    nome: 'Caio Ferraz',
    funcao: 'Consultor — planejamento patrimonial',
    formacao: 'Especialista em planejamento sucessório',
    foto: '/img/aurea-equipe-4.webp',
    alt: 'Ilustração de integrante fictício da equipe',
  },
]

export type Artigo = {
  slug: string
  titulo: string
  resumo: string
  data: string
  leitura: string
  capa: string
  paragrafos: string[]
}

export const artigos: Artigo[] = [
  {
    slug: 'contratos-que-envelhecem-mal',
    titulo: 'Contratos que envelhecem mal',
    resumo: 'Por que revisar modelos antigos costuma evitar discussões que ainda nem começaram.',
    data: '2026-04-18',
    leitura: '4 min de leitura',
    capa: '/img/aurea-artigo-1.webp',
    paragrafos: [
      'Modelos de contrato guardados há anos costumam refletir uma empresa que não existe mais: outro porte, outro produto, outra forma de cobrar.',
      'Uma revisão periódica ajusta prazos, formas de reajuste e responsabilidades ao funcionamento atual do negócio, reduzindo pontos de dúvida.',
      'Este conteúdo é informativo e não substitui a análise de um caso concreto.',
    ],
  },
  {
    slug: 'lgpd-na-rotina-da-equipe',
    titulo: 'LGPD na rotina da equipe',
    resumo: 'Como transformar política de privacidade em prática diária sem travar o atendimento.',
    data: '2026-03-02',
    leitura: '5 min de leitura',
    capa: '/img/aurea-artigo-2.webp',
    paragrafos: [
      'A maior parte dos incidentes de dados começa em rotinas simples: uma planilha compartilhada por link aberto, um grupo de mensagens com cadastros de clientes.',
      'Políticas funcionam quando descrevem o que a equipe já faz, com pequenos ajustes possíveis de manter, e não um procedimento ideal que ninguém segue.',
      'Este conteúdo é informativo e não substitui a análise de um caso concreto.',
    ],
  },
  {
    slug: 'sucessao-sem-surpresa',
    titulo: 'Sucessão sem surpresa',
    resumo: 'O que costuma travar a transição entre gerações em empresas familiares.',
    data: '2026-01-20',
    leitura: '6 min de leitura',
    capa: '/img/aurea-artigo-3.webp',
    paragrafos: [
      'Transições complicam menos quando a documentação está organizada e as expectativas foram conversadas antes da urgência aparecer.',
      'Reunir certidões, contratos sociais e registros patrimoniais é um trabalho pouco glamouroso, mas é o que permite avaliar alternativas com clareza.',
      'Este conteúdo é informativo e não substitui a análise de um caso concreto.',
    ],
  },
]

export const faqAurea = [
  {
    p: 'Como funciona o primeiro atendimento?',
    r: 'O primeiro contato é uma conversa de diagnóstico, sem custo, para entender a demanda e verificar se o escritório é o interlocutor adequado.',
  },
  {
    p: 'Vocês atendem fora da cidade?',
    r: 'Sim. Boa parte das reuniões acontece por videoconferência, com documentos trocados por canal seguro.',
  },
  {
    p: 'Como são cobrados os honorários?',
    r: 'Depende do escopo: valor fixo por projeto, mensalidade para acompanhamento contínuo ou por hora técnica. A proposta é apresentada por escrito antes do início.',
  },
  {
    p: 'O escritório garante resultado?',
    r: 'Não. Nenhum resultado pode ser prometido. O compromisso é com diligência, informação clara sobre riscos e acompanhamento do andamento.',
  },
  {
    p: 'Como os documentos enviados são tratados?',
    r: 'Os documentos são usados apenas para a análise solicitada, com acesso restrito à equipe responsável, conforme a política de privacidade.',
  },
]

export const enderecoAurea = 'Alameda das Palmeiras, 180 — conjunto 74 (endereço fictício)'
