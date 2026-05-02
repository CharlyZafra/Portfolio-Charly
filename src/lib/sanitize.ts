/** Elimina etiquetas HTML y recorta espacios. */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim()
}

/** Escapa caracteres peligrosos para prevenir XSS en contextos donde no hay JSX. */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

/** Limpia un string: sin HTML, sin caracteres de control, longitud máxima. */
export function sanitizeInput(input: string, maxLength = 500): string {
  return stripHtml(input)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // caracteres de control
    .slice(0, maxLength)
    .trim()
}

/** Valida que un string no tenga intentos de inyección conocidos. */
export function isSafe(input: string): boolean {
  const patterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,       // onerror=, onclick=, etc.
    /data:\s*text\/html/i,
    /vbscript:/i,
    /__proto__/i,
    /constructor\[/i,
  ]
  return !patterns.some(p => p.test(input))
}
