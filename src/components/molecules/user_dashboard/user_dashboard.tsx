'use client'
import { FC, useEffect, useState } from 'react'
import { RobotoText } from '@/components/atoms/roboto_text'

// define the structure of the data
interface Rental {
  rental_id: number
  aircraft_type: string
  rental_date: string
  rental_duration_hours: number
  rental_cost: number
  route: string
  airline_name: string
}

interface Airline {
  airline_id: number
  name: string
  country: string
  email: string
  password: string
  rental_role: 'Lessor' | 'Lessee' | 'Both'
}

interface UserDashboardProps {
  userId: number | null
}

const UserDashboard: FC<UserDashboardProps> = ({ userId }) => {
  const [rentals, setRentals] = useState<Rental[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loadingRentals, setLoadingRentals] = useState<boolean>(false)
  const [loadingAirline, setLoadingAirline] = useState<boolean>(false)
  const [airline, setAirline] = useState<Airline[]>([])
  const [editMode, setEditMode] = useState(false)
  const [updatedAirline, setUpdatedAirline] = useState<Airline | null>(null)
  const [editRentalId, setEditRentalId] = useState<number | null>(null)
  const [updatedRental, setUpdatedRental] = useState<Rental | null>(null)

  // fetch rentals
  useEffect(() => {
    const fetchRentals = async () => {
      setLoadingRentals(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/rentals/${userId}`,
        )
        const data = await response.json()
        setRentals(data)
      } catch (error) {
        console.error('Error fetching rentals:', error)
        setErrorMessage('Error al cargar las reservas.')
      } finally {
        setLoadingRentals(false)
      }
    }

    if (userId) {
      fetchRentals()
    }
  }, [userId])

  // fetch airline data for the logged-in user
  useEffect(() => {
    const fetchAirline = async () => {
      setLoadingAirline(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/airlines/${userId}`,
        )
        const data = await response.json()
        setAirline(data)
      } catch (error) {
        console.error('Error fetching airline:', error)
        setErrorMessage('Error al cargar los datos de la aerolínea.')
      } finally {
        setLoadingAirline(false)
      }
    }

    if (userId) {
      fetchAirline()
    }
  }, [userId])

  const handleEditAirline = () => {
    setEditMode(true)
    setUpdatedAirline(airline[0]) // Set current airline data as default for editing
  }

  const handleChange = (field: keyof Airline, value: string) => {
    if (updatedAirline) {
      setUpdatedAirline({ ...updatedAirline, [field]: value })
    }
  }

  const handleUpdateAirline = async () => {
    if (!updatedAirline) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/airlines/${userId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedAirline),
        },
      )

      if (response.ok) {
        setAirline([updatedAirline]) // Update state with new airline data
        setEditMode(false) // Exit edit mode
      } else {
        setErrorMessage('Error updating airline: ' + response.statusText)
      }
    } catch (error) {
      console.error('Error updating airline:', error)
      setErrorMessage(
        'An unexpected error occurred while updating the airline.',
      )
    }
  }

  const handleEditRental = (rental: Rental) => {
    setEditRentalId(rental.rental_id)
    setUpdatedRental(rental)
  }
  const handleRentalChange = (field: keyof Rental, value: string | number) => {
    if (updatedRental) {
      setUpdatedRental({ ...updatedRental, [field]: value })
    }
  }
  const handleUpdateRental = async () => {
    if (!updatedRental) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rentals/${updatedRental.rental_id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedRental),
        },
      )

      if (response.ok) {
        setRentals((prevRentals) =>
          prevRentals.map((rental) =>
            rental.rental_id === updatedRental.rental_id
              ? updatedRental
              : rental,
          ),
        )
        setEditRentalId(null) // Exit edit mode
        setUpdatedRental(null) // Clear the updated rental state
      } else {
        setErrorMessage('Error updating rental: ' + response.statusText)
      }
    } catch (error) {
      console.error('Error updating rental:', error)
      setErrorMessage('An unexpected error occurred while updating the rental.')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0] // converts date to 'YYYY-MM-DD'
  }

  // handle cancel rental
  const handleCancelRental = async (rentalId: number) => {
    const confirmCancel = window.confirm(
      '¿Estás seguro de que quieres cancelar esta reserva?',
    )
    if (!confirmCancel) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rentals/${rentalId}`,
        {
          method: 'DELETE',
        },
      )

      if (response.ok) {
        setRentals((prevRentals) =>
          prevRentals.filter((rental) => rental.rental_id !== rentalId),
        )
      } else {
        setErrorMessage('Error al cancelar la reserva: ' + response.statusText)
      }
    } catch (error) {
      console.error('Error deleting rental:', error)
      setErrorMessage('Ocurrió un error inesperado al cancelar la reserva.')
    }
  }

  // render the dashboard
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4 rounded">
      {/* title */}
      <RobotoText
        text="Bienvenido a tu Dashboard"
        fontSize="20px"
        className="text-center font-bold text-gray-800"
      />

      <div className="max-w-lg space-y-4 rounded p-4">
        {/* Airline information */}
        {loadingAirline ? (
          <RobotoText
            text="Cargando datos de la aerolínea..."
            fontSize="18px"
            className="text-center text-gray-500"
          />
        ) : airline.length > 0 ? (
          <div className="rounded border p-8">
            {editMode ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={updatedAirline?.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Nombre de la aerolínea"
                  className="w-full rounded border p-2"
                />
                <input
                  type="text"
                  value={updatedAirline?.country || ''}
                  onChange={(e) => handleChange('country', e.target.value)}
                  placeholder="País"
                  className="w-full rounded border p-2"
                />
                <input
                  type="email"
                  value={updatedAirline?.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Correo electrónico"
                  className="w-full rounded border p-2"
                />
                <select
                  value={updatedAirline?.rental_role || 'Lessor'}
                  onChange={(e) => handleChange('rental_role', e.target.value)}
                  className="w-full rounded border p-2"
                >
                  <option value="Lessor">Lessor</option>
                  <option value="Lessee">Lessee</option>
                  <option value="Both">Both</option>
                </select>
                <input
                  type="password"
                  value={updatedAirline?.password || ''}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Contraseña"
                  className="w-full rounded border p-2"
                />
                <button
                  onClick={handleUpdateAirline}
                  className="mt-2 w-full rounded bg-blue px-4 py-2"
                >
                  <RobotoText
                    text="Guardar Cambios"
                    fontSize="16px"
                    className="text-white"
                  />
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="mt-2 w-full rounded bg-gray-600 px-4 py-2"
                >
                  <RobotoText
                    text="Cancelar"
                    fontSize="16px"
                    className="text-white"
                  />
                </button>
              </div>
            ) : (
              <>
                <RobotoText
                  text={`Nombre de la aerolínea: ${airline[0].name}`}
                  fontSize="18px"
                  className="text-gray-600"
                />
                <RobotoText
                  text={`País: ${airline[0].country}`}
                  fontSize="16px"
                  className="text-gray-600"
                />
                <RobotoText
                  text={`Correo electrónico: ${airline[0].email}`}
                  fontSize="16px"
                  className="text-gray-600"
                />
                <RobotoText
                  text={`Rol de alquiler: ${airline[0].rental_role}`}
                  fontSize="16px"
                  className="text-gray-600"
                />
                <RobotoText
                  text={`Contraseña: ${airline[0].password}`}
                  fontSize="16px"
                  className="text-gray-600"
                />
                <button
                  onClick={handleEditAirline}
                  className="mt-2 w-full rounded bg-green-500 px-4 py-2 text-white"
                >
                  Editar Información
                </button>
              </>
            )}
          </div>
        ) : (
          <RobotoText
            text="No se encontró información de la aerolínea."
            fontSize="18px"
            className="text-center text-gray-500"
          />
        )}

        {/* Error message display */}
        {errorMessage && (
          <RobotoText
            text={errorMessage}
            fontSize="16px"
            className="text-center text-red-500"
          />
        )}
      </div>
      {/* Rental information */}
      <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
        {loadingRentals ? (
          <RobotoText
            text="Cargando reservas..."
            fontSize="18px"
            className="text-center text-gray-600"
          />
        ) : rentals.length > 0 ? (
          rentals.map((rental) => (
            <div
              key={rental.rental_id}
              className="flex flex-col items-center justify-center rounded border p-8"
            >
              <RobotoText
                text={`Aeronave: ${rental.aircraft_type}`}
                fontSize="18px"
                className="text-gray-600"
              />
              <RobotoText
                text={`Fecha: ${formatDate(rental.rental_date)}`}
                fontSize="16px"
                className="text-gray-600"
              />
              <RobotoText
                text={`Duración: ${rental.rental_duration_hours} horas`}
                fontSize="16px"
                className="text-gray-600"
              />
              <RobotoText
                text={`Costo: ${rental.rental_cost} €`}
                fontSize="16px"
                className="text-gray-600"
              />
              <RobotoText
                text={`Aerolínea: ${rental.airline_name}`}
                fontSize="16px"
                className="text-gray-600"
              />
              <RobotoText
                text={`Ruta: ${rental.route}`}
                fontSize="16px"
                className="text-gray-600"
              />
              {/* cancel rental */}
              <button
                onClick={() => handleCancelRental(rental.rental_id)}
                className="mt-2 rounded bg-red-500 px-4 py-2 text-white"
              >
                <RobotoText
                  text="Cancelar reserva"
                  fontSize="16px"
                  className="text-white"
                />
              </button>
            </div>
          ))
        ) : (
          <RobotoText
            text="No hay reservas disponibles"
            fontSize="18px"
            className="text-center text-gray-500"
          />
        )}

        {errorMessage && (
          <RobotoText
            text={errorMessage}
            fontSize="16px"
            className="text-center text-red-500"
          />
        )}
      </div>
    </div>
  )
}

export default UserDashboard
