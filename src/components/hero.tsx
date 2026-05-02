'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown, Instagram, Phone, Mail, Code2, Sparkles } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'

const HeroScene = dynamic(
  () => import('@/components/3d/hero-scene').then((m) => m.HeroScene),
  { ssr: false, loading: () => null }
)

const socials = [
  { href: 'https://www.instagram.com/its_charlspapu/', icon: Instagram, label: 'Instagram', external: true },
  { href: 'https://wa.me/50489095773',                 icon: Phone,     label: 'WhatsApp',  external: true },
  { href: '#contact',                                  icon: Mail,      label: 'Email',     external: false },
]

export function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const { handleSmoothScroll } = useSmoothScroll()

  // Parallax: background scrolls up faster than content
  const { scrollY } = useScroll()
  const bgY       = useTransform(scrollY, [0, 700], [0, -180])
  const contentY  = useTransform(scrollY, [0, 700], [0, -50])
  const opacity   = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712]"
    >
      {/* 3D Canvas — parallax layer */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <HeroScene />
      </motion.div>

      {/* Radial accent — also parallaxed */}
      <motion.div
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.12),transparent)]"
        style={{ y: bgY }}
      />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 z-0 bg-gradient-to-t from-[#030712] to-transparent" />

      {/* Content — slightly parallaxed + fades out on scroll */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        style={{ y: contentY, opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <motion.div
            className="space-y-7 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-cyan-400 glass neon-border-accent"
              initial={{ opacity: 0, y: -16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Tester y Desarrollador
            </motion.div>

            <motion.h1
              className="font-extrabold leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <span className="block text-slate-100">Hola, soy</span>
              <span className="block gradient-text glow-text-primary">Charly Castellanos</span>
            </motion.h1>

            <motion.p
              className="text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
            >
              Desarrollador Full Stack especializado en crear experiencias web modernas,
              escalables y visualmente impactantes.
            </motion.p>

            <motion.div
              className="flex items-center justify-center lg:justify-start gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              {socials.map(({ href, icon: Icon, label, external }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  onClick={!external ? (e) => handleSmoothScroll(e, href) : undefined}
                  aria-label={label}
                  className="group p-3 rounded-full glass neon-border-primary transition-all duration-300 hover:neon-border-accent"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <Icon className="w-5 h-5 text-indigo-400 group-hover:text-cyan-400 transition-colors" />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.62 }}
            >
              <motion.a
                href="#projects"
                onClick={(e) => handleSmoothScroll(e, '#projects')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-300 glow-primary"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Code2 className="w-4 h-4" />
                Ver Proyectos
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, '#contact')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl glass neon-border-primary text-indigo-300 hover:text-cyan-400 font-semibold transition-all duration-300"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Contáctame
              </motion.a>
            </motion.div>

            <motion.a
              href="#about"
              onClick={(e) => handleSmoothScroll(e, '#about')}
              className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-400 text-sm transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-4 h-4" />
              Conoce más sobre mí
            </motion.a>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            className="relative flex items-center justify-center order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <div className="relative flex items-center justify-center">
              <motion.div
                className="absolute rounded-full border border-indigo-500/25"
                style={{ width: 'calc(100% + 52px)', height: 'calc(100% + 52px)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_12px_4px_rgba(99,102,241,0.6)]" />
              </motion.div>

              <motion.div
                className="absolute rounded-full border border-cyan-500/18"
                style={{ width: 'calc(100% + 96px)', height: 'calc(100% + 96px)' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_3px_rgba(6,182,212,0.7)]" />
              </motion.div>

              <div className="absolute rounded-full bg-indigo-600/15 blur-3xl"
                style={{ width: 'calc(100% + 80px)', height: 'calc(100% + 80px)' }} />

              <motion.div
                className="relative rounded-full overflow-hidden"
                style={{
                  width: 'clamp(13rem, 21vw, 21rem)',
                  height: 'clamp(13rem, 21vw, 21rem)',
                  border: '2px solid rgba(99,102,241,0.4)',
                  boxShadow: '0 0 50px rgba(99,102,241,0.3), 0 0 100px rgba(99,102,241,0.12)',
                }}
                whileHover={{ scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <img
                  src="/images/Foto-Perfil.jpg"
                  alt="Charly Castellanos"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement
                    t.style.display = 'none'
                    const p = t.nextElementSibling as HTMLElement
                    if (p) p.style.display = 'flex'
                  }}
                />
                <div
                  className="w-full h-full bg-gradient-to-br from-indigo-900/80 to-purple-900/80 items-center justify-center text-6xl font-black text-indigo-300"
                  style={{ display: 'none' }}
                >
                  CC
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}
