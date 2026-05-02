'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2, Gamepad2 } from 'lucide-react'
import { navItems, gameNavItem } from '@/data/nav'
import { useNavbar } from '@/hooks/use-navbar'
import { useScrollProgress } from '@/hooks/use-scroll-progress'

export function Navbar() {
  const { isOpen, scrolled, toggleMenu, handleSmoothScroll } = useNavbar()
  const { activeSection } = useScrollProgress()

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav shadow-[0_4px_30px_rgba(99,102,241,0.08)]' : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, '#home')}
            className="flex items-center gap-2 font-bold text-base group"
            whileHover={{ scale: 1.04 }}
          >
            <div className="p-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 group-hover:bg-indigo-600/35 transition-all">
              <Code2 className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="gradient-text glow-text-primary font-semibold">Charly.dev</span>
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '')
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={`relative px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'text-indigo-300 bg-indigo-500/10'
                      : 'text-slate-400 hover:text-indigo-300 hover:bg-indigo-500/8'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute bottom-0.5 left-3 right-3 h-px rounded-full bg-indigo-400"
                      style={{ boxShadow: '0 0 6px rgba(99,102,241,0.9)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              )
            })}

            {/* Game link */}
            <motion.a
              href={gameNavItem.href}
              onClick={(e) => handleSmoothScroll(e, gameNavItem.href)}
              className={`ml-1 flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg border transition-all duration-200 ${
                activeSection === 'game'
                  ? 'text-cyan-300 border-cyan-400/50 bg-cyan-500/15'
                  : 'text-cyan-400 border-cyan-500/30 bg-cyan-500/8 hover:bg-cyan-500/18 hover:border-cyan-400/50'
              }`}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.96 }}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              {gameNavItem.name}
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-slate-400 hover:text-indigo-300 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden glass-nav border-t border-indigo-500/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '')
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${
                      isActive
                        ? 'text-indigo-300 bg-indigo-500/12 border-l-2 border-indigo-400'
                        : 'text-slate-300 hover:text-indigo-300 hover:bg-indigo-500/8'
                    }`}
                    whileTap={{ scale: 0.97 }}
                  >
                    {item.name}
                  </motion.a>
                )
              })}
              <motion.a
                href={gameNavItem.href}
                onClick={(e) => handleSmoothScroll(e, gameNavItem.href)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-cyan-400 border border-cyan-500/30 bg-cyan-500/8 rounded-lg transition-colors"
                whileTap={{ scale: 0.97 }}
              >
                <Gamepad2 className="w-4 h-4" />
                {gameNavItem.name} — Distraete un rato
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
