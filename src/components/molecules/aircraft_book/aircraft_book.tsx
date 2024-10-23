'use client'
import { RobotoText } from '@/components/atoms/roboto_text'
import { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner'
import Modal from 'react-modal' // Import the modal package
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'

// Define the structure of the data
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

// Create the states to store the data
export default function AircraftBook() {
  const [airlines, setAirlines] = useState<Airlines[]>([])
  const [aircrafts, setAircrafts] = useState<Aircrafts[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedAircraft, setSelectedAircraft] = useState<Aircrafts | null>(
    null,
  ) // New state for selected aircraft
  const [isModalOpen, setIsModalOpen] = useState(false) // State to manage modal visibility

  // Fetch the data of the API
  useEffect(() => {
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
        setAirlines(dataAirlines)
        setAircrafts(dataAircrafts)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Open the modal and set the selected aircraft
  const handleAircraftClick = (aircraft: Aircrafts) => {
    setSelectedAircraft(aircraft)
    setIsModalOpen(true)
  }

  // Close the modal
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
          <div className="font-onest mt-4 text-xl font-bold text-gray-600">
            <RobotoText text="Cargando..." />
          </div>
        </div>
      ) : (
        // Swiper to show the data
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={20}
          slidesPerView={'auto'}
          loop={true}
          speed={3000}
          autoplay={{ delay: 0 }}
        >
          {/* Swiper slide for each aircraft */}
          {aircrafts.map((aircraft) => (
            <SwiperSlide
              key={aircraft.id}
              className="w-full max-w-[300px]"
              onClick={() => handleAircraftClick(aircraft)} // On click, show modal
            >
              <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg">
                {/* Aircraft type */}
                <RobotoText
                  text={aircraft.type}
                  fontSize="18px"
                  className="text-center text-lg font-bold text-gray-800"
                />
                {/* Aircraft image */}
                <img
                  src={aircraft.aircraft_image_url}
                  alt={aircraft.type}
                  className="mt-3 h-48 w-full rounded-lg object-cover shadow-sm"
                />
                {/* Aircraft capacity */}
                <RobotoText
                  text={`Capacidad: ${aircraft.capacity.toString()} pasajeros`}
                  fontSize="18px"
                  className="mt-2 text-center text-gray-500"
                />
                {/* Aircraft price per hour */}
                <RobotoText
                  text={`Precio por hora: ${aircraft.price_per_hour.toString()} €`}
                  fontSize="18px"
                  className="mt-1 text-center text-gray-500"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Modal for rental form */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-class" // Add your custom class styles here
        overlayClassName="overlay-class" // Add your custom overlay styles here
      >
        <div className="flex flex-col items-center p-4">
          <h2 className="text-2xl font-bold">
            {/* Display selected aircraft's type */}
            Rentar el avión: {selectedAircraft?.type}
          </h2>
          <form className="mt-4 flex flex-col">
            {/* Add your rental form fields here */}

            {/* Rental date input */}
            <label className="mt-4">
              Fecha de alquiler:
              <input type="date" className="mt-2 rounded-md border p-2" />
            </label>
            <label>
              Duración del alquiler
              <input
                type="number"
                className="mt-2 rounded-md border p-2"
                placeholder="(En horas)"
              />
            </label>
            <label>
              Introduzca el trayecto previsto
              <input
                type="text"
                className="mt-2 rounded-md border p-2"
                placeholder="ej: ACE-BCN"
              />
            </label>
            <button type="submit" className="mt-4 rounded-md bg-blue p-2">
              Enviar solicitud de alquiler
            </button>
          </form>
          <button
            onClick={closeModal}
            className="mt-4 rounded-md bg-red-500 p-2 text-white"
          >
            Cerrar
          </button>
        </div>
      </Modal>
    </section>
  )
}
