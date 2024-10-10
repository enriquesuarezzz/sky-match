import { RobotoText } from '@/components/atoms/roboto_text'
import Facebook from '@/components/atoms/svg/facebook'
import Instagram from '@/components/atoms/svg/instagram'
import WhiteLogo from '@/components/atoms/svg/white_logo'
import X from '@/components/atoms/svg/x'
import Link from 'next/link'
export default function Footer() {
  return (
    <footer className="bottom-0 mt-10 flex w-full flex-col items-center justify-items-center bg-gray-900 py-10 md:mt-24 md:py-12">
      <WhiteLogo />
      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-3 md:gap-6">
          <Link href={'/'}>
            <RobotoText
              text="Inicio"
              fontSize="18px"
              className="hover:text-blue text-white"
            />
          </Link>
          <Link href={'/'}>
            <RobotoText
              text="Sobre Nosotros"
              fontSize="18px"
              className="hover:text-blue text-white"
            />
          </Link>
          <Link href={'/'}>
            <RobotoText
              text="Servicios"
              fontSize="18px"
              className="hover:text-blue text-white"
            />
          </Link>
          <Link href={'/'}>
            <RobotoText
              text="Aerolineas y flota"
              fontSize="18px"
              className="hover:text-blue text-white"
            />
          </Link>
          <Link href={'/'}>
            <RobotoText
              text="Contacto"
              fontSize="18px"
              className="hover:text-blue text-white"
            />
          </Link>
        </div>
        <div className="flex gap-6">
          <Link
            href={'https://x.com/'}
            className="transition-transform hover:scale-110"
          >
            <X />
          </Link>
          <Link
            href={'https://www.instagram.com/'}
            className="transition-transform hover:scale-110"
          >
            <Instagram />
          </Link>
          <Link
            href={'https://www.facebook.com'}
            className="transition-transform hover:scale-110"
          >
            <Facebook />
          </Link>
        </div>
        <RobotoText
          text="Copyright © 2024. Todos los derechos reservados - <span class='text-blue/50'>Skymatch</span>"
          fontSize="16px"
          className="text-gray-600"
        />
      </div>
    </footer>
  )
}
