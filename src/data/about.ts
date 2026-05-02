import { Briefcase, Code, GraduationCap } from 'lucide-react'

export const stats = [
  { label: 'Años exp.',    value: '3+',  icon: Briefcase },
  { label: 'Proyectos',    value: '10+', icon: Code },
  { label: 'Tecnologías',  value: '20+', icon: GraduationCap },
]

export const stack = [
  {
    title: 'Frontend',
    dot: 'bg-indigo-500',
    items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'React Native'],
  },
  {
    title: 'Backend',
    dot: 'bg-cyan-500',
    items: ['Node.js / Express', 'PostgreSQL / MongoDB', 'API REST / GraphQL', 'Docker / AWS'],
  },
]
