import { RobotoText } from '@/components/atoms/roboto_text'
import Image from 'next/image'

export default function Highlights() {
  return (
    <section className="flex w-full items-center justify-center pt-10 md:pt-24">
      {/* bg image */}
      <div className="relative w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGES_PATH}images/highlights.avif`}
          alt="plane flying image"
          width={250}
          height={250}
          unoptimized
          priority
          className="max-h-[500px] w-full object-cover"
        />
      </div>
      {/* highlights */}
      <div className="absolute flex w-full items-center justify-between px-4 md:px-11">
        {/* highlight 1 */}
        <div className="flex flex-col items-center">
          <RobotoText text="+100" fontSize="48px" className="text-white" />
          <RobotoText
            text="Aviones"
            fontSize="16px"
            className="text-gray-300"
          />
        </div>
        {/* highlight 2 */}
        <div className="flex flex-col items-center">
          <RobotoText text="+60" fontSize="48px" className="text-white" />
          <RobotoText
            text="Pilotos"
            fontSize="16px"
            className="text-gray-300"
          />
        </div>
        {/* highlight 3 */}
        <div className="flex flex-col items-center">
          <RobotoText text="+40" fontSize="48px" className="text-white" />
          <RobotoText text="Países" fontSize="16px" className="text-gray-300" />
        </div>
        {/* highlight 4 */}
        <div className="flex flex-col items-center">
          <RobotoText text="+10" fontSize="48px" className="text-white" />
          <RobotoText text="Años" fontSize="16px" className="text-gray-300" />
        </div>
      </div>
    </section>
  )
}
