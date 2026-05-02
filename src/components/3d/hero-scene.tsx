'use client'

import { Canvas } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import { useMainGeometry, useOctahedron, useTorusKnot } from '@/hooks/use-hero-scene'

function MainGeometry() {
  const { meshRef, groupRef } = useMainGeometry()

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.5}>
        <mesh ref={meshRef} position={[3.5, 0.5, -3]}>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshStandardMaterial color="#6366f1" wireframe transparent opacity={0.22} />
        </mesh>
      </Float>
    </group>
  )
}

function SmallOctahedron({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const { meshRef, groupRef } = useOctahedron(delay)

  return (
    <group ref={groupRef}>
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={2}>
        <mesh ref={meshRef} position={position}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.45} />
        </mesh>
      </Float>
    </group>
  )
}

function TorusKnot() {
  const { meshRef, groupRef } = useTorusKnot()

  return (
    <group ref={groupRef}>
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={1}>
        <mesh ref={meshRef} position={[-4, -1.5, -4]}>
          <torusKnotGeometry args={[0.8, 0.25, 64, 8]} />
          <meshStandardMaterial color="#8b5cf6" wireframe transparent opacity={0.18} />
        </mesh>
      </Float>
    </group>
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

      <Stars radius={100} depth={60} count={3500} factor={4} saturation={0} fade speed={0.4} />

      <MainGeometry />
      <SmallOctahedron position={[-3.5, 2.2, -2]} delay={0.5} />
      <SmallOctahedron position={[1.5, -2.8, -3]} delay={0.8} />
      <TorusKnot />
    </Canvas>
  )
}

