'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 40%, #22d3ee 100%)',
        boxShadow: '0 0 10px rgba(99,102,241,0.9), 0 0 24px rgba(99,102,241,0.5), 0 0 40px rgba(34,211,238,0.3)',
      }}
    />
  )
}
