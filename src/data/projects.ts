export interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  demo: string
  status: string
  category: string
  accentColor: string
  gradient: string
  image: string
}

export const projects: Project[] = [
  {
    title: 'Zafra Cloud',
    description:
      'ERP empresarial en la nube con módulos de contabilidad, facturación, inventario con códigos de barras, RRHH y gestión comercial. Integración con WhatsApp y Telegram, WebSockets en tiempo real, tablas virtualizadas de alto rendimiento y generación de PDFs dinámicos. +390 releases activos.',
    tech: ['React', 'TypeScript', 'NestJS', 'MySQL', 'Socket.io', 'Redux'],
    github: '',
    demo: 'https://home.zafra.cloud/?gad_campaignid=20374099410',
    status: 'Completado',
    category: 'ERP / Full Stack',
    accentColor: '#06b6d4',
    gradient: 'from-cyan-600/25 to-indigo-700/20',
    image: '/images/zafra-cloud.png',
  },
  {
    title: 'E-commerce Platform',
    description:
      'Plataforma de comercio electrónico con panel de administración, carrito de compras y procesamiento de pagos. Incluye sistema de inventario y análisis de ventas.',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind'],
    github: '#',
    demo: '#',
    status: 'Coming Soon',
    category: 'Web Development',
    accentColor: '#6366f1',
    gradient: 'from-indigo-600/25 to-violet-700/20',
    image: '',
  },
  {
    title: 'Task Management App',
    description:
      'Aplicación de gestión de tareas con colaboración en tiempo real y notificaciones. Sistema de proyectos con equipos y asignaciones.',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
    github: '#',
    demo: '#',
    status: 'Coming Soon',
    category: 'Full Stack',
    accentColor: '#06b6d4',
    gradient: 'from-cyan-600/25 to-blue-700/20',
    image: '',
  },
  {
    title: 'Weather Dashboard',
    description:
      'Dashboard meteorológico con visualizaciones interactivas y predicciones de múltiples fuentes. Mapas interactivos y alertas personalizadas.',
    tech: ['Vue.js', 'D3.js', 'Python', 'FastAPI', 'Chart.js'],
    github: '#',
    demo: '#',
    status: 'Coming Soon',
    category: 'Data Visualization',
    accentColor: '#8b5cf6',
    gradient: 'from-violet-600/25 to-fuchsia-700/20',
    image: '',
  },
  {
    title: 'Portfolio Website',
    description:
      'Portafolio personal con escena 3D, diseño responsive y modo oscuro/claro. Chat en tiempo real con Firebase y formulario de contacto funcional.',
    tech: ['Next.js', 'Three.js', 'Framer Motion', 'Firebase'],
    github: '#',
    demo: '#',
    status: 'Coming Soon',
    category: 'Frontend',
    accentColor: '#f97316',
    gradient: 'from-orange-600/25 to-rose-700/20',
    image: '',
  },
]
