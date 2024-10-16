import { RobotoText } from '@/components/atoms/roboto_text'

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="relative h-full max-h-[700px] w-full">
      {/* header image */}
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGES_PATH}images/header.avif`}
        alt="plane flying image"
        width={250}
        height={250}
        unoptimized
        priority
        className="h-full max-h-[600px] w-full"
      />

      {/* header text */}
      <div className="absolute top-2/4 flex flex-col gap-2 pb-10 pl-10 pt-0 md:pl-32 md:pt-24 lg:pl-48 lg:pt-32">
        {/* title */}
        <RobotoText
          tag="h1"
          text="Conectando aerolíneas, optimizando operaciones"
          fontSize="32px"
          style="bold"
          className="text-white"
        />
        {/* subtitle */}
        <RobotoText
          text="Conecta. Alquila. Despega."
          fontSize="18px"
          className="text-white"
        />
        {/* button */}

        <Link
          className="w-fit rounded-full bg-green-700/55 p-2 hover:bg-green-700 md:p-3"
          href="/servicios"
        >
          <RobotoText
            text="Más información"
            fontSize="16px"
            className="text-white"
          />
        </Link>
      </div>
    </header>
  )
}
