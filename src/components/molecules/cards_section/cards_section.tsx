import { RobotoText } from '@/components/atoms/roboto_text'
import Image from 'next/image'

export default function CardsSection() {
  //cards data
  const features = [
    {
      image: 'images/cabin_crew.avif',
      alt: 'cabin crew in the cockpit',
      title: 'Tripulación cualificada ',
      description:
        'Nuestra tripulación está compuesta por pilotos altamente capacitados y personal de cabina experimentado, listos para cubrir tus necesidades operativas de manera segura y eficiente.',
    },
    {
      image: 'images/aircraft_engine.avif',
      alt: 'aircraft engine',
      title: 'Amplia gama de aeronaves',
      description:
        'Ofrecemos una amplia selección de aviones disponibles para alquiler, adaptados a diversas necesidades operativas. Desde aeronaves pequeñas para vuelos regionales hasta jets comerciales para trayectos largos.',
    },
    {
      image: 'images/private_plane.avif',
      alt: 'private plane interior',
      title: 'Vuela en Aviones Privados ',
      description:
        'Ofrecemos una exclusiva selección de aviones privados disponibles para alquiler, ideales para viajes de lujo y corporativos. Cada aeronave está equipada con las comodidades necesarias para garantizar una experiencia de vuelo excepcional. ',
    },
  ]
  return (
    <section className="mx-10 flex flex-col items-center justify-center pt-10 md:pt-20">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* title */}
        <RobotoText text="Nuestros Servicios" tag="h2" fontSize="32px" />
        {/* description */}
        <RobotoText
          text="En SkyMatch, conectamos aerolíneas que necesitan alquilar aviones y tripulación con proveedores disponibles. Facilitamos la búsqueda y comparación de aeronaves, pilotos y personal de cabina, todo gestionado en tiempo real y con soporte 24/7. "
          fontSize="16px"
          className="max-w-[700px] text-center"
        />
      </div>
      {/* cards */}
      <div className="flex grid-cols-1 flex-col items-center justify-center gap-10 pt-4 md:pt-10 lg:grid lg:grid-cols-3 lg:gap-10">
        {features.map(({ image, alt, title, description }) => (
          <div
            key={title}
            className="relative flex h-full max-h-[500px] max-w-[500px] flex-col items-center justify-center rounded-3xl border bg-transparent"
          >
            {/* card image */}
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_PATH}${image}`}
              width={500}
              height={400}
              alt={alt}
              unoptimized
              className="h-full max-h-[350px] w-full"
            />
            {/* card content */}
            <div className="">
              {/* card title */}
              <RobotoText
                text={title}
                fontSize="20px"
                className="pt-1 text-center md:pt-4"
              />
              {/* card description */}
              <RobotoText
                text={description}
                fontSize="14px"
                className="px-4 pb-6 pt-4 text-center md:px-6"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
