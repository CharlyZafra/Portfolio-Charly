'use client'

import { useState, useEffect } from 'react'

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'chat', 'contact', 'game']

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    )

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()

    return () => {
      window.removeEventListener('scroll', updateProgress)
      observer.disconnect()
    }
  }, [])

  return { progress, activeSection }
}
