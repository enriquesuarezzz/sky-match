import { RobotoText } from '@/components/atoms/roboto_text'
import Image from 'next/image'
export default function FirstSection() {
  return (
    <section className="w-full pb-32 pt-10 md:pt-32">
      <div className="flex h-full flex-col items-center justify-between bg-gray-500/15 md:flex-row">
        <div className="mx-8 flex max-w-[600px] flex-col gap-4 md:mx-20">
          {/* title */}
          <RobotoText
            text="Despreocupate de buscar entre cientos de aerolíneas de todo el mundo"
            tag="h3"
            fontSize="32px"
            className="pt-4 md:pt-0"
          />
          {/* description */}
          <RobotoText
            text="Nunca había sido tan fácil buscar la mejor opción acorde a tus necesidades operativas. Con nuestro sistema de alquiler de aviones, podrá alquilar el avion que necesites y lo que necesites. ¡Confiar en nuestro servicio es nuestra mejor inversión!"
            fontSize="16px"
          />
        </div>
        {/* image */}
        <div className="mx-8 max-w-[500px] md:mx-20 md:max-w-[600px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_PATH}images/plane_sunset.avif`}
            alt="plane flying during sunset image"
            width={700}
            height={800}
            unoptimized
            className="w-full rounded-3xl pt-4 md:rounded-2xl md:pt-0"
          />
        </div>
      </div>
    </section>
  )
}
