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
import Notification from '../notification/notification'
import axios from 'axios'
import { useForm } from 'react-hook-form'

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
  const [userAirlineId, setUserAirlineId] = useState<number | null>(null)
  const [notification, setNotification] = useState<{
    message: string
    type: 'success' | 'error'
  } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{
    rental_date: string
    rental_duration_hours: number
    route: string
  }>()
  //get the user id from local storage
  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (token) {
      try {
        const base64Payload = token.split('.')[1]

        // Check if the payload is present
        if (!base64Payload) {
          throw new Error('Invalid token format')
        }
        const payload = JSON.parse(atob(base64Payload))
        setUserAirlineId(payload.airlineId)
      } catch (error) {
        console.error('Error decoding token:', error)
        setUserAirlineId(null)
      }
    }
  }, [])

  //check if airline is logged in to open rental modal
  const handleAircraftClick = (aircraft: Aircrafts) => {
    if (!isUserSignedIn) {
      setLogInModalOpen(true)
    }
    setSelectedAircraft(aircraft)
    setIsModalOpen(true)
  }

  //handle close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setLogInModalOpen(false)
    setSelectedAircraft(null)
    reset()
  }

  //handle sumbit of the rental form
  const onSubmit = async (data: {
    rental_date: string
    rental_duration_hours: number
    route: string
  }) => {
    if (!selectedAircraft || !userAirlineId) return

    try {
      const rentalData = {
        aircraft_id: selectedAircraft.id,
        airline_requesting_id: userAirlineId,
        rental_date: data.rental_date,
        rental_duration_hours: data.rental_duration_hours,
        route: data.route,
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/rentals`,
        rentalData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const result = response.data
      if (response.status === 200) {
        setNotification({
          message: `Rental successful! Total cost: €${result.rental_cost}`,
          type: 'success',
        })
      } else {
        setNotification({
          message: result.message || 'Rental failed.',
          type: 'error',
        })
      }
    } catch (error) {
      console.error('Error submitting rental:', error)
      setNotification({
        message: 'There was an error. Please try again later.',
        type: 'error',
      })
    }
  }

  return (
    <section className="relative flex flex-col items-center justify-center py-10">
      {/* loading bars while fetching data */}
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
        //if the data is fetched
        <div
          className={`${isModalOpen ? 'pointer-events-none opacity-50 blur-sm' : ''}`}
        >
          {/* swiper of aircrafts */}
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

      {/* notification Component */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* rental Modal */}
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
          {/* rental form */}
          <form
            className="mt-1 flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* date */}
            <label className="flex flex-col pt-2">
              <RobotoText text="Fecha de alquiler" fontSize="16px" />
              <input
                type="date"
                className="mt-2 rounded-md border p-2"
                {...register('rental_date', {
                  required: 'Introduce la fecha de alquiler',
                })}
              />
              {errors.rental_date && (
                <span className="text-red-500">
                  {errors.rental_date.message}
                </span>
              )}
            </label>
            {/* rental duration */}
            <label className="flex flex-col">
              <RobotoText text="Duración del alquiler" fontSize="16px" />
              <input
                type="number"
                className="mt-2 rounded-md border p-2"
                placeholder="(En horas)"
                {...register('rental_duration_hours', {
                  required: 'Introduce la duración del alquiler',
                })}
              />
              {errors.rental_duration_hours && (
                <span className="text-red-500">
                  {errors.rental_duration_hours.message}
                </span>
              )}
            </label>
            {/* route */}
            <label className="flex flex-col">
              <RobotoText
                text="Introduzca el trayecto previsto"
                fontSize="16px"
              />
              <input
                type="text"
                className="mt-2 rounded-md border p-2"
                placeholder="ej: ACE-BCN"
                {...register('route', {
                  required: 'Introduce el trayecto previsto',
                })}
              />
              {errors.route && (
                <span className="text-red-500">{errors.route.message}</span>
              )}
            </label>
            {/* submit button */}
            <button
              type="submit"
              className="mt-4 w-fit rounded-md bg-blue p-2 text-white"
            >
              <RobotoText text="Enviar solicitud" fontSize="16px" />
            </button>
          </form>
          <button
            onClick={closeModal}
            className="mt-4 rounded-md bg-red-500 p-2 text-white"
          >
            <RobotoText text="Cerrar" fontSize="16px" />
          </button>
        </div>
      </Modal>

      {/* if user is not logged in */}
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
