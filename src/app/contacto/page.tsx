import { RobotoText } from '@/components/atoms/roboto_text'
import ContactForm from '@/components/molecules/contact_form/contact_form'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'skyMatch | Contacto',
  description: 'Conectando aerolíneas, optimizando operaciones',
}

export default function Contacto() {
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
      <div className="flex flex-col items-center justify-center">
        <div className="mx-auto max-w-8xl px-4 xl:px-10">
          <div className="flex flex-col items-center justify-center pt-2 md:pt-10">
            <RobotoText
              text="Contacto"
              fontSize="48px"
              style="bold"
              className="text-bold text-orange pt-6 md:pt-0"
            />
            <RobotoText
              text="¿Tienes alguna consulta? Ponte en contacto con nosotros"
              fontSize="18px"
              className="text-bold pb-6 pt-2 text-center md:pb-10 md:pt-6"
            />
          </div>
          {/* contact form component */}
          <ContactForm />
        </div>
      </div>
    </main>
  )
}
