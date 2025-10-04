import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
import { PublicChat } from '@/components/public-chat'
import { Contact } from '@/components/contact'

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <About />
      <Skills />
      <PublicChat />
      <Contact />
    </div>
  )
}
