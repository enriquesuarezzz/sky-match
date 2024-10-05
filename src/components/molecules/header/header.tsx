'use client'
import { RobotoText } from '@/components/atoms/roboto_text'
import Burguer from '@/components/atoms/svg/burguer'
import Close from '@/components/atoms/svg/close'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <header className="relative h-full max-h-[700px] w-full">
      {/* header image */}
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGES_PATH}images/header.avif`}
        alt="plane flying image"
        width={250}
        height={250}
        unoptimized
        priority
        className="h-full max-h-[700px] w-full"
      />
      <nav className="absolute top-0 flex w-full items-center justify-center gap-24 pt-6 md:gap-10 md:pt-16">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGES_PATH}images/logo.avif`}
          alt="plane flying image"
          width={130}
          height={130}
          unoptimized
          priority
        />
        <div className="hidden gap-1 md:flex md:gap-6 lg:gap-20">
          <Link href={'/'}>
            <RobotoText
              text="Inicio"
              fontSize="20px"
              className="text-white hover:text-blue-700"
            />
          </Link>
          <Link href={'/'}>
            <RobotoText
              text="Sobre Nosotros"
              fontSize="20px"
              className="text-white hover:text-blue-700"
            />
          </Link>
          <Link href={'/'}>
            <RobotoText
              text="Servicios"
              fontSize="20px"
              className="text-white hover:text-blue-700"
            />
          </Link>
          <Link href={'/'}>
            <RobotoText
              text="Aerolineas y flota"
              fontSize="20px"
              className="text-white hover:text-blue-700"
            />
          </Link>
          <Link href={'/'}>
            <RobotoText
              text="Contacto"
              fontSize="20px"
              className="text-white hover:text-blue-700"
            />
          </Link>
        </div>
        <button onClick={toggleMenu} className="md:hidden">
          <Burguer />
        </button>
        {/* Blurred Background Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={toggleMenu} // Allows closing the menu by clicking outside of it
          ></div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed right-0 top-0 z-50 flex h-full w-80 flex-col bg-blue-500/60 p-6 px-10 shadow-lg md:hidden">
            <div className="mb-4 flex w-full justify-between">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES_PATH}images/logo.avif`}
                alt="plane flying image"
                width={60}
                height={60}
                unoptimized
                priority
              />
              <RobotoText
                text="SkyMatch"
                fontSize="20px"
                className="text-white"
              />
              <button onClick={toggleMenu}>
                <Close />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <Link href={'/'}>
                <RobotoText
                  text="Inicio"
                  fontSize="18px"
                  className="text-white hover:text-blue-700"
                />
              </Link>
              <Link href={'/'}>
                <RobotoText
                  text="Sobre Nosotros"
                  fontSize="18px"
                  className="text-white hover:text-blue-700"
                />
              </Link>
              <Link href={'/'}>
                <RobotoText
                  text="Servicios"
                  fontSize="18px"
                  className="text-white hover:text-blue-700"
                />
              </Link>
              <Link href={'/'}>
                <RobotoText
                  text="Aerolineas y flota"
                  fontSize="18px"
                  className="text-white hover:text-blue-700"
                />
              </Link>
              <Link href={'/'}>
                <RobotoText
                  text="Contacto"
                  fontSize="18px"
                  className="text-white hover:text-blue-700"
                />
              </Link>
            </div>
          </div>
        )}
      </nav>
      {/* header text */}
      <div className="absolute top-2/4 flex flex-col gap-2 pb-10 pl-10 pt-0 md:pl-32 md:pt-24 lg:pl-48 lg:pt-32">
        {/* title */}
        <RobotoText
          tag="h1"
          text="Conectando aerolíneas, optimizando operaciones"
          fontSize="32px"
          style="bold"
          className="text-white"
        />
        {/* subtitle */}
        <RobotoText
          text="Conecta. Alquila. Despega."
          fontSize="18px"
          className="text-white"
        />
        {/* button */}
        <button className="w-fit rounded-full bg-green-700/55 p-2 hover:bg-green-700 md:p-3">
          <RobotoText
            text="Más información"
            fontSize="16px"
            className="text-white"
          />
        </button>
      </div>
    </header>
  )
}
