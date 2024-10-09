import { RobotoText } from '@/components/atoms/roboto_text'
import Image from 'next/image'

export default function CardsSection() {
  //cards data
  const features = [
    {
      image: 'images/header.avif',
      alt: '',
      title: 'title 1 ',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit lacus leo lectus, justo est aliquet ullamcorper magna iaculis',
    },
    {
      image: 'images/header.avif',
      alt: '',
      title: 'title 2 ',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit lacus leo lectus, justo est aliquet ullamcorper magna iaculis',
    },
    {
      image: 'images/header.avif',
      alt: '',
      title: 'title 3 ',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit lacus leo lectus, justo est aliquet ullamcorper magna iaculis',
    },
  ]
  return (
    <section className="mx-10 flex flex-col items-center justify-center pt-10 md:pt-20">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* title */}
        <RobotoText text="Nuestros Servicios" tag="h2" fontSize="32px" />
        {/* description */}
        <RobotoText
          text="Lorem ipsum dolor sit amet consectetur adipiscing elit lacus leo lectus, justo est aliquet ullamcorper magna iaculis vivamus tincidunt maecenas vehicula, nullam nisl sollicitudin ante ridiculus commodo pharetra tempor porttitor. Hendrerit nisl nascetur dignissim sagittis egestas pellentesque cum rutrum quis nunc, "
          tag="h2"
          fontSize="16px"
          className="max-w-[700px] text-center"
        />
      </div>
      {/* cards */}
      <div className="flex grid-cols-1 flex-col items-center justify-center gap-10 pt-4 md:pt-10 lg:grid lg:grid-cols-3 lg:gap-10">
        {features.map(({ image, alt, title, description }) => (
          <div
            key={title}
            className="relative flex h-full max-h-[600px] max-w-[550px] flex-col items-center justify-center rounded-3xl border bg-transparent"
          >
            {/* card image */}
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_PATH}${image}`}
              width={500}
              height={300}
              alt={alt}
              unoptimized
              className="h-auto w-full object-cover"
            />
            {/* card content */}
            <div className="px-4 py-4 md:px-6">
              {/* card title */}
              <RobotoText
                text={title}
                fontSize="32px"
                className="pt-1 text-center md:pt-4"
              />
              {/* card description */}
              <RobotoText
                text={description}
                fontSize="16px"
                className="px-4 pb-6 pt-4 text-center md:px-6"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
