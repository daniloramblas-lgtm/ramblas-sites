export type Categoria = 'alimentacao' | 'beleza' | 'escritorios' | 'automoveis'

export type Modelo = {
  slug: string
  nome: string
  segmento: string
  categoria: Categoria
  resumo: string
  /** Frase curta usada nos cards da galeria. */
  resumoCurto: string
  /** Estudo de caso conceitual: o problema do segmento e a resposta do modelo. */
  problema: string
  solucao: string
  capa: string
  alt: string
  funcionalidades: string[]
  rotaDemo: string
  indicadoPara: string[]
  personalizavel: string[]
  incluso: string[]
  integracoes: string[]
  prazo: string
  demonstrativo: string[]
}

export const categorias: { id: Categoria | 'todos'; rotulo: string }[] = [
  { id: 'todos', rotulo: 'Todos' },
  { id: 'alimentacao', rotulo: 'Alimentação' },
  { id: 'beleza', rotulo: 'Beleza' },
  { id: 'escritorios', rotulo: 'Escritórios' },
  { id: 'automoveis', rotulo: 'Automóveis' },
]

export const modelos: Modelo[] = [
  {
    slug: 'forno-27',
    problema: 'Pedidos chegam em mensagens soltas, com o cardápio reenviado em foto a cada conversa e o valor somado à mão — o que trava o atendimento justamente no horário de pico.',
    solucao: 'Um cardápio que sempre mostra o preço atual, deixa o cliente montar o pedido sozinho e entrega tudo somado, com endereço e forma de entrega, numa única mensagem organizada.',
    resumoCurto: 'Cardápio digital com carrinho que fecha o pedido no WhatsApp.',
    nome: 'Forno 27 Pizzaria',
    segmento: 'Pizzaria artesanal',
    categoria: 'alimentacao',
    resumo:
      'Cardápio digital com busca, escolha de tamanho, adicionais e carrinho que fecha o pedido direto na conversa do WhatsApp.',
    capa: '/img/capa-forno27.webp',
    alt: 'Composição gráfica em vermelho escuro e dourado representando uma pizzaria artesanal',
    funcionalidades: ['Cardápio por categoria', 'Busca de produtos', 'Carrinho e entrega', 'Pedido por WhatsApp'],
    rotaDemo: '/demonstracao/forno-27',
    indicadoPara: [
      'Pizzarias, hamburguerias e restaurantes com delivery próprio',
      'Cafeterias e docerias que vendem por encomenda',
      'Negócios que hoje recebem pedidos só por mensagem solta',
    ],
    personalizavel: [
      'Cores, tipografia, logo e fotos dos produtos',
      'Categorias, tamanhos, adicionais e regras de preço',
      'Taxas de entrega por bairro e valor mínimo do pedido',
      'Textos, horários de funcionamento e endereço',
    ],
    incluso: [
      'Cardápio completo com filtros e busca',
      'Carrinho com subtotal, entrega ou retirada',
      'Envio do pedido formatado por WhatsApp',
      'Mapa, horários e avaliações',
      'Estrutura pronta para painel de produtos',
    ],
    integracoes: [
      'Painel administrativo para editar produtos e preços',
      'Pagamento online (Pix, cartão) via gateway',
      'Impressora de comanda ou sistema de PDV',
      'Cálculo de frete por distância',
    ],
    prazo: '2 a 4 semanas',
    demonstrativo: [
      'O carrinho funciona no navegador, mas nada é gravado em servidor.',
      'Avaliações, horários e taxas de entrega são ilustrativos.',
      'Pagamento e roteirização dependem de contratação e backend.',
    ],
  },
  {
    slug: 'distrito-13',
    problema: 'A agenda vive no caderno ou no WhatsApp do barbeiro: horários repetidos, esquecimento e tempo perdido combinando disponibilidade por mensagem.',
    solucao: 'Um fluxo guiado em quatro etapas — serviço, profissional, dia e horário — que só oferece o que está livre e devolve a reserva pronta para confirmação.',
    resumoCurto: 'Agenda por profissional, dia e horário, confirmada no WhatsApp.',
    nome: 'Distrito 13 Barbearia',
    segmento: 'Barbearia',
    categoria: 'beleza',
    resumo:
      'Agenda com escolha de profissional, data e horário, tabela de serviços, galeria de trabalhos e clube de assinatura.',
    capa: '/img/capa-distrito13.webp',
    alt: 'Composição gráfica em preto e cobre representando uma barbearia contemporânea',
    funcionalidades: ['Agendamento guiado em 4 etapas', 'Escolha de profissional', 'Clube de assinatura', 'Confirmação por WhatsApp'],
    rotaDemo: '/demonstracao/distrito-13',
    indicadoPara: [
      'Barbearias, salões e estúdios de estética',
      'Clínicas e consultórios com agenda por profissional',
      'Serviços vendidos por horário marcado',
    ],
    personalizavel: [
      'Serviços, durações e valores',
      'Equipe, especialidades e horários de cada profissional',
      'Intervalos de atendimento e dias fechados',
      'Planos de assinatura e benefícios',
    ],
    incluso: [
      'Fluxo de agendamento com serviço, profissional, data e horário',
      'Tabela de serviços e combos',
      'Galeria de trabalhos',
      'Clube mensal e área de contato',
      'Mapa e horários de funcionamento',
    ],
    integracoes: [
      'Agenda gravada em banco de dados com bloqueio de horário',
      'Sincronização com Google Agenda',
      'Lembretes automáticos por WhatsApp',
      'Pagamento antecipado ou sinal',
    ],
    prazo: '2 a 4 semanas',
    demonstrativo: [
      'Os horários exibidos são gerados no navegador, sem agenda real.',
      'A confirmação apenas monta a mensagem no WhatsApp.',
      'Lembretes automáticos exigem API oficial e backend.',
    ],
  },
  {
    slug: 'aurea',
    problema: 'Escritórios recebem contatos sem contexto e gastam a primeira reunião entendendo o assunto, além de dependerem de indicação por não terem presença institucional.',
    solucao: 'Uma apresentação sóbria das áreas de atuação com um atendimento inicial que já chega triado: área, assunto descrito e data pretendida para a reunião.',
    resumoCurto: 'Base institucional com áreas de atuação e atendimento inicial.',
    nome: 'Áurea Consultoria',
    segmento: 'Escritórios e serviços profissionais',
    categoria: 'escritorios',
    resumo:
      'Base institucional para advocacia, contabilidade, seguros, arquitetura ou consultoria, com áreas de atuação, equipe e atendimento inicial.',
    capa: '/img/capa-aurea.webp',
    alt: 'Composição gráfica em verde profundo e dourado discreto representando um escritório de consultoria',
    funcionalidades: ['Áreas de atuação', 'Atendimento inicial', 'Agendamento de reunião', 'Conteúdos e FAQ'],
    rotaDemo: '/demonstracao/aurea',
    indicadoPara: [
      'Escritórios de advocacia, contabilidade e seguros',
      'Arquitetos, engenheiros e consultores',
      'Profissionais que precisam de presença institucional sólida',
    ],
    personalizavel: [
      'Áreas de atuação e página própria de cada serviço',
      'Equipe, formação e áreas de cada profissional',
      'Campos do formulário de atendimento inicial',
      'Textos de privacidade e política de dados',
    ],
    incluso: [
      'Home institucional e página sobre o escritório',
      'Página individual para cada área de atuação',
      'Formulário de atendimento inicial com validação',
      'Agendamento de reunião e envio de documentos',
      'Artigos, perguntas frequentes e avisos de LGPD',
    ],
    integracoes: [
      'Envio de formulários por e-mail e CRM',
      'Armazenamento seguro de documentos',
      'Assinatura eletrônica de contratos',
      'Área do cliente com login',
    ],
    prazo: '2 a 3 semanas',
    demonstrativo: [
      'Os formulários validam os campos, mas não gravam nem enviam dados.',
      'O envio de documentos é simulado no navegador.',
      'Equipe, artigos e conteúdos são fictícios.',
    ],
  },
  {
    slug: 'linha-norte',
    problema: 'O estoque muda toda semana e o cliente pergunta preço, ano e quilometragem um a um, enquanto compara veículos em várias abas.',
    solucao: 'Um catálogo com filtros, comparador lado a lado e simulação ilustrativa de parcelas, para o contato começar já sabendo qual carro interessa.',
    resumoCurto: 'Catálogo de veículos com filtros, comparador e simulação.',
    nome: 'Linha Norte Motors',
    segmento: 'Concessionária e revenda',
    categoria: 'automoveis',
    resumo:
      'Catálogo de veículos com filtros, comparação, simulação ilustrativa de financiamento, avaliação de usado e test-drive.',
    capa: '/img/capa-linhanorte.webp',
    alt: 'Composição gráfica em grafite e azul profundo representando uma concessionária de veículos',
    funcionalidades: ['Catálogo com filtros', 'Comparador de veículos', 'Simulação de financiamento', 'Test-drive e avaliação'],
    rotaDemo: '/demonstracao/linha-norte',
    indicadoPara: [
      'Concessionárias, revendas e lojas de seminovos',
      'Locadoras e negócios com estoque que muda toda semana',
      'Qualquer catálogo grande que precise de filtros e comparação',
    ],
    personalizavel: [
      'Campos do estoque: marca, versão, ano, câmbio, quilometragem',
      'Regras da simulação de financiamento',
      'Selos de destaque, reservado e vendido',
      'Formulários de avaliação e test-drive',
    ],
    incluso: [
      'Catálogo com busca, filtros e ordenação',
      'Página completa de cada veículo com galeria',
      'Comparador de até três veículos',
      'Simulador ilustrativo de parcelas',
      'Formulários de avaliação de usado e test-drive',
    ],
    integracoes: [
      'Painel de estoque com fotos e status',
      'Importação de estoque por planilha ou XML',
      'Publicação simultânea em portais de anúncio',
      'Consulta de tabela de referência e financiamento real',
    ],
    prazo: '3 a 5 semanas',
    demonstrativo: [
      'Veículos, preços e fotos são fictícios.',
      'A simulação de financiamento usa fórmula ilustrativa, sem consulta a banco.',
      'Estoque e status ficam em arquivo local, sem painel real.',
    ],
  },
]

export function modeloPorSlug(slug: string | undefined): Modelo | undefined {
  return modelos.find((m) => m.slug === slug)
}
