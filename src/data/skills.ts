import {
  SiJavascript, SiTypescript, SiPython,
  SiReact, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiExpress, SiFastapi,
  SiPostgresql, SiMongodb, SiRedis,
  SiDocker, SiVercel, SiGit, SiGithub,
  SiFramer,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import type { IconType } from 'react-icons'

export interface TechItem {
  name: string
  Icon: IconType
  color: string
}

export interface TechCategory {
  label: string
  accent: string
  items: TechItem[]
}

export const techCategories: TechCategory[] = [
  {
    label: 'Lenguajes',
    accent: '#f59e0b',
    items: [
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
      { name: 'Python',     Icon: SiPython,     color: '#4B8BBE' },
    ],
  },
  {
    label: 'Frontend',
    accent: '#6366f1',
    items: [
      { name: 'React',         Icon: SiReact,       color: '#61DAFB' },
      { name: 'Next.js',       Icon: SiNextdotjs,   color: '#aaaaaa' },
      { name: 'React Native',  Icon: SiReact,       color: '#61DAFB' },
      { name: 'Tailwind CSS',  Icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Framer Motion', Icon: SiFramer,      color: '#9D72FF' },
    ],
  },
  {
    label: 'Backend',
    accent: '#10b981',
    items: [
      { name: 'Node.js', Icon: SiNodedotjs, color: '#68A063' },
      { name: 'Express', Icon: SiExpress,   color: '#aaaaaa' },
      { name: 'FastAPI', Icon: SiFastapi,   color: '#009688' },
    ],
  },
  {
    label: 'Bases de Datos',
    accent: '#f97316',
    items: [
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB',    Icon: SiMongodb,    color: '#47A248' },
      { name: 'Redis',      Icon: SiRedis,      color: '#DC382D' },
    ],
  },
  {
    label: 'DevOps & Herramientas',
    accent: '#8b5cf6',
    items: [
      { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
      { name: 'AWS',    Icon: FaAws,    color: '#FF9900' },
      { name: 'Vercel', Icon: SiVercel, color: '#cccccc' },
      { name: 'Git',    Icon: SiGit,    color: '#F05032' },
      { name: 'GitHub', Icon: SiGithub, color: '#cccccc' },
    ],
  },
]

export const learning = ['Three.js', 'WebGL', 'Rust', 'Kubernetes']
