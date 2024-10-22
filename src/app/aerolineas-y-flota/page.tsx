import AerolineasYFlota from '@/components/molecules/airlines_and_aircrafts_info/airlines_and_aircrafts_info'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'skyMatch | Aerolíneas y Flota',
  description: 'Conectando aerolíneas, optimizando operaciones',
}

export default function AerolineasYFlotaPage() {
  return (
    <main className="flex flex-col">
      {/* header image */}
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGES_PATH}images/plane_flying.avif`}
        alt="plane flying image"
        width={1384}
        height={420}
        className="max-h-[500px] w-full object-cover"
        unoptimized
      />
      <AerolineasYFlota />
    </main>
  )
}
