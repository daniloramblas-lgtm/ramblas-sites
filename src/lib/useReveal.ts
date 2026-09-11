import { useEffect } from 'react'

/**
 * Revela elementos com [data-reveal] quando entram na tela.
 * Respeita a preferência de movimento reduzido do sistema.
 */
export function useReveal(dep?: unknown) {
  useEffect(() => {
    const alvos = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduzido || typeof IntersectionObserver === 'undefined') {
      alvos.forEach((el) => el.setAttribute('data-revelado', 'true'))
      return
    }
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute('data-revelado', 'true')
            obs.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    alvos.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [dep])
}
