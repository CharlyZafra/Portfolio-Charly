'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { projects, Project } from '@/data/projects'
import { useProjectCard } from '@/hooks/use-project-card'

function ProjectCard({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) {
  const { tilt, cardRef, handleMouseMove, handleMouseLeave } = useProjectCard()

  const isComingSoon = project.status === 'Coming Soon'
  const hasGithub    = !isComingSoon && project.github && project.github !== '#'
  const hasDemo      = !isComingSoon && project.demo   && project.demo   !== '#'

  if (isComingSoon) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.13 }}
        className="relative rounded-2xl overflow-hidden glass gradient-border flex flex-col items-center justify-center py-16 px-8 text-center min-h-[220px]"
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(${project.accentColor}60 1px, transparent 1px),
              linear-gradient(90deg, ${project.accentColor}60 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />
        <div
          className="absolute inset-0 opacity-10 blur-3xl"
          style={{ background: `radial-gradient(circle at 50% 50%, ${project.accentColor}, transparent 70%)` }}
        />
        <div className="relative z-10">
          <span
            className="text-2xl font-black tracking-widest uppercase"
            style={{
              color: project.accentColor,
              textShadow: `0 0 12px ${project.accentColor}, 0 0 30px ${project.accentColor}80, 0 0 60px ${project.accentColor}40`,
            }}
          >
            Coming Soon
          </span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.13 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s ease' : 'transform 0.08s ease',
      }}
      className="group relative rounded-2xl overflow-hidden glass gradient-border"
    >
      {/* Card header */}
      <div className={`relative h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-[#030712]/55" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(${project.accentColor}50 1px, transparent 1px),
              linear-gradient(90deg, ${project.accentColor}50 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />

        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="relative z-10 h-28 w-auto object-contain drop-shadow-2xl"
            style={{ filter: `drop-shadow(0 0 20px ${project.accentColor}60)` }}
          />
        ) : (
          <span
            className="relative z-10 text-8xl font-black select-none"
            style={{ color: project.accentColor, opacity: 0.55, filter: `drop-shadow(0 0 24px ${project.accentColor}80)` }}
          >
            {project.title.charAt(0)}
          </span>
        )}

        <div className="absolute inset-0 z-20 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-5">
          {hasGithub && (
            <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
              className="p-3 rounded-full glass border border-white/20 text-white hover:border-white/40 transition-colors"
              whileHover={{ scale: 1.1 }} onClick={(e) => e.stopPropagation()}
            >
              <Github size={19} />
            </motion.a>
          )}
          {hasDemo && (
            <motion.a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="p-3 rounded-full glass border border-white/20 text-white hover:border-white/40 transition-colors"
              whileHover={{ scale: 1.1 }} onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={19} />
            </motion.a>
          )}
        </div>

        <span className={`absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full text-xs font-medium ${
          project.status === 'Completado'
            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
            : 'bg-blue-950/80 text-blue-400 border border-blue-500/30'
        }`}>
          {project.status}
        </span>
      </div>

      {/* Card body */}
      <div className="p-6 space-y-3">
        <h3 className="text-base font-bold text-slate-100 group-hover:gradient-text transition-all duration-300">
          {project.title}
        </h3>
        <span className="inline-block text-xs text-slate-600 bg-slate-800/50 px-2 py-0.5 rounded">
          {project.category}
        </span>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full text-slate-500 bg-slate-800/60 border border-slate-700/40">
              {t}
            </span>
          ))}
        </div>

        {(hasGithub || hasDemo) && (
          <div className="flex gap-5 pt-2 border-t border-slate-800/50">
            {hasGithub && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-indigo-400 transition-colors">
                <Github size={12} /> Código
              </a>
            )}
            {hasDemo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-cyan-400 transition-colors">
                <ExternalLink size={12} /> Ver sitio
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  return (
    <section id="projects" ref={ref} className="relative py-28 bg-[#060b19] overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-2xl h-48 bg-indigo-950/20 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="inline-block text-indigo-400 text-xs font-bold tracking-widest uppercase mb-3">
            Portafolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">
            Proyectos <span className="gradient-text">Destacados</span>
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-indigo-500 to-cyan-500" />
          <p className="text-slate-600 mt-4 max-w-xl mx-auto text-sm">
            Selección de proyectos que demuestran mis habilidades en desarrollo web
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
