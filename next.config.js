/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Fuerza HTTPS por 2 años e incluye subdominios
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Bloquea la página dentro de iframes de otros sitios (anti-clickjacking)
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Evita que el browser adivine el tipo de archivo (anti-MIME sniffing)
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Filtro XSS legacy para browsers antiguos
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // No enviar referrer a sitios externos
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Deshabilitar APIs del browser que no se usan
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
  // CSP: define exactamente de dónde puede cargar recursos la página
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js y Three.js necesitan unsafe-inline/eval
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Tailwind + Framer Motion usan estilos inline
      "style-src 'self' 'unsafe-inline'",
      // Imágenes propias + Firebase Storage + blobs para preview de chat
      "img-src 'self' data: blob: https://*.googleapis.com https://*.gstatic.com https://firebasestorage.googleapis.com",
      // Fuentes locales
      "font-src 'self' data:",
      // Conexiones permitidas: Firebase + Web3Forms
      "connect-src 'self' https://*.googleapis.com https://*.google.com wss://*.firebaseio.com https://*.firebaseio.com https://identitytoolkit.googleapis.com https://api.web3forms.com",
      // Workers para Three.js
      "worker-src 'self' blob:",
      // Sin iframes externos
      "frame-src 'none'",
      // Sin objetos embebidos
      "object-src 'none'",
      // Solo formularios a destinos conocidos
      "form-action 'self' https://api.web3forms.com",
      // Solo el propio dominio como base
      "base-uri 'self'",
    ].join('; '),
  },
]

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  // No exponer la versión de Next.js
  poweredByHeader: false,
}

module.exports = nextConfig
