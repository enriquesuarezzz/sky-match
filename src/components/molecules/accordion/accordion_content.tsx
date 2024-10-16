import { RobotoText } from '@/components/atoms/roboto_text'
import React from 'react'

interface AccordionProps {
  one?: boolean
  two?: boolean
  three?: boolean
}

const AccordionContent: React.FC<AccordionProps> = ({ one, two, three }) => {
  //services data
  const services = {
    one: [
      {
        title: 'Aviones Comerciales Pequeños',
        price: 'Desde 4000€ hasta 6500€ por hora de vuelo',
        description:
          'Entre estos aviones podemos encontar principalmente ATR72',
      },
      {
        title: 'Aviones Comerciales Medianos',
        price: 'Desde 10000€ hasta 20000€ por hora de vuelo',
        description:
          'Entre estos aviones podemos encontar Boeing 737, Boeing 737-Max, Airbus A319, Airbus A320',
      },
      {
        title: 'Aviones Comerciales Grandes',
        price: 'Desde 25000€ hasta 60000€ por hora de vuelo',
        description:
          'Entre estos aviones podemos encontrar Boeing 777, Airbus A330, Airbus A340, Airbus A350',
      },
    ],
    two: [
      {
        title: 'Jets Ligeros',
        price: 'Desde 1500€ hasta 3500€ por hora de vuelo',
        description:
          'Entre estos aviones podemos encontrar Cessna Citation CJ3 o Phenom 300 ',
      },
      {
        title: 'Jets Medianos',
        price: 'Desde 3500€ hasta 7000€ por hora de vuelo',
        description:
          'Entre estos aviones podemos encontrar Hawker 800 o Learjet 60',
      },
    ],
  }

  return (
    <section className="flex flex-col gap-6">
      {one &&
        services.one.map((item, index) => (
          <div
            key={index}
            className="m-1 flex flex-col items-start justify-between rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md md:flex-row md:items-center"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center gap-2">
                {/* Title */}
                <RobotoText
                  text={item.title}
                  fontSize="20px"
                  className="w-1/2 font-medium text-gray-900"
                />
                {/* Description */}
                <RobotoText
                  text={item.description}
                  fontSize="16px"
                  className="w-1/2 text-gray-600"
                />
              </div>
              {/* Price */}
              <RobotoText
                text={item.price}
                fontSize="14px"
                className="pt-3 text-center"
              />
            </div>
          </div>
        ))}

      {two &&
        services.two.map((item, index) => (
          <div
            key={index}
            className="m-1 flex flex-col items-start justify-between rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md md:flex-row md:items-center"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center gap-2">
                {/* Title */}
                <RobotoText
                  text={item.title}
                  fontSize="20px"
                  className="w-1/2 font-medium text-gray-900"
                />
                {/* Description */}
                <RobotoText
                  text={item.description}
                  fontSize="16px"
                  className="w-1/2 text-gray-600"
                />
              </div>
              {/* Price */}
              <RobotoText
                text={item.price}
                fontSize="14px"
                className="pt-3 text-center"
              />
            </div>
          </div>
        ))}
    </section>
  )
}

export default AccordionContent
