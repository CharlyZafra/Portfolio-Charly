'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import * as THREE from 'three'

function MainGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.13
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.18
  })

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[3.5, 0.5, -3]}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshStandardMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>
    </Float>
  )
}

function SmallOctahedron({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.35
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.25
  })

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>
    </Float>
  )
}

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
  })

  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} position={[-4, -1.5, -4]}>
        <torusKnotGeometry args={[0.8, 0.25, 64, 8]} />
        <meshStandardMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
    </Float>
  )
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} color="#6366f1" intensity={2.5} />
      <pointLight position={[-8, -8, 6]} color="#06b6d4" intensity={1.5} />

      <Stars
        radius={100}
        depth={60}
        count={3500}
        factor={4}
        saturation={0}
        fade
        speed={0.4}
      />

      <MainGeometry />
      <SmallOctahedron position={[-3.5, 2.2, -2]} />
      <SmallOctahedron position={[1.5, -2.8, -3]} />
      <TorusKnot />
    </Canvas>
  )
}
