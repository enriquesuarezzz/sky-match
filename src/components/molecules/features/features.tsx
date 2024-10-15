import { RobotoText } from '@/components/atoms/roboto_text'
import Discount from '@/components/atoms/svg/features/discount'
import Dog from '@/components/atoms/svg/features/dog'
import Pilot from '@/components/atoms/svg/features/pilot'
import Plane from '@/components/atoms/svg/features/plane'
import Star from '@/components/atoms/svg/features/star'
import World from '@/components/atoms/svg/features/world'

export default function Features() {
  //feautures data
  const features = [
    {
      icon: <Plane className="size-14 md:size-32" />,
      title: 'Todo tipo de aviones',
      description:
        'Tenemos una amplia gama de aviones disponibles para alquiler, adaptados a tus necesidades operativas.',
    },
    {
      icon: <World className="size-14 md:size-32" />,
      title: 'Infinidad de destinos',
      description:
        'Cualquier destino que se te venga a la mente, tenemos la solución perfecta para ti.',
    },
    {
      icon: <Pilot className="size-14 md:size-32" />,
      title: 'Tripulaciones cualificadas',
      description:
        'Nuestra tripulación está compuesta por pilotos altamente capacitados y personal de cabina experimentado.',
    },
    {
      icon: <Star className="size-14 md:size-32" />,
      title: 'Lujo y confort',
      description:
        'Disfruta de nuestra gama de aviones privados para viajes de lujo y corporativos.',
    },
    {
      icon: <Discount className="size-14 md:size-32" />,
      title: 'Descuentos y ofertas',
      description:
        'Ofrecemos descuentos y ofertas exclusivas para nuestros clientes.',
    },
    {
      icon: <Dog className="size-14 md:size-32" />,
      title: 'Aceptamos mascotas',
      description:
        'Aceptamos ofrecer el servicio de PETC o AVIH para los clientes con mascotas.',
    },
  ]
  return (
    <section className="mx-4 flex flex-col items-center justify-center md:mx-10">
      <div className="flex max-w-[1200px] flex-col gap-10">
        {/* title */}
        <div className="flex max-w-[800px] flex-col gap-6">
          <RobotoText
            text="¿POR QUE VIAJAR CON NOSOTROS?"
            tag="h3"
            fontSize="32px"
          />
          {/* description */}
          <RobotoText
            text="Ofremos los servicios más alla de la seguridad y la comodidad de viajar con confianza. Nuestra experiencia de 15 años en el mundo de la aerolineas nos ha permitido crear un sistema de alquiler de aviones que se adapta a tus necesidades operativas."
            fontSize="16px"
          />
        </div>
        {/* features list */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="flex gap-8 md:items-center md:justify-center"
            >
              {/* icon */}
              {icon}
              {/* title and description */}
              <div className="flex flex-col gap-2">
                <RobotoText text={title} fontSize="20px" className="" />
                <RobotoText text={description} fontSize="16px" className="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
