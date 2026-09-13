/**
 * Monta srcset para as imagens de /public/img.
 * As variantes -480 e -800 são geradas por scripts/variantes_imagens.py.
 */
export function conjunto(src: string, sizes: string) {
  const base = src.replace(/\.webp$/, '')
  return {
    src,
    srcSet: `${base}-480.webp 480w, ${base}-800.webp 800w, ${src} 1200w`,
    sizes,
  }
}
