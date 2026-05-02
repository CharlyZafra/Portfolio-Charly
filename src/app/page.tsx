import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { PublicChat } from '@/components/public-chat'
import { Contact } from '@/components/contact'
import { MiniGame } from '@/components/game'
import { ScrollProgressBar } from '@/components/scroll-progress-bar'
import { SectionDots } from '@/components/section-dots'

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <SectionDots />
      <div className="overflow-x-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <PublicChat />
        <MiniGame />
        <Contact />
      </div>
    </>
  )
}
