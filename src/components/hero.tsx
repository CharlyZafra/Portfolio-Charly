'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown, Instagram, Phone, Mail } from 'lucide-react'

export function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20" ref={ref}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Texto Principal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-4 lg:space-y-6 order-2 lg:order-1"
          >
            <motion.h1
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight"
              style={{ fontSize: 'clamp(2rem, 8vw, 4.5rem)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hola, soy{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Charly Castellanos
              </span>
            </motion.h1>
            
            <motion.p
              className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Desarrollador Full Stack especializado en crear experiencias web modernas y funcionales
            </motion.p>
            
            <motion.div
              className="flex justify-center lg:justify-start space-x-4 lg:space-x-6 mt-6 lg:mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.a
                href="https://www.instagram.com/its_charlspapu/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
              <motion.a
                href="https://wa.me/50489095773"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, '#contact')}
                className="p-2 sm:p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
            </motion.div>
            
            <motion.div
              className="mt-6 lg:mt-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.a
                href="#about"
                onClick={(e) => handleSmoothScroll(e, '#about')}
                className="inline-flex items-center space-x-2 text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>Conoce más sobre mí</span>
                <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Foto de Perfil */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center order-1 lg:order-2"
          >
            <div className="relative">
              {/* Fondo animado */}
              <motion.div
                className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Contenedor de la imagen */}
              <motion.div
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 sm:border-4 border-primary/20 shadow-2xl"
                style={{ 
                  width: 'clamp(16rem, 25vw, 24rem)',
                  height: 'clamp(16rem, 25vw, 24rem)'
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Tu foto de perfil - Reemplaza con tu imagen */}
                <img 
                  src="/images/Foto-Perfil.jpg" 
                  alt="Charly Castellanos - Desarrollador Full Stack"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Si la imagen no se encuentra, muestra el placeholder
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = target.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                
                {/* Placeholder cuando no hay imagen */}
                <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center" style={{ display: 'none' }}>
                  <div className="text-6xl font-bold text-primary/60">CC</div>
                </div>
                
                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </motion.div>

              {/* Elementos decorativos flotantes */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-primary/30 rounded-full"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-6 h-6 bg-accent/30 rounded-full"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
              <motion.div
                className="absolute top-1/3 -left-8 w-4 h-4 bg-primary/40 rounded-full"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
