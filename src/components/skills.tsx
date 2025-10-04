'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skills = [
  { name: 'React', level: 90 },
  { name: 'Next.js', level: 85 },
  { name: 'TypeScript', level: 80 },
  { name: 'React Native', level: 50 },
  { name: 'Node.js', level: 85 },
  { name: 'Python', level: 75 },
  { name: 'PostgreSQL', level: 80 },
  { name: 'MongoDB', level: 75 },
  { name: 'Docker', level: 70 },
  { name: 'AWS', level: 65 },
  { name: 'Git', level: 90 }
]

const technologies = [
  'JavaScript', 'TypeScript', 'React', 'React Native', 'Next.js', 'Node.js', 'Express', 
  'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 
  'AWS', 'Vercel', 'Git', 'GitHub', 'Tailwind CSS', 'Framer Motion'
]

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section id="skills" className="py-20 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Habilidades
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skill Bars */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Nivel de Competencia
            </h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-secondary/20 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1.5, delay: isInView ? 0.3 + index * 0.1 : 0 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Tecnologías
            </h3>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 bg-secondary/20 text-foreground rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-secondary/10 rounded-lg">
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Actualmente Aprendiendo
              </h4>
              <div className="flex flex-wrap gap-3">
                {['Three.js', 'WebGL', 'Rust', 'Kubernetes'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
