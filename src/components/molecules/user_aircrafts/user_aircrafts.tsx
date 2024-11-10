'use client'
import { RobotoText } from '@/components/atoms/roboto_text'
import { FC, useEffect, useState } from 'react'

// Define Aircraft interface
interface Aircraft {
  id: number
  type: string
  aircraft_image_url: string
  capacity: number
}

interface UserDashboardProps {
  userId: number | null
}

const UserAircrafts: FC<UserDashboardProps> = ({ userId }) => {
  const [aircraftList, setAircraftList] = useState<Aircraft[]>([])
  const [loadingAircraft, setLoadingAircraft] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState<boolean>(false)
  const [newAircraft, setNewAircraft] = useState({
    type: '',
    aircraft_image_url: '',
    capacity: 0,
  })

  // Fetch aircraft data from the database
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
        console.error('Error cargando aviones:', error)
        setErrorMessage('Error al cargar los aviones.')
      } finally {
        setLoadingAircraft(false)
      }
    }

    if (userId) {
      fetchAircraftList()
    }
  }, [userId])

  // Handle aircraft delete
  const handleDeleteAircraft = async (aircraftId: number) => {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que quieres eliminar esta aeronave?',
    )
    if (!confirmDelete) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/aircrafts/${aircraftId}`,
        { method: 'DELETE' },
      )

      if (response.ok) {
        setAircraftList((prevAircraft) =>
          prevAircraft.filter((aircraft) => aircraft.id !== aircraftId),
        )
        alert('Aeronave eliminada correctamente')
      } else {
        setErrorMessage('Error al eliminar la aeronave: ' + response.statusText)
      }
    } catch (error) {
      console.error('Error eliminando el avión:', error)
      setErrorMessage('Ocurrió un error inesperado al eliminar el avión.')
    }
  }

  // Handle new aircraft submission
  const handleAddAircraft = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/aircrafts`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            ...newAircraft,
          }),
        },
      )

      if (response.ok) {
        const addedAircraft = await response.json()
        setAircraftList((prevList) => [...prevList, addedAircraft])
        setNewAircraft({ type: '', aircraft_image_url: '', capacity: 0 })
        setShowAddForm(false)
        alert('Aeronave añadida correctamente')
      } else {
        setErrorMessage('Error al añadir la aeronave')
      }
    } catch (error) {
      console.error('Error añadiendo aeronave:', error)
      setErrorMessage('Ocurrió un error al añadir la aeronave.')
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4 rounded">
      <RobotoText
        text="Aeronaves en Alquiler"
        fontSize="20px"
        className="text-center font-bold text-gray-800"
      />

      {loadingAircraft ? (
        <RobotoText
          text="Cargando aeronaves..."
          fontSize="18px"
          className="text-center text-gray-500"
        />
      ) : aircraftList.length > 0 ? (
        <div className="flex items-center justify-center gap-5">
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
              <button
                onClick={() => handleDeleteAircraft(aircraft.id)}
                className="mt-2 rounded bg-red-500 px-4 py-2 text-white"
              >
                <RobotoText text="Eliminar Aeronave" fontSize="16px" />
              </button>
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

      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="rounded bg-blue px-4 py-2 text-white"
      >
        <RobotoText text="Añadir Nueva Aeronave" fontSize="16px" />
      </button>

      {showAddForm && (
        <div className="flex flex-col items-center space-y-2 rounded border p-4">
          <input
            type="text"
            placeholder="Tipo de Aeronave"
            value={newAircraft.type}
            onChange={(e) =>
              setNewAircraft({ ...newAircraft, type: e.target.value })
            }
            className="rounded border p-2"
          />
          <input
            type="url"
            placeholder="URL de la Imagen"
            value={newAircraft.aircraft_image_url}
            onChange={(e) =>
              setNewAircraft({
                ...newAircraft,
                aircraft_image_url: e.target.value,
              })
            }
            className="rounded border p-2"
          />
          <input
            type="number"
            placeholder="Capacidad"
            value={newAircraft.capacity}
            onChange={(e) =>
              setNewAircraft({
                ...newAircraft,
                capacity: parseInt(e.target.value),
              })
            }
            className="rounded border p-2"
          />
          <button
            onClick={handleAddAircraft}
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            <RobotoText text="Guardar Aeronave" fontSize="16px" />
          </button>
        </div>
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
