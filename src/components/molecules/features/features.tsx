import { RobotoText } from '@/components/atoms/roboto_text'
import Plane from '@/components/atoms/svg/plane'
import World from '@/components/atoms/svg/world'

export default function Features() {
  //feautures data
  const features = [
    {
      icon: <Plane className="size-14 md:size-32 lg:size-32" />,
      title: 'title 1 ',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit lacus leo lectus, ',
    },
    {
      icon: <World className="size-14 md:size-32 lg:size-32" />,
      title: 'title 2 ',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit lacus leo lectus, ',
    },
    {
      icon: <Plane className="size-14 md:size-32 lg:size-32" />,
      title: 'title 3 ',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit lacus leo lectus, ',
    },
    {
      icon: <World className="size-14 md:size-32 lg:size-32" />,
      title: 'title 4 ',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit lacus leo lectus, ',
    },
    {
      icon: <Plane className="size-14 md:size-32 lg:size-32" />,
      title: 'title 5 ',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit lacus leo lectus, ',
    },
    {
      icon: <World className="size-14 md:size-32 lg:size-32" />,
      title: 'title 6 ',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit lacus leo lectus, ',
    },
  ]
  return (
    <section className="mx-4 flex flex-col items-center justify-center md:mx-10">
      <div className="flex max-w-[1200px] flex-col gap-10">
        {/* title */}
        <div className="flex max-w-[800px] flex-col gap-6">
          <RobotoText
            text="LOREMP IPSUM DOLOR SIT AMET CONSECTETUR !"
            tag="h3"
            fontSize="32px"
          />
          {/* description */}
          <RobotoText
            text="Lorem ipsum dolor sit amet consectetur adipiscing elit lacus leo lectus,  vivamus tincidunt maecenas vehicula, nullam nisl sollicitudin ante ridiculus commodo pharetra tempor porttitor.  "
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
