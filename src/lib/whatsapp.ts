import { contato, mensagemPadrao } from '../config/site.config'

/** Monta o link wa.me com a mensagem codificada. */
export function linkWhatsApp(mensagem: string = mensagemPadrao, numero: string = contato.whatsapp): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
}

type Campo = [rotulo: string, valor: string | number | undefined | null]

/**
 * Transforma pares rótulo/valor em uma mensagem organizada.
 * Campos vazios são descartados.
 */
export function montarMensagem(titulo: string, campos: Campo[], rodape?: string): string {
  const linhas = campos
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([r, v]) => `${r}: ${v}`)
  return [titulo, '', ...linhas, ...(rodape ? ['', rodape] : [])].join('\n')
}
