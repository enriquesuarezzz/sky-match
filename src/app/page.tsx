import Header from '@/components/molecules/header/header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'skyMatch | Inicio',
  description: 'Conectando aerolíneas, optimizando operaciones',
}

export default function Home() {
  return <Header />
}
