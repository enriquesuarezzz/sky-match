'use client'
import { FC, useEffect, useState } from 'react'
import { RobotoText } from '@/components/atoms/roboto_text'
import Modal from 'react-modal'
import UserAircrafts from '../user_aircrafts/user_aircrafts'
import Notification from '../notification/notification'

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

interface Review {
  rating: number
  review_text: string
}

// define the states
const UserDashboard: FC<UserDashboardProps> = ({ userId }) => {
  const [rentals, setRentals] = useState<Rental[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loadingRentals, setLoadingRentals] = useState<boolean>(false)
  const [loadingAirline, setLoadingAirline] = useState<boolean>(false)
  const [airline, setAirline] = useState<Airline[]>([])
  const [editMode, setEditMode] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [updatedAirline, setUpdatedAirline] = useState<Airline | null>(null)
  const [showReviewForm, setShowReviewForm] = useState(false)

  const [reviewData, setReviewData] = useState<Review>({
    rating: 0,
    review_text: '',
  })
  const [rentalIdForReview, setRentalIdForReview] = useState<number | null>(
    null,
  )
  const [notification, setNotification] = useState<{
    message: string
    type: 'success' | 'error' | null
  }>({ message: '', type: null })

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
        console.error('Error cargando reservas:', error)
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
        console.error('Error cargando aerolineas:', error)
        setErrorMessage('Error al cargar los datos de la aerolínea.')
      } finally {
        setLoadingAirline(false)
      }
    }

    if (userId) {
      fetchAirline()
    }
  }, [userId])

  // handle edit airline and changes

  const handleEditAirline = () => {
    setEditMode(true)
    setUpdatedAirline(airline[0])
  }

  const handleChange = (field: keyof Airline, value: string) => {
    if (updatedAirline) {
      setUpdatedAirline({ ...updatedAirline, [field]: value })
    }
  }

  // update airline function
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
        setAirline([updatedAirline])
        setEditMode(false)
      } else {
        setErrorMessage('Error actualizando aerolinea: ' + response.statusText)
      }
    } catch (error) {
      console.error('Error actualizando aerolinea:', error)
      setErrorMessage('Ha ocurrido un error actualizando la aerolinea.')
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
        setNotification({
          message: 'Reserva eliminada correctamente!',
          type: 'success',
        })
      } else {
        setNotification({
          message: 'A ocurrido un error con la reseña, intentelo más tarde',
          type: 'error',
        })
      }
    } catch (error) {
      console.error('Error eliminando la reserva:', error)
      setNotification({
        message:
          'A ocurrido un error eliminando la reserva, intentelo más tarde',
        type: 'error',
      })
    }
  }

  const openReviewForm = (rentalId: number) => {
    setRentalIdForReview(rentalId)
    setShowReviewForm(true)
    setIsModalOpen(true)
  }

  const handleSubmitReview = async () => {
    if (!rentalIdForReview) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            airline_id: userId,
            rental_id: rentalIdForReview,
            ...reviewData,
          }),
        },
      )

      if (response.ok) {
        setNotification({
          message: 'Reseña enviada correctamente!',
          type: 'success',
        })
        setShowReviewForm(false)
        setReviewData({ rating: 0, review_text: '' })
      } else {
        setNotification({
          message: 'Error al enviar la reseña',
          type: 'error',
        })
      }
    } catch (error) {
      console.error('Error enviando la reseña:', error)
      setNotification({
        message:
          'Ha ocurrido un error al enviar la reseña. Inténtelo más tarde.',
        type: 'error',
      })
    }
  }

  const handleCloseNotification = () => {
    setNotification({ message: '', type: null })
  }

  const closeModal = () => {
    setIsModalOpen(false)
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

      <div className="max-w-[800px] space-y-4 rounded p-4">
        {/* Airline information */}
        {loadingAirline ? (
          <RobotoText
            text="Cargando datos de la aerolínea..."
            fontSize="18px"
            className="text-center text-gray-500"
          />
        ) : airline.length > 0 ? (
          <section className="flex flex-col gap-10 md:flex-row md:gap-20">
            <div className="space-y-4 rounded p-2">
              {editMode ? (
                <div className="space-y-2">
                  {/* input fields */}
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
                    onChange={(e) =>
                      handleChange('rental_role', e.target.value)
                    }
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
                  {/* save changes buttons */}
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

                  {/* cancel button */}
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
                  {notification.message && (
                    <Notification
                      message={notification.message}
                      type={notification.type}
                      onClose={handleCloseNotification}
                    />
                  )}
                  <RobotoText
                    text="Datos de la Aerolínea"
                    fontSize="20px"
                    className="text-center font-bold text-gray-800"
                  />
                  <div className="flex flex-col gap-2 border p-4">
                    {/* airline information */}
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

                    {/* edit button */}
                    <button
                      onClick={handleEditAirline}
                      className="mt-2 w-full rounded bg-green-500 px-4 py-2"
                    >
                      <RobotoText
                        text="Editar información"
                        fontSize="16px"
                        className="text-center text-white"
                      />
                    </button>
                  </div>
                </>
              )}
            </div>
            <UserAircrafts userId={userId} />
          </section>
        ) : (
          // error message
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
      <div className="grid grid-cols-1 items-center justify-center gap-10 md:grid-cols-2 lg:grid-cols-4">
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
              {/* rental information */}
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
              <button
                className="mt-2 rounded bg-blue px-4 py-2 text-white"
                onClick={() => openReviewForm(rental.rental_id)}
              >
                <RobotoText
                  text="Dejar una reseña"
                  fontSize="16px"
                  className="text-white"
                />
              </button>
            </div>
          ))
        ) : (
          // error message
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
        {/*  reviews form */}
        {showReviewForm && (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            className="relative p-0"
          >
            <div className="flex w-[300px] flex-col items-center justify-center rounded-lg bg-white/80 p-4">
              <RobotoText text="Deja tu reseña" fontSize="20px" style="bold" />
              <div className="review-form flex w-full flex-col gap-3">
                <select
                  value={reviewData.rating}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, rating: +e.target.value })
                  }
                  className="w-full rounded border p-2"
                >
                  <option value="" disabled>
                    <RobotoText
                      text="Selecciona una calificación (1-5)"
                      fontSize="16px"
                    />
                  </option>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
                {reviewData.rating === 0 && (
                  <span className="text-red-500">
                    Por favor, selecciona una calificación.
                  </span>
                )}

                <textarea
                  value={reviewData.review_text}
                  onChange={(e) =>
                    setReviewData({
                      ...reviewData,
                      review_text: e.target.value,
                    })
                  }
                  placeholder="Escribe tu reseña aquí"
                  className="w-full rounded border p-2"
                ></textarea>
                {(!reviewData.review_text ||
                  reviewData.review_text.trim() === '') && (
                  <span className="text-red-500">
                    El texto de la reseña no puede estar vacío.
                  </span>
                )}

                <button
                  className="mt-4 rounded-md bg-blue p-2 text-white"
                  onClick={() => {
                    if (reviewData.rating === 0) {
                      alert(
                        'Por favor, selecciona una calificación entre 1 y 5.',
                      )
                      return
                    }
                    if (
                      !reviewData.review_text ||
                      reviewData.review_text.trim() === ''
                    ) {
                      alert('El texto de la reseña no puede estar vacío.')
                      return
                    }

                    handleSubmitReview()
                  }}
                >
                  <RobotoText text="Enviar" fontSize="16px" />
                </button>
              </div>
              <button
                onClick={closeModal}
                className="mt-4 rounded-md bg-red-500 p-2 text-white"
              >
                <RobotoText text="Cerrar" fontSize="16px" />
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default UserDashboard
