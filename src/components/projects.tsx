'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'Plataforma de comercio electrónico completa con panel de administración, carrito de compras y procesamiento de pagos. Incluye sistema de inventario, gestión de usuarios y análisis de ventas.',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    image: '/project1.jpg',
    github: 'https://github.com/tuusuario/ecommerce-platform',
    demo: 'https://tu-ecommerce-demo.vercel.app',
    featured: true,
    status: 'Completado',
    category: 'Web Development'
  },
  {
    title: 'Task Management App',
    description: 'Aplicación de gestión de tareas con funcionalidades de colaboración en tiempo real y notificaciones. Sistema completo de proyectos con equipos y asignaciones.',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
    image: '/project2.jpg',
    github: 'https://github.com/tuusuario/task-manager',
    demo: 'https://tu-task-manager.vercel.app',
    featured: true,
    status: 'En desarrollo',
    category: 'Full Stack'
  },
  {
    title: 'Weather Dashboard',
    description: 'Dashboard meteorológico con visualizaciones interactivas y predicciones de múltiples fuentes de datos. Incluye mapas interactivos y alertas personalizadas.',
    tech: ['Vue.js', 'D3.js', 'Python', 'FastAPI', 'Chart.js'],
    image: '/project3.jpg',
    github: 'https://github.com/tuusuario/weather-dashboard',
    demo: 'https://tu-weather-app.vercel.app',
    featured: false,
    status: 'Completado',
    category: 'Data Visualization'
  },
  {
    title: 'Portfolio Website',
    description: 'Sitio web de portfolio personal con animaciones suaves y diseño responsive. Sistema de temas, formulario de contacto funcional y chat público.',
    tech: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
    image: '/project4.jpg',
    github: 'https://github.com/tuusuario/portfolio-website',
    demo: 'https://tu-portfolio.vercel.app',
    featured: false,
    status: 'Completado',
    category: 'Frontend'
  }
]

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section id="projects" className="py-20 bg-secondary/10" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Proyectos Destacados
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Una selección de proyectos que demuestran mis habilidades y experiencia en desarrollo web
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: isInView ? index * 0.2 : 0 }}
              className="group bg-background rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                
                {/* Placeholder para imagen del proyecto */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-6xl font-bold text-primary/30">
                    {project.title.charAt(0)}
                  </div>
                </div>
                
                {/* Overlay con enlaces */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <motion.a
                    href={project.github}
                    className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>
              </div>
              
              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <span className={
                    project.status === 'Completado' 
                      ? 'px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                  }>
                    {project.status}
                  </span>
                </div>
                
                <span className="inline-block px-2 py-1 bg-accent/20 text-accent-foreground rounded text-xs mb-3">
                  {project.category}
                </span>
                
                <p className="text-muted-foreground mb-4 line-clamp-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-secondary/20 text-foreground rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Enlaces */}
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github size={16} />
                    <span>Código</span>
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors"
          >
            <span>Ver todos los proyectos</span>
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
