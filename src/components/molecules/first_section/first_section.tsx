import { RobotoText } from '@/components/atoms/roboto_text'
import Image from 'next/image'
export default function FirstSection() {
  return (
    <section className="w-full pb-32 pt-10 md:pt-32">
      <div className="flex h-full flex-col items-center justify-between bg-gray-500/15 md:flex-row">
        <div className="mx-8 flex max-w-[600px] flex-col gap-4 md:mx-20">
          <RobotoText
            text="Lorem ipsum dolor sit amet consectetur adipiscing"
            tag="h3"
            fontSize="32px"
            className="pt-4 md:pt-0"
          />
          <RobotoText
            text="Lorem ipsum dolor sit amet consectetur adipiscing elit lacus leo lectus, justo est aliquet ullamcorper magna iaculis vivamus tincidunt maecenas vehicula, nullam nisl sollicitudin ante ridiculus commodo pharetra tempor porttitor.  "
            tag="h3"
            fontSize="16px"
          />
        </div>
        <div className="max-w-[500px] md:max-w-[600px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_PATH}images/plane_sunset.avif`}
            alt="plane flying during sunset image"
            width={700}
            height={800}
            unoptimized
            className="w-full rounded-3xl pt-4 md:rounded-none md:rounded-l-2xl md:pt-0"
          />
        </div>
      </div>
    </section>
  )
}
