'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { techCategories, learning } from '@/data/skills'

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-28 bg-[#030712] overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-purple-950/35 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-cyan-950/25 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="inline-block text-indigo-400 text-xs font-bold tracking-widest uppercase mb-3">
            Competencias
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">
            Mis <span className="gradient-text">Habilidades</span>
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-indigo-500 to-cyan-500" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            {techCategories.map((cat, ci) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + ci * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <span
                    className="block w-1.5 h-1.5 rounded-full"
                    style={{ background: cat.accent, boxShadow: `0 0 6px ${cat.accent}` }}
                  />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: cat.accent }}>
                    {cat.label}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.items.map((tech, ti) => (
                    <motion.div
                      key={tech.name}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass neon-border-primary cursor-default transition-all duration-300 hover:scale-105 hover:shadow-[0_0_12px_rgba(99,102,241,0.25)]"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + ci * 0.1 + ti * 0.04 }}
                      whileHover={{ y: -2 }}
                    >
                      <tech.Icon size={15} style={{ color: tech.color, flexShrink: 0 }} />
                      <span className="text-xs font-medium text-slate-300 whitespace-nowrap">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.div
              className="mt-2 p-4 glass rounded-xl neon-border-accent"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
            >
              <p className="text-slate-500 text-xs font-bold tracking-widest uppercase mb-2.5 flex items-center gap-1.5">
                <span className="text-cyan-400">⚡</span> Aprendiendo
              </p>
              <div className="flex flex-wrap gap-2">
                {learning.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-500/25"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.55 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
