'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <section id="about" className="py-20 bg-secondary/10" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Sobre Mí
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 lg:pr-4"
          >
            <p className="text-base text-muted-foreground leading-relaxed">
              Soy un desarrollador Full Stack apasionado por crear soluciones tecnológicas 
              innovadoras. Con experiencia en tecnologías modernas como React, Next.js, 
              Node.js y bases de datos, me especializo en desarrollar aplicaciones web 
              escalables y de alto rendimiento.
            </p>
            
            <p className="text-base text-muted-foreground leading-relaxed">
              Mi enfoque se centra en escribir código limpio, mantenible y seguir las 
              mejores prácticas de desarrollo. Siempre estoy buscando nuevos desafíos 
              y oportunidades para crecer profesionalmente.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Frontend</h3>
                <ul className="text-muted-foreground space-y-1.5 text-sm">
                  <li>React / Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">Backend</h3>
                <ul className="text-muted-foreground space-y-1.5 text-sm">
                  <li>Node.js / Express</li>
                  <li>PostgreSQL / MongoDB</li>
                  <li>API REST / GraphQL</li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end lg:pl-4"
          >
            <div className="relative w-80 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-10"></div>
              
              {/* Imagen de perfil */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/Foto-SobreMi.jpg"
                  alt="Charly Castellanos - Desarrollador Full Stack"
                  fill
                  className="object-cover object-center scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              {/* Marco decorativo */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl z-20"></div>
              
              {/* Overlay sutil en la parte inferior */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/15 to-transparent z-20"></div>
              
              {/* Elementos decorativos */}
              <motion.div
                className="absolute -top-2 -right-2 w-12 h-12 border-2 border-primary/40 rounded-full bg-background/80 backdrop-blur-sm z-30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              ></motion.div>
              
              <motion.div
                className="absolute -bottom-1 -left-1 w-6 h-6 bg-accent/60 rounded-full z-30"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              ></motion.div>
              
              {/* Brillo sutil */}
              <div className="absolute top-4 left-4 w-14 h-14 bg-white/10 rounded-full blur-xl z-10"></div>
            </div>
            
            {/* Sombra adicional */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-72 h-6 bg-primary/10 rounded-full blur-lg"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
