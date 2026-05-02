'use client'

import { useState } from 'react'

const sections = [
  { id: 'home',     label: 'Inicio' },
  { id: 'about',    label: 'Sobre Mí' },
  { id: 'skills',   label: 'Habilidades' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'chat',     label: 'Chat' },
  { id: 'contact',  label: 'Contacto' },
  { id: 'game',     label: '¿Aburrido?' },
]

export function useSectionDots() {
  const [hovered, setHovered] = useState<string | null>(null)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return { sections, hovered, setHovered, scrollTo }
}
