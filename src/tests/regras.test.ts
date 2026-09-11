import { describe, expect, it } from 'vitest'
import {
  adicionar,
  alterarQuantidade,
  buscar,
  descricaoItem,
  montarItem,
  precoAdicionais,
  precoBase,
  subtotal,
  taxaEntrega,
  total,
} from '../demos/pizzaria/carrinho'
import { produtos } from '../demos/pizzaria/dados'
import { horariosDoDia, isoComDeslocamento, profissionalAtende, proximosDias } from '../demos/barbearia/agenda'
import { filtrar, filtrosIniciais, parcela, porSlug } from '../demos/concessionaria/catalogo'
import { veiculos } from '../demos/concessionaria/dados'
import { emailValido, mascaraTelefone, telefoneValido } from '../lib/format'
import { linkWhatsApp, montarMensagem } from '../lib/whatsapp'
import { validar, textoOrcamento } from '../components/FormularioOrcamento'
import { modelos, modeloPorSlug } from '../data/modelos'

const margherita = produtos.find((p) => p.id === 'margherita')!
const refrigerante = produtos.find((p) => p.id === 'refrigerante')!

describe('carrinho da pizzaria', () => {
  it('usa o preço do tamanho escolhido', () => {
    const broto = margherita.tamanhos!.find((t) => t.id === 'broto')!.preco
    expect(precoBase(margherita, 'broto')).toBe(broto)
    expect(precoBase(refrigerante)).toBe(refrigerante.preco)
  })

  it('soma adicionais ao preço unitário', () => {
    const item = montarItem(margherita, 'grande', ['borda-catupiry', 'extra-bacon'])
    const esperado = precoBase(margherita, 'grande') + precoAdicionais(['borda-catupiry', 'extra-bacon'])
    expect(item.precoUnitario).toBe(esperado)
  })

  it('agrupa itens idênticos e separa os diferentes', () => {
    let itens = adicionar([], montarItem(margherita, 'media', []))
    itens = adicionar(itens, montarItem(margherita, 'media', []))
    expect(itens).toHaveLength(1)
    expect(itens[0].quantidade).toBe(2)

    itens = adicionar(itens, montarItem(margherita, 'grande', []))
    expect(itens).toHaveLength(2)
  })

  it('ignora a ordem dos adicionais ao agrupar', () => {
    const a = montarItem(margherita, 'media', ['extra-queijo', 'extra-bacon'])
    const b = montarItem(margherita, 'media', ['extra-bacon', 'extra-queijo'])
    expect(a.chave).toBe(b.chave)
  })

  it('remove o item quando a quantidade chega a zero', () => {
    const itens = adicionar([], montarItem(refrigerante, undefined, []))
    expect(alterarQuantidade(itens, itens[0].chave, -1)).toHaveLength(0)
  })

  it('calcula subtotal, taxa e total', () => {
    let itens = adicionar([], montarItem(margherita, 'media', []))
    itens = adicionar(itens, montarItem(refrigerante, undefined, []))
    const esperado = precoBase(margherita, 'media') + refrigerante.preco!
    expect(subtotal(itens)).toBe(esperado)
    expect(taxaEntrega('Centro', 'entrega')).toBe(6)
    expect(taxaEntrega('Centro', 'retirada')).toBe(0)
    expect(total(itens, 'Centro', 'entrega')).toBe(esperado + 6)
  })

  it('descreve o item com tamanho e adicionais', () => {
    const item = montarItem(margherita, 'familia', ['extra-queijo'])
    expect(descricaoItem(item)).toContain('Família')
    expect(descricaoItem(item)).toContain('Queijo extra')
  })
})

describe('busca do cardápio', () => {
  it('filtra por categoria', () => {
    expect(buscar('', 'bebidas').every((p) => p.categoria === 'bebidas')).toBe(true)
  })

  it('ignora acentos e maiúsculas', () => {
    expect(buscar('MANJERICAO', 'todos').some((p) => p.id === 'margherita')).toBe(true)
  })

  it('devolve lista vazia quando nada corresponde', () => {
    expect(buscar('jacaré ao molho', 'todos')).toHaveLength(0)
  })
})

describe('agenda da barbearia', () => {
  const base = new Date(2026, 8, 11) // sexta-feira

  it('gera os próximos dias em sequência', () => {
    const dias = proximosDias(base, 5)
    expect(dias).toHaveLength(5)
    expect(dias[0]).toBe('2026-09-11')
    expect(dias[4]).toBe(isoComDeslocamento(base, 4))
  })

  it('respeita os dias em que o profissional atende', () => {
    // 2026-09-14 é segunda-feira; Rafa atende de terça a sábado.
    expect(profissionalAtende('rafa', '2026-09-14')).toBe(false)
    expect(profissionalAtende('rafa', '2026-09-11')).toBe(true)
  })

  it('não gera horários em dia sem atendimento', () => {
    expect(horariosDoDia('rafa', '2026-09-14', 45)).toHaveLength(0)
  })

  it('gera a mesma agenda para a mesma data', () => {
    const a = horariosDoDia('rafa', '2026-09-11', 45)
    const b = horariosDoDia('rafa', '2026-09-11', 45)
    expect(a).toEqual(b)
    expect(a.length).toBeGreaterThan(0)
    expect(a.some((h) => h.livre)).toBe(true)
  })

  it('serviço mais longo cabe em menos horários', () => {
    const curto = horariosDoDia('rafa', '2026-09-11', 20)
    const longo = horariosDoDia('rafa', '2026-09-11', 95)
    expect(longo.length).toBeLessThan(curto.length)
  })
})

