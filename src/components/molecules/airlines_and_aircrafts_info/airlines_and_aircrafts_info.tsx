'use client'
import { RobotoText } from '@/components/atoms/roboto_text'
import { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner'
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'

//define the structure of the data
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

// create the states to store the data
export default function AerolineasYFlota() {
  const [airlines, setAirlines] = useState<Airlines[]>([])
  const [aircrafts, setAircrafts] = useState<Aircrafts[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  //fetch the data of the api
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

  return (
    // if the data is loading show a loader
    <section className="flex flex-col items-center justify-center bg-gray-100 py-10">
      {isLoading ? (
        <div className="flex h-40 flex-col items-center justify-center">
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <div className="font-onest mt-4 text-xl font-bold text-gray-600">
            <RobotoText text="Cargando..." />
          </div>
        </div>
      ) : (
        //swiper to show the data
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={20}
          slidesPerView={'auto'}
          loop={true}
          speed={3000}
          autoplay={{ delay: 0 }}
        >
          {/* swiper slide for each aircraft */}
          {aircrafts.map((aircraft) => (
            <SwiperSlide key={aircraft.id} className="w-full max-w-[300px]">
              <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg">
                {/* aircraft type */}
                <RobotoText
                  text={aircraft.type}
                  fontSize="18px"
                  className="text-center text-lg font-bold text-gray-800"
                />
                {/* aircraft image */}
                <img
                  src={aircraft.aircraft_image_url}
                  alt={aircraft.type}
                  className="mt-3 h-48 w-full rounded-lg object-cover shadow-sm"
                />
                {/* aircraft capacity */}
                <RobotoText
                  text={`Capacidad: ${aircraft.capacity.toString()} pasajeros`}
                  fontSize="18px"
                  className="mt-2 text-center text-gray-500"
                />
                {/* aircraft price per hour */}
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
    </section>
  )
}
