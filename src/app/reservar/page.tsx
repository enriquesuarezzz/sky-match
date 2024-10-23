import AircraftBook from '@/components/molecules/aircraft_book/aircraft_book'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'skyMatch | Aerolíneas y Flota',
  description: 'Conectando aerolíneas, optimizando operaciones',
}

export default function Reservar() {
  return (
    <main className="flex flex-col">
      {/* header image */}
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGES_PATH}images/booking_page_header.avif`}
        alt="airport platform image"
        width={1384}
        height={420}
        className="max-h-[500px] w-full object-cover"
        unoptimized
      />
      <AircraftBook />
    </main>
  )
}
