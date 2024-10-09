import CardsSection from '@/components/molecules/cards_section/cards_section'
import Features from '@/components/molecules/features/features'
import FirstSection from '@/components/molecules/first_section/first_section'
import Header from '@/components/molecules/header/header'
import Highlights from '@/components/molecules/highlights/highlights'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'skyMatch | Inicio',
  description: 'Conectando aerolíneas, optimizando operaciones',
}

export default function Home() {
  return (
    <main className="flex flex-col">
      <Header />
      <CardsSection />
      <FirstSection />
      <Features />
      <Highlights />
    </main>
  )
}
