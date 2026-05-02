/**
 * Rate limiter basado en localStorage.
 * Usa un sliding window — solo cuenta peticiones dentro del tiempo definido.
 */

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  if (typeof window === 'undefined') return true

  const now = Date.now()
  const storageKey = `rl_${key}`

  try {
    const raw = localStorage.getItem(storageKey)
    const timestamps: number[] = raw ? JSON.parse(raw) : []
    const recent = timestamps.filter(t => now - t < windowMs)

    if (recent.length >= limit) return false

    recent.push(now)
    localStorage.setItem(storageKey, JSON.stringify(recent))
    return true
  } catch {
    return true
  }
}

/** Retorna los segundos que quedan hasta poder volver a intentar. */
export function getRateLimitSeconds(key: string, windowMs: number): number {
  if (typeof window === 'undefined') return 0

  try {
    const raw = localStorage.getItem(`rl_${key}`)
    if (!raw) return 0

    const timestamps: number[] = JSON.parse(raw)
    if (!timestamps.length) return 0

    const oldest = Math.min(...timestamps)
    return Math.max(0, Math.ceil((windowMs - (Date.now() - oldest)) / 1000))
  } catch {
    return 0
  }
}
