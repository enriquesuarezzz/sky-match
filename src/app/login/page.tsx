import LoginForm from '@/components/molecules/log_in_form/log_in_form'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'skyMatch | Login',
  description: 'Conectando aerolíneas, optimizando operaciones',
}

export default function Login() {
  return (
    <main className="flex flex-col">
      {/* header image */}
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGES_PATH}images/header.avif`}
        alt="airport platform image"
        width={1384}
        height={420}
        className="max-h-[500px] w-full object-cover"
        unoptimized
      />
      <LoginForm />
    </main>
  )
}
