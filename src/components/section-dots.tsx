'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useScrollProgress } from '@/hooks/use-scroll-progress'

const sections = [
  { id: 'home',     label: 'Inicio' },
  { id: 'about',    label: 'Sobre Mí' },
  { id: 'skills',   label: 'Habilidades' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'chat',     label: 'Chat' },
  { id: 'contact',  label: 'Contacto' },
  { id: 'game',     label: '¿Aburrido?' },
]

export function SectionDots() {
  const { activeSection } = useScrollProgress()
  const [hovered, setHovered] = useState<string | null>(null)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3.5">
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            className="group relative flex items-center justify-end gap-2.5"
            aria-label={label}
          >
            {/* Label tooltip */}
            <AnimatePresence>
              {hovered === id && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs font-medium text-slate-300 whitespace-nowrap px-2.5 py-1 glass rounded-lg border border-slate-700/50"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <motion.span
              animate={isActive
                ? { scale: 1, backgroundColor: '#818cf8', boxShadow: '0 0 0 2px rgba(99,102,241,0.25), 0 0 10px rgba(99,102,241,0.7)' }
                : { scale: 1, backgroundColor: '#334155', boxShadow: '0 0 0 0px transparent' }
              }
              whileHover={{ scale: 1.4 }}
              transition={{ duration: 0.2 }}
              className="block w-2 h-2 rounded-full flex-shrink-0"
            />
          </button>
        )
      })}
    </div>
  )
}
