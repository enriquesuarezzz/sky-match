'use client'
import { RobotoText } from '@/components/atoms/roboto_text'
import Link from 'next/link'
import BlackLogo from '@/components/atoms/svg/black_logo'
import Image from 'next/image'
import Burguer from '@/components/atoms/svg/burguer'
import Close from '@/components/atoms/svg/close'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <nav className="absolute top-0 flex w-full items-center justify-center gap-24 pt-0 md:gap-10 md:pt-16">
      {/* logo */}
      <BlackLogo className="size-28 md:size-44" />
      {/* links */}
      <div className="hidden gap-1 md:flex md:gap-6 lg:gap-20">
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
        <Link href={'/aerolineas-y-flota'}>
          <RobotoText
            text="Aerolineas y flota"
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
      </div>
      {/* Mobile burguer button */}
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
        <div className="bg-blue-500/60 fixed right-0 top-0 z-50 flex h-full w-80 flex-col p-6 px-10 shadow-lg md:hidden">
          <div className="mb-4 flex w-full justify-between">
            {/* Logo */}
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_PATH}images/logo.avif`}
              alt="plane flying image"
              width={60}
              height={60}
              unoptimized
              priority
            />
            {/* title */}
            <RobotoText
              text="SkyMatch"
              fontSize="20px"
              className="text-white"
            />
            {/* close button */}
            <button onClick={toggleMenu}>
              <Close />
            </button>
          </div>
          {/* links */}
          <div className="flex flex-col gap-2">
            {/* Home */}
            <Link href={'/'}>
              <RobotoText
                text="Inicio"
                fontSize="18px"
                className="text-white hover:text-blue"
              />
            </Link>
            {/* About Us */}
            <Link href={'/'}>
              <RobotoText
                text="Sobre Nosotros"
                fontSize="18px"
                className="text-white hover:text-blue"
              />
            </Link>
            {/* Services */}
            <Link href={'/'}>
              <RobotoText
                text="Servicios"
                fontSize="18px"
                className="text-white hover:text-blue"
              />
            </Link>
            {/* Airlines and Planes */}
            <Link href={'/'}>
              <RobotoText
                text="Aerolineas y flota"
                fontSize="18px"
                className="text-white hover:text-blue"
              />
            </Link>
            {/* Contact */}
            <Link href={'/'}>
              <RobotoText
                text="Contacto"
                fontSize="18px"
                className="text-white hover:text-blue"
              />
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
