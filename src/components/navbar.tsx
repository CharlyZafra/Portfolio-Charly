'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ClientOnly } from './client-only'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Inicio', href: '#home' },
    { name: 'Sobre Mí', href: '#about' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Chat', href: '#chat' },
    { name: 'Contacto', href: '#contact' },
  ]

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
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30 shadow-lg shadow-black/5' 
          : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-md'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,2rem)]">
        <div className="flex items-center justify-between h-[clamp(3.5rem,8vh,5rem)]">
          <motion.div
            className="flex-shrink-0 font-bold text-[clamp(1.125rem,3vw,1.5rem)] text-primary drop-shadow-sm"
            whileHover={{ scale: 1.05 }}
          >
            Portfolio
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-[clamp(0.5rem,2vw,1rem)]">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="text-foreground/90 hover:text-primary px-[clamp(0.5rem,2vw,0.75rem)] py-[clamp(0.25rem,1vw,0.5rem)] rounded-lg text-[clamp(0.875rem,2.5vw,1rem)] font-medium transition-all duration-200 hover:bg-white/20 dark:hover:bg-gray-800/30 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
              <ClientOnly fallback={<div className="w-5 h-5" />}>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-[clamp(0.375rem,1.5vw,0.5rem)] rounded-lg text-foreground/90 hover:text-primary transition-all duration-200 hover:bg-white/20 dark:hover:bg-gray-800/30 backdrop-blur-sm"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </ClientOnly>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-[clamp(0.25rem,1vw,0.5rem)]">
            <ClientOnly fallback={<div className="w-5 h-5" />}>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-[clamp(0.375rem,1.5vw,0.5rem)] rounded-lg text-foreground/90 hover:text-primary transition-all duration-200 hover:bg-white/20 dark:hover:bg-gray-800/30 backdrop-blur-sm"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </ClientOnly>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-[clamp(0.375rem,1.5vw,0.5rem)] rounded-lg text-foreground/90 hover:text-primary transition-all duration-200 hover:bg-white/20 dark:hover:bg-gray-800/30 backdrop-blur-sm"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30 shadow-lg shadow-black/5"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="px-[clamp(0.5rem,2vw,0.75rem)] pt-[clamp(0.5rem,2vw,0.75rem)] pb-[clamp(0.75rem,3vw,1rem)] space-y-[clamp(0.25rem,1vw,0.5rem)] sm:px-[clamp(0.75rem,3vw,1rem)] bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  handleSmoothScroll(e, item.href)
                  setIsOpen(false)
                }}
                className="text-foreground/90 hover:text-primary block px-[clamp(0.75rem,3vw,1rem)] py-[clamp(0.5rem,2vw,0.75rem)] rounded-lg text-[clamp(1rem,4vw,1.125rem)] font-medium transition-all duration-200 hover:bg-white/30 dark:hover:bg-gray-800/40 backdrop-blur-sm"
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
