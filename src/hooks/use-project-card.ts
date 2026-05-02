'use client'

import { useState, useRef } from 'react'

export function useProjectCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 6
    const y = (-(e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 6
    setTilt({ x, y })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return { tilt, cardRef, handleMouseMove, handleMouseLeave }
}
