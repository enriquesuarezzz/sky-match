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
  const [aircrafts, setAircrafts] = useState<Aircrafts[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedAircraft, setSelectedAircraft] = useState<Aircrafts | null>(
    null,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLogInModalOpen, setLogInModalOpen] = useState(false)
  const [isUserSignedIn, setIsUserSignedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    setIsUserSignedIn(!!token)

    const fetchData = async () => {
      try {
        const responseAircrafts = await fetch(
          process.env.NEXT_PUBLIC_API_URL + '/aircrafts',
        )
        const dataAircrafts = await responseAircrafts.json()
        setAircrafts(Array.isArray(dataAircrafts) ? dataAircrafts : [])
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleAircraftClick = (aircraft: Aircrafts) => {
    if (!isUserSignedIn) {
      setLogInModalOpen(true)
    }
    setSelectedAircraft(aircraft)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setLogInModalOpen(false)
    setSelectedAircraft(null)
  }

  return (
    <section className="relative flex flex-col items-center justify-center py-10">
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
        <div
          className={`${isModalOpen ? 'pointer-events-none opacity-50 blur-sm' : ''}`}
        >
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
                  <RobotoText
                    text={aircraft.type}
                    fontSize="18px"
                    style="bold"
                  />
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
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        className="relative p-0"
      >
        <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-lg bg-white/80 p-4">
          <RobotoText
            text={`Alquilar el avión ${selectedAircraft?.type}`}
            fontSize="20px"
            style="bold"
          />
          <form className="mt-1 flex flex-col gap-2">
            <label className="pt-2">
              <RobotoText text="Fecha de alquiler" fontSize="16px" />
              <input type="date" className="mt-2 rounded-md border p-2" />
            </label>
            <label>
              <RobotoText text="Duración del alquiler" fontSize="16px" />
              <input
                type="number"
                className="mt-2 rounded-md border p-2"
                placeholder="(En horas)"
              />
            </label>
            <label>
              <RobotoText
                text="Introduzca el trayecto previsto"
                fontSize="16px"
              />
              <input
                type="text"
                className="mt-2 rounded-md border p-2"
                placeholder="ej: ACE-BCN"
              />
            </label>
          </form>
          <button
            type="submit"
            className="mt-4 w-fit rounded-md bg-blue p-2 text-white"
          >
            <RobotoText text="Enviar solicitud" fontSize="16px" />
          </button>
          <button
            onClick={closeModal}
            className="mt-4 rounded-md bg-red-500 p-2 text-white"
          >
            <RobotoText text="Cerrar" fontSize="16px" />
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isLogInModalOpen}
        onRequestClose={closeModal}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        className="relative p-0"
      >
        <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-lg bg-white/80 p-4">
          <RobotoText
            text={
              'Debes <a class="underline" href="/login"> iniciar sesión</a> para alquilar un avión'
            }
            fontSize="20px"
            style="bold"
            className="text-red-500"
          />
        </div>
      </Modal>
    </section>
  )
}
