'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useMainGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!groupRef.current) return
    const group = groupRef.current

    gsap.fromTo(group.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 1.5, ease: 'elastic.out(1, 0.5)', delay: 0.3 }
    )

    gsap.to(group.rotation, {
      y: Math.PI * 2,
      scrollTrigger: { trigger: 'body', start: 'top top', end: '40% top', scrub: 1.5 },
    })

    gsap.to(group.position, {
      z: -8,
      scrollTrigger: { trigger: 'body', start: 'top top', end: '30% top', scrub: 1.5 },
    })

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.13
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.18
  })

  return { meshRef, groupRef }
}

export function useOctahedron(delay = 0) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!groupRef.current) return
    const group = groupRef.current

    gsap.fromTo(group.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 1.2, ease: 'back.out(2)', delay }
    )

    gsap.to(group.rotation, {
      x: Math.PI,
      scrollTrigger: { trigger: 'body', start: 'top top', end: '35% top', scrub: 2 },
    })
  }, [delay])

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.35
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.25
  })

  return { meshRef, groupRef }
}

export function useTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!groupRef.current) return
    const group = groupRef.current

    gsap.fromTo(group.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 1.8, ease: 'elastic.out(1, 0.4)', delay: 0.6 }
    )

    gsap.to(group.rotation, {
      z: -Math.PI,
      scrollTrigger: { trigger: 'body', start: 'top top', end: '40% top', scrub: 2 },
    })
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
  })

  return { meshRef, groupRef }
}
