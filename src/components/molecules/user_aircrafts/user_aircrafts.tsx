'use client'
import { FC, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { RobotoText } from '@/components/atoms/roboto_text'

// define aircraft and props
interface Aircraft {
  id: number
  type: string
  capacity: number
  price_per_hour: number
  aircraft_image_url: string
}

interface UserDashboardProps {
  userId: number | null
}

// form inputs type
interface AircraftFormInputs {
  type: string
  aircraft_image_url: string
  capacity: number
  price_per_hour: number
}

// states
const UserAircrafts: FC<UserDashboardProps> = ({ userId }) => {
  const [aircraftList, setAircraftList] = useState<Aircraft[]>([])
  const [loadingAircraft, setLoadingAircraft] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AircraftFormInputs>()

  // fetch aircrafts
  useEffect(() => {
    const fetchAircraftList = async () => {
      setLoadingAircraft(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/aircrafts/${userId}`,
        )
        const data = await response.json()
        setAircraftList(data)
      } catch (error) {
        console.error('Error fetching aircraft:', error)
        setErrorMessage('Error al cargar los aviones.')
      } finally {
        setLoadingAircraft(false)
      }
    }

    if (userId) fetchAircraftList()
  }, [userId])

  // add an aircraft
  const onSubmit: SubmitHandler<AircraftFormInputs> = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/aircrafts`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, airline_id: userId }),
        },
      )

      if (response.ok) {
        const addedAircraft = await response.json()
        setAircraftList((prevList) => [...prevList, addedAircraft])
        reset()
        setShowAddForm(false)
      } else {
        setErrorMessage('Error al añadir la aeronave')
      }
    } catch (error) {
      console.error('Error adding aircraft:', error)
      setErrorMessage('Ocurrió un error al añadir la aeronave.')
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4 rounded">
      {/* list airline planes */}
      <RobotoText
        text="Aeronaves en Alquiler"
        fontSize="20px"
        className="text-center font-bold text-gray-800"
      />
      {/* loading component */}
      {loadingAircraft ? (
        <RobotoText
          text="Cargando aeronaves..."
          fontSize="18px"
          className="text-center text-gray-500"
        />
      ) : aircraftList.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-5">
          {/* list aircrafts */}
          {aircraftList.map((aircraft) => (
            <div
              key={aircraft.id}
              className="flex w-[300px] flex-col items-center justify-center rounded border p-8"
            >
              <img
                src={aircraft.aircraft_image_url}
                alt={aircraft.type}
                width={200}
                height={200}
              />
              <RobotoText
                text={`Tipo: ${aircraft.type}`}
                fontSize="18px"
                className="text-gray-600"
              />
              <RobotoText
                text={`Capacidad: ${aircraft.capacity}`}
                fontSize="16px"
                className="text-gray-600"
              />
            </div>
          ))}
        </div>
      ) : (
        <RobotoText
          text="No hay aeronaves disponibles para alquiler"
          fontSize="18px"
          className="text-center text-gray-500"
        />
      )}
      {/* add new aircraft */}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="rounded bg-green-500 px-4 py-2 text-white"
      >
        <RobotoText
          text="Añadir nueva Aeronave"
          fontSize="16px"
          className="text-white"
        />
      </button>

      {showAddForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-[400px] flex-col space-y-4 rounded border p-6"
        >
          <div>
            <RobotoText text="Tipo de Aeronave" fontSize="14px" />
            <input
              type="text"
              {...register('type', {
                required: 'El tipo de aeronave es obligatorio',
              })}
              className="w-full rounded border p-2"
            />
            {errors.type && (
              <span className="text-red-500">{errors.type.message}</span>
            )}
          </div>

          <div>
            <RobotoText text="URL de la Imagen" fontSize="14px" />
            <input
              type="url"
              {...register('aircraft_image_url', {
                required: 'La URL de la imagen es obligatoria',
              })}
              className="w-full rounded border p-2"
            />
            {errors.aircraft_image_url && (
              <span className="text-red-500">
                {errors.aircraft_image_url.message}
              </span>
            )}
          </div>

          <div>
            <RobotoText text="Capacidad" fontSize="14px" />
            <input
              type="number"
              {...register('capacity', {
                required: 'La capacidad es obligatoria',
                min: { value: 1, message: 'Debe ser al menos 1' },
              })}
              className="w-full rounded border p-2"
            />
            {errors.capacity && (
              <span className="text-red-500">{errors.capacity.message}</span>
            )}
          </div>

          <div>
            <RobotoText text="Precio por Hora (€)" fontSize="14px" />
            <input
              type="number"
              {...register('price_per_hour', {
                required: 'El precio por hora es obligatorio',
                min: { value: 1, message: 'Debe ser al menos 1' },
              })}
              className="w-full rounded border p-2"
            />
            {errors.price_per_hour && (
              <span className="text-red-500">
                {errors.price_per_hour.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            <RobotoText text="Guardar Aeronave" fontSize="16px" />
          </button>
        </form>
      )}

      {errorMessage && (
        <RobotoText
          text={errorMessage}
          fontSize="16px"
          className="text-center text-red-500"
        />
      )}
    </div>
  )
}

export default UserAircrafts
