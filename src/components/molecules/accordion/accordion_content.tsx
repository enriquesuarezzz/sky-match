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
        title: 'service 1  ',
        price: '20000€',
        description:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit lacus leo lectus, justo est aliquet ullamcorper magna iaculis',
      },
      {
        title: 'service 1 ',
        price: '30000€',
        description:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit lacus leo lectus, justo est aliquet ullamcorper magna iaculis',
      },
    ],
    two: [
      {
        title: 'service 1 ',
        price: '80000€',
        description:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit lacus leo lectus, justo est aliquet ullamcorper magna iaculis',
      },
      {
        title: 'service 2  ',
        price: '1000000€',
        description:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit lacus leo lectus, justo est aliquet ullamcorper magna iaculis',
      },
    ],
    three: [
      {
        title: 'service 1 ',
        price: '8345000€',
        description:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit lacus leo lectus, justo est aliquet ullamcorper magna iaculis',
      },
      {
        title: 'service 2  ',
        price: '45600€',
        description:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit lacus leo lectus, justo est aliquet ullamcorper magna iaculis',
      },
    ],
  }

  return (
    <section className="flex flex-col gap-6">
      {/* Create an accordion based on the props using the information from the services array */}
      {/* map of the items of the services array */}
      {one &&
        services.one.map((item, index) => (
          <div key={index} className="flex flex-row p-4">
            <div className="flex flex-col">
              {/* title */}
              <RobotoText
                text={item.title}
                fontSize="20px"
                className="text-gray-500"
              />
              {/* price */}
              <RobotoText
                text={item.price}
                fontSize="32px"
                className="text-blue-500 font-bold"
              />
            </div>
            {/* description */}
            <RobotoText
              text={item.description}
              fontSize="16px"
              className="flex items-center justify-center pl-4 text-center text-gray-400"
            />
          </div>
        ))}
      {/* Create an accordion based on the props using the information from the services array */}
      {/* map of the items of the services array */}
      {two &&
        services.two.map((item, index) => (
          <div key={index} className="flex flex-row p-4">
            {/* title  */}
            <div className="flex flex-col">
              <RobotoText
                text={item.title}
                fontSize="20px"
                className="text-gray-500"
              />
              {/* price */}
              <RobotoText
                text={item.price}
                fontSize="32px"
                className="text-blue-500 font-bold"
              />
            </div>
            {/* description */}
            <RobotoText
              text={item.description}
              fontSize="16px"
              className="flex items-center justify-center pl-4 text-center text-gray-400"
            />
          </div>
        ))}
      {/* map of the items of the services array */}
      {three &&
        services.two.map((item, index) => (
          <div key={index} className="flex flex-row p-4">
            {/* title  */}
            <div className="flex flex-col">
              <RobotoText
                text={item.title}
                fontSize="20px"
                className="text-gray-500"
              />
              {/* price */}
              <RobotoText
                text={item.price}
                fontSize="32px"
                className="text-blue-500 font-bold"
              />
            </div>
            {/* description */}
            <RobotoText
              text={item.description}
              fontSize="16px"
              className="flex items-center justify-center pl-4 text-center text-gray-400"
            />
          </div>
        ))}
    </section>
  )
}

export default AccordionContent
