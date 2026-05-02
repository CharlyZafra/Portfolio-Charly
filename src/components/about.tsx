'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { stats, stack } from '@/data/about'

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 bg-[#060b19] overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-indigo-950/40 blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-cyan-950/25 blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-indigo-400 text-xs font-bold tracking-widest uppercase mb-3">
            Conóceme
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">
            Sobre <span className="gradient-text">Mí</span>
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-indigo-500 to-cyan-500" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Photo */}
          <motion.div
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-600/15 blur-3xl rounded-2xl scale-125" />
              <div className="relative w-72 h-[22rem] gradient-border overflow-hidden">
                <Image
                  src="/images/Foto-SobreMi.jpg"
                  alt="Charly Castellanos"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060b19]/40 to-transparent" />
              </div>
              <motion.div
                className="absolute -top-4 -right-5 px-4 py-1.5 glass neon-border-accent rounded-full text-cyan-400 text-xs font-semibold whitespace-nowrap"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                ✨ Disponible
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="space-y-7"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed">
                Soy un desarrollador Full Stack apasionado por crear soluciones tecnológicas
                innovadoras. Con experiencia en tecnologías modernas como React, Next.js,
                Node.js y bases de datos, me especializo en desarrollar aplicaciones web
                escalables y de alto rendimiento.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Mi enfoque se centra en escribir código limpio y mantenible, siguiendo las
                mejores prácticas. Siempre busco nuevos desafíos y oportunidades para
                crecer profesionalmente.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map(({ label, value, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  className="text-center p-4 glass rounded-xl neon-border-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.04 }}
                >
                  <Icon className="w-4 h-4 text-indigo-400 mx-auto mb-2" />
                  <div className="text-2xl font-extrabold gradient-text">{value}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{label}</div>
                </motion.div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="grid grid-cols-2 gap-6">
              {stack.map(({ title, dot, items }) => (
                <div key={title}>
                  <h4 className="text-slate-200 text-sm font-semibold mb-3 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${dot}`} />
                    {title}
                  </h4>
                  <ul className="space-y-1.5">
                    {items.map((item) => (
                      <li key={item} className="text-slate-500 text-sm flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
