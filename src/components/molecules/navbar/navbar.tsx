'use client'
import { RobotoText } from '@/components/atoms/roboto_text'
import Link from 'next/link'
import BlackLogo from '@/components/atoms/svg/black_logo'
import LogIn from '@/components/atoms/svg/log_in'

export default function Navbar() {
  return (
    <nav className="absolute top-0 flex w-full items-center justify-center gap-1 pt-0 md:gap-10 md:pt-16">
      {/* logo */}
      <BlackLogo />
      {/* links */}
      <div className="flex items-center justify-center gap-3 md:gap-14 lg:gap-20">
        {/* Home */}
        <Link href={'/'}>
          <RobotoText
            text="Inicio"
            fontSize="20px"
            className="text-white hover:text-blue"
          />
        </Link>

        {/* Services */}
        <Link href={'/servicios'}>
          <RobotoText
            text="Servicios"
            fontSize="20px"
            className="text-white hover:text-blue"
          />
        </Link>
        {/* Airlines and Planes */}
        <Link href={'/reservar'}>
          <RobotoText
            text="Reservar"
            fontSize="20px"
            className="text-white hover:text-blue"
          />
        </Link>
        {/* Contact */}
        <Link href={'/contacto'}>
          <RobotoText
            text="Contacto"
            fontSize="20px"
            className="text-white hover:text-blue"
          />
        </Link>
        <Link href={'/login'} className="mr-2">
          <LogIn />
        </Link>
      </div>
    </nav>
  )
}
