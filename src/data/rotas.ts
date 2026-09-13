/**
 * METADADOS DE TODAS AS ROTAS
 * ------------------------------------------------------------------
 * Uma única fonte da verdade, consumida em dois lugares:
 *  1. `useSeo` no navegador (troca de rota sem recarregar);
 *  2. `scripts/prerender.mjs`, que grava um HTML de entrada por rota no build,
 *     já com title, description, canonical, Open Graph e robots corretos.
 *
 * As demonstrações usam empresas fictícias: por isso entram como
 * `noindex` e NÃO recebem dados estruturados de empresa real.
 */
import { modelos } from './modelos'
import { areas, artigos } from '../demos/escritorio/dados'
import { veiculos } from '../demos/concessionaria/dados'
import { contato, faq, servicos } from '../config/site.config'

export type MetaRota = {
  caminho: string
  titulo: string
  descricao: string
  imagem?: string
  /** Fora do índice: rotas fictícias e a 404. */
  noindex?: boolean
  /** Fica de fora do sitemap.xml. */
  semSitemap?: boolean
  prioridade?: string
  dados?: Record<string, unknown>
}

const OG_PADRAO = '/img/og-ramblas.webp'
export const sitePublico = contato.site

export const metaHome: MetaRota = {
  caminho: '/',
  titulo: 'Ramblas Sites — sites e sistemas sob medida para pequenos e médios negócios',
  descricao:
    'Criamos sites profissionais, catálogos, agendamentos e sistemas sob medida para transformar visitas em atendimentos e vendas.',
  imagem: OG_PADRAO,
  prioridade: '1.0',
  dados: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        name: contato.marca,
        description:
          'Criação de sites, catálogos, agendamentos e sistemas sob medida para pequenos e médios negócios.',
        url: contato.site,
        email: contato.email,
        areaServed: 'BR',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'São Paulo',
          addressRegion: 'SP',
          addressCountry: 'BR',
        },
        makesOffer: servicos.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.nome },
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.p,
          acceptedAnswer: { '@type': 'Answer', text: f.r },
        })),
      },
    ],
  },
}

export const metaModelos: MetaRota = {
  caminho: '/modelos',
  titulo: 'Modelos demonstrativos por segmento — Ramblas Sites',
  descricao:
    'Quatro estudos de caso conceituais: pizzaria, barbearia, escritório e concessionária. Empresas fictícias criadas para apresentar possibilidades.',
  imagem: OG_PADRAO,
  prioridade: '0.9',
}

export const metaPrivacidade: MetaRota = {
  caminho: '/privacidade',
  titulo: 'Política de privacidade — Ramblas Sites',
  descricao: 'Como a Ramblas Sites trata os dados enviados pelos formulários do site.',
  imagem: OG_PADRAO,
  prioridade: '0.3',
}

export const meta404: MetaRota = {
  caminho: '/404',
  titulo: 'Página não encontrada — Ramblas Sites',
  descricao: 'O endereço acessado não existe neste site.',
  imagem: OG_PADRAO,
  noindex: true,
  semSitemap: true,
}

/** Páginas comerciais de cada modelo — estas SIM devem ser indexadas. */
export const metasModelo: MetaRota[] = modelos.map((m) => ({
  caminho: `/modelos/${m.slug}`,
  titulo: `${m.nome} — estudo de caso conceitual | Ramblas Sites`,
  descricao: m.resumo,
  imagem: m.capa,
  prioridade: '0.8',
  dados: {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${m.nome} — projeto demonstrativo`,
    about: m.segmento,
    creator: { '@type': 'Organization', name: 'Ramblas Sites' },
    abstract: 'Projeto demonstrativo com empresa fictícia, criado para apresentar possibilidades de site.',
  },
}))

/** Demonstrações fictícias: noindex, follow e sem dados estruturados de empresa. */
const demo = (caminho: string, titulo: string, descricao: string, imagem: string): MetaRota => ({
  caminho,
  titulo,
  descricao,
  imagem,
  noindex: true,
  semSitemap: true,
})

export const metasDemo: MetaRota[] = [
  demo(
    '/demonstracao/forno-27',
    'Forno 27 Pizzaria — demonstração fictícia | Ramblas Sites',
    'Demonstração de cardápio digital com carrinho e pedido por WhatsApp. Empresa fictícia, sem pedidos reais.',
    '/img/capa-forno27-v2.webp',
  ),
  demo(
    '/demonstracao/distrito-13',
    'Distrito 13 Barbearia — demonstração fictícia | Ramblas Sites',
    'Demonstração de agendamento por serviço, profissional, dia e horário. Empresa fictícia, sem agenda real.',
    '/img/capa-distrito13-v2.webp',
  ),
  demo(
    '/demonstracao/aurea',
    'Áurea Consultoria — demonstração fictícia | Ramblas Sites',
    'Demonstração institucional para escritórios, com áreas de atuação e atendimento inicial. Empresa fictícia.',
    '/img/capa-aurea-v2.webp',
  ),
  demo(
    '/demonstracao/linha-norte',
    'Linha Norte Motors — demonstração fictícia | Ramblas Sites',
    'Demonstração de catálogo de veículos com filtros, comparador e simulação ilustrativa. Empresa fictícia.',
    '/img/capa-linhanorte-v2.webp',
  ),
  demo(
    '/demonstracao/linha-norte/comparar',
    'Comparar veículos — demonstração fictícia | Ramblas Sites',
    'Comparação lado a lado de veículos fictícios do estoque demonstrativo.',
    '/img/capa-linhanorte-v2.webp',
  ),
  ...areas.map((a) =>
    demo(
      `/demonstracao/aurea/areas/${a.slug}`,
      `${a.nome} — demonstração fictícia | Ramblas Sites`,
      a.resumo,
      '/img/capa-aurea-v2.webp',
    ),
  ),
  ...artigos.map((a) =>
    demo(
      `/demonstracao/aurea/artigos/${a.slug}`,
      `${a.titulo} — demonstração fictícia | Ramblas Sites`,
      a.resumo,
      a.capa,
    ),
  ),
  ...veiculos.map((v) =>
    demo(
      `/demonstracao/linha-norte/veiculo/${v.slug}`,
      `${v.marca} ${v.modelo} ${v.versao} — demonstração fictícia | Ramblas Sites`,
      v.resumo,
      v.fotos[0],
    ),
  ),
]

/** Todas as rotas conhecidas — a prerenderização gera um HTML para cada uma. */
export const todasAsRotas: MetaRota[] = [
  metaHome,
  metaModelos,
  ...metasModelo,
  metaPrivacidade,
  ...metasDemo,
  meta404,
]

export function metaDemoPorCaminho(caminho: string): MetaRota | undefined {
  return metasDemo.find((m) => m.caminho === caminho)
}