describe('catálogo da concessionária', () => {
  it('sem filtros, devolve todo o estoque', () => {
    expect(filtrar(filtrosIniciais)).toHaveLength(veiculos.length)
  })

  it('filtra por marca e câmbio', () => {
    const r = filtrar({ ...filtrosIniciais, marca: 'Meridia', cambio: 'Automático' })
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((v) => v.marca === 'Meridia' && v.cambio === 'Automático')).toBe(true)
  })

  it('respeita o teto de preço', () => {
    const r = filtrar({ ...filtrosIniciais, precoMax: 100000 })
    expect(r.every((v) => v.preco <= 100000)).toBe(true)
  })

  it('ordena por menor preço', () => {
    const r = filtrar({ ...filtrosIniciais, ordem: 'preco-asc' })
    const precos = r.map((v) => v.preco)
    expect([...precos].sort((a, b) => a - b)).toEqual(precos)
  })

  it('busca textual ignora acentos', () => {
    expect(filtrar({ ...filtrosIniciais, termo: 'HIBRIDO' }).length).toBeGreaterThan(0)
  })

  it('encontra veículo por slug', () => {
    expect(porSlug('aurora-sedan-lx')?.modelo).toBe('Aurora')
    expect(porSlug('inexistente')).toBeUndefined()
  })
})

describe('simulação de financiamento', () => {
  it('parcela zero quando a entrada cobre o valor', () => {
    expect(parcela(100000, 100000, 48)).toBe(0)
  })

  it('parcela maior que a divisão simples por causa dos juros', () => {
    const p = parcela(120000, 20000, 48)
    expect(p).toBeGreaterThan(100000 / 48)
  })

  it('mais parcelas reduzem o valor mensal', () => {
    expect(parcela(120000, 20000, 60)).toBeLessThan(parcela(120000, 20000, 24))
  })
})

describe('formatação e validação', () => {
  it('aplica máscara de telefone', () => {
    expect(mascaraTelefone('11999998888')).toBe('(11) 99999-8888')
    expect(mascaraTelefone('1133334444')).toBe('(11) 3333-4444')
  })

  it('valida telefone e e-mail', () => {
    expect(telefoneValido('(11) 99999-8888')).toBe(true)
    expect(telefoneValido('9999')).toBe(false)
    expect(emailValido('contato@exemplo.com.br')).toBe(true)
    expect(emailValido('contato@exemplo')).toBe(false)
  })
})

describe('mensagens de WhatsApp', () => {
  it('descarta campos vazios', () => {
    const m = montarMensagem('Título', [
      ['Nome', 'Ana'],
      ['Empresa', ''],
      ['Telefone', undefined],
    ])
    expect(m).toContain('Nome: Ana')
    expect(m).not.toContain('Empresa')
  })

  it('gera link wa.me com a mensagem codificada', () => {
    const link = linkWhatsApp('olá mundo')
    expect(link.startsWith('https://wa.me/')).toBe(true)
    expect(link).toContain(encodeURIComponent('olá mundo'))
  })
})

describe('formulário de orçamento', () => {
  const base = {
    nome: 'Ana',
    empresa: 'Padaria Aurora',
    segmento: 'Alimentação',
    whatsapp: '(11) 99999-8888',
    modelo: 'Forno 27 Pizzaria',
    funcionalidades: ['Catálogo ou cardápio'],
    mensagem: 'Quero um cardápio digital.',
  }

  it('aceita dados completos', () => {
    expect(validar(base)).toEqual({})
  })

  it('aponta os campos obrigatórios', () => {
    const erros = validar({ ...base, nome: '', whatsapp: '123', segmento: '' })
    expect(Object.keys(erros).sort()).toEqual(['nome', 'segmento', 'whatsapp'])
  })

  it('monta a mensagem com os dados preenchidos', () => {
    const texto = textoOrcamento(base)
    expect(texto).toContain('Padaria Aurora')
    expect(texto).toContain('Catálogo ou cardápio')
  })
})

describe('modelos do site', () => {
  it('tem quatro modelos com rotas e capas próprias', () => {
    expect(modelos).toHaveLength(4)
    expect(new Set(modelos.map((m) => m.rotaDemo)).size).toBe(4)
    expect(modelos.every((m) => m.capa.endsWith('.webp'))).toBe(true)
  })

  it('encontra modelo por slug', () => {
    expect(modeloPorSlug('aurea')?.nome).toBe('Áurea Consultoria')
    expect(modeloPorSlug('nao-existe')).toBeUndefined()
  })
})
