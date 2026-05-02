'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { contactInfo } from '@/data/contact-info'
import { useContact } from '@/hooks/use-contact'

const INPUT_CLASS =
  'w-full px-4 py-3 bg-slate-900/80 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-600 outline-none transition-all duration-300 focus:border-indigo-500/70 focus:shadow-[0_0_14px_rgba(99,102,241,0.2)] focus:bg-slate-900'

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const { formData, isLoading, isSuccess, error, handleChange, handleSubmit } = useContact()

  return (
    <section id="contact" ref={ref} className="relative py-28 bg-[#030712] overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-indigo-950/30 blur-3xl" />
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-purple-950/20 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="inline-block text-indigo-400 text-xs font-bold tracking-widest uppercase mb-3">
            Hablemos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">
            <span className="gradient-text">Contacto</span>
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-indigo-500 to-cyan-500" />
          <p className="text-slate-600 mt-4 max-w-md mx-auto text-sm">
            ¿Tienes un proyecto en mente? Me encantaría escucharte
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {contactInfo.map(({ icon: Icon, label, value, color }, i) => (
              <motion.div
                key={label}
                className="flex items-center gap-4 p-4 glass rounded-xl neon-border-primary"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div
                  className="p-3 rounded-xl flex-shrink-0"
                  style={{ background: `${color}18`, border: `1px solid ${color}35` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-slate-600 text-xs mb-0.5">{label}</p>
                  <p className="text-slate-300 text-sm font-medium">{value}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="p-5 glass rounded-xl neon-border-accent"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65 }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">Disponible para proyectos</span>
              </div>
              <p className="text-slate-600 text-sm">Abierto a nuevas oportunidades y colaboraciones</p>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-4 p-7 glass rounded-2xl neon-border-primary"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <input
              type="hidden"
              name="access_key"
              value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '7e3b7428-0e62-4c59-b832-5f9ad48a9b65'}
            />
            {/* Honeypot — trampa para bots */}
            <input
              type="text"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={formData.honeypot}
              onChange={handleChange}
              className="absolute -left-[9999px] opacity-0 pointer-events-none"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 text-xs mb-1.5">Nombre</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Tu nombre" className={INPUT_CLASS} required />
              </div>
              <div>
                <label className="block text-slate-500 text-xs mb-1.5">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="tu@email.com" className={INPUT_CLASS} required />
              </div>
            </div>

            <div>
              <label className="block text-slate-500 text-xs mb-1.5">Asunto</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                placeholder="¿En qué puedo ayudarte?" className={INPUT_CLASS} required />
            </div>

            <div>
              <label className="block text-slate-500 text-xs mb-1.5">Mensaje</label>
              <textarea name="message" rows={5} value={formData.message} onChange={handleChange}
                placeholder="Cuéntame sobre tu proyecto..." className={`${INPUT_CLASS} resize-none`} required />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                isSuccess
                  ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                  : isLoading
                  ? 'bg-indigo-700/40 text-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white glow-primary'
              }`}
              whileHover={!isLoading ? { scale: 1.02, y: -1 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <><div className="w-4 h-4 border-2 border-indigo-300 border-t-transparent rounded-full animate-spin" />Enviando...</>
              ) : isSuccess ? (
                <><CheckCircle size={17} />Mensaje Enviado</>
              ) : (
                <><Send size={16} />Enviar Mensaje</>
              )}
            </motion.button>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
