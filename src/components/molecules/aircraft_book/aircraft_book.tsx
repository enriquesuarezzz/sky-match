'use client'
import { RobotoText } from '@/components/atoms/roboto_text'
import { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner'
import Modal from 'react-modal'
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'

// Define interfaces for your data
interface Airlines {
  id: number
  name: string
  country: string
  email: string
  rental_role: string
}

interface Aircrafts {
  id: number
  airline_id: number
  type: string
  capacity: number
  maintenance_status: string
  price_per_hour: number
  aircraft_image_url: string
}

export default function AircraftBook() {
  const [airlines, setAirlines] = useState<Airlines[]>([])
  const [aircrafts, setAircrafts] = useState<Aircrafts[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedAircraft, setSelectedAircraft] = useState<Aircrafts | null>(
    null,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUserSignedIn, setIsUserSignedIn] = useState(false)

  useEffect(() => {
    // Check if user token is present (simple authentication check)
    const token = localStorage.getItem('authToken')
    setIsUserSignedIn(!!token)

    // Fetch airline and aircraft data
    const fetchData = async () => {
      try {
        const responseAirlines = await fetch(
          process.env.NEXT_PUBLIC_API_URL + '/airlines',
        )
        const responseAircrafts = await fetch(
          process.env.NEXT_PUBLIC_API_URL + '/aircrafts',
        )
        const dataAirlines = await responseAirlines.json()
        const dataAircrafts = await responseAircrafts.json()
        setAirlines(Array.isArray(dataAirlines) ? dataAirlines : [])
        setAircrafts(Array.isArray(dataAircrafts) ? dataAircrafts : [])
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Handle aircraft rental click
  const handleAircraftClick = (aircraft: Aircrafts) => {
    if (!isUserSignedIn) {
      alert('Please sign in to rent a plane')
      return
    }
    setSelectedAircraft(aircraft)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedAircraft(null)
  }

  return (
    <section className="flex flex-col items-center justify-center bg-gray-100 py-10">
      {isLoading ? (
        <div className="flex h-40 flex-col items-center justify-center">
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            visible={true}
          />
          <RobotoText text="Cargando..." fontSize="20px" style="bold" />
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={20}
          slidesPerView={'auto'}
          loop={true}
          speed={3000}
          autoplay={{ delay: 0 }}
        >
          {aircrafts.map((aircraft) => (
            <SwiperSlide
              key={aircraft.id}
              className="w-full max-w-[300px]"
              onClick={() => handleAircraftClick(aircraft)}
            >
              <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-lg">
                <RobotoText text={aircraft.type} fontSize="18px" style="bold" />
                <img
                  src={aircraft.aircraft_image_url}
                  alt={aircraft.type}
                  className="mt-3 h-48 w-full rounded-lg object-cover shadow-sm"
                />
                <RobotoText
                  text={`Capacidad: ${aircraft.capacity} pasajeros`}
                  fontSize="18px"
                  className="mt-2 text-center text-gray-500"
                />
                <RobotoText
                  text={`Precio por hora: ${aircraft.price_per_hour} €`}
                  fontSize="18px"
                  className="mt-1 text-center text-gray-500"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <div className="flex flex-col items-center p-4">
          <RobotoText
            text={`Alquilar el avión ${selectedAircraft?.type}`}
            fontSize="20px"
            style="bold"
          />
          <form className="mt-4 flex flex-col">
            <label className="mt-4">
              <RobotoText
                text="Fecha de alquiler"
                fontSize="20px"
                style="bold"
              />
              <input type="date" className="mt-2 rounded-md border p-2" />
            </label>
            <label>
              <RobotoText
                text="Duración del alquiler"
                fontSize="20px"
                style="bold"
              />
              <input
                type="number"
                className="mt-2 rounded-md border p-2"
                placeholder="(En horas)"
              />
            </label>
            <label>
              <RobotoText
                text="Introduzca el trayecto previsto"
                fontSize="20px"
                style="bold"
              />
              <input
                type="text"
                className="mt-2 rounded-md border p-2"
                placeholder="ej: ACE-BCN"
              />
            </label>
            <button type="submit" className="mt-4 rounded-md bg-blue p-2">
              <RobotoText
                text="Enviar solicitud"
                fontSize="20px"
                style="bold"
              />
            </button>
          </form>
          <button
            onClick={closeModal}
            className="mt-4 rounded-md bg-red-500 p-2 text-white"
          >
            <RobotoText text="Cerrar" fontSize="20px" style="bold" />
          </button>
        </div>
      </Modal>
    </section>
  )
}
