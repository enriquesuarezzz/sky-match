import { RobotoText } from '@/components/atoms/roboto_text'
import Accordion from '@/components/molecules/accordion/accordion'
import AccordionContent from '@/components/molecules/accordion/accordion_content'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'skyMatch | Servicios',
  description: 'Conectando aerolíneas, optimizando operaciones',
}

export default function Servicios() {
  const accordionOne = [
    {
      title: 'accordion title 1',
      content: <AccordionContent one />,
    },
  ]
  const accordionTwo = [
    {
      title: 'accordion title 2',
      content: <AccordionContent two />,
    },
  ]
  const accordionThree = [
    {
      title: 'accordion title 3',
      content: <AccordionContent three />,
    },
  ]
  return (
    <main className="flex flex-col">
      {/* header image */}
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGES_PATH}images/services_header.avif`}
        alt="plane flying image"
        width={1384}
        height={420}
        className="max-h-[500px] w-full object-cover"
        unoptimized
      />
      {/* title and subtitle */}
      <div className="flex flex-col items-center justify-center pt-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <RobotoText
            tag="h1"
            text="Nuestros servicios"
            fontSize="32px"
            style="bold"
            className=""
          />
          <RobotoText
            text="Conectando aerolíneas, optimizando operaciones"
            fontSize="18px"
            className=""
          />
        </div>
      </div>
      {/* services section with image and accordion */}
      <section className="mx-10 flex items-center justify-between gap-10 pt-10">
        <div className="flex flex-col">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_PATH}images/services_header.avif`}
            alt="plane flying image"
            width={500}
            height={500}
            unoptimized
            className="h-full max-h-[430px] w-full object-cover md:max-w-[430px]"
          />
          <div className="max-w-[430px] p-4">
            <Accordion items={accordionOne} />
          </div>
        </div>
        <div className="flex flex-col">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_PATH}images/services_header.avif`}
            alt="plane flying image"
            width={500}
            height={500}
            unoptimized
            className="h-full max-h-[430px] w-full object-cover md:max-w-[430px]"
          />
          <div className="max-w-[430px] p-4">
            <Accordion items={accordionTwo} />
          </div>
        </div>
        <div className="flex flex-col">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_PATH}images/services_header.avif`}
            alt="plane flying image"
            width={500}
            height={500}
            unoptimized
            className="h-full max-h-[430px] w-full object-cover md:max-w-[430px]"
          />
          <div className="max-w-[430px] p-4">
            <Accordion items={accordionThree} />
          </div>
        </div>
      </section>
    </main>
  )
}
