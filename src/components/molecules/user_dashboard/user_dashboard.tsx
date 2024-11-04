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

interface UserDashboardProps {
  userId: number | null
}

const UserDashboard: FC<UserDashboardProps> = ({ userId }) => {
  const [rentals, setRentals] = useState<Rental[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // fetch rentals
  useEffect(() => {
    const fetchRentals = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/rentals/${userId}`,
        )
        const data = await response.json()
        setRentals(data)
      } catch (error) {
        console.error('Error fetching rentals:', error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchRentals()
    }
  }, [userId])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0] // converts date to 'YYYY-MM-DD'
  }

  //handle cancel rental
  const handleCancelRental = async (rentalId: number) => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this rental?', //TODO: popup to confirm the cancel
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
        setErrorMessage('Error deleting rental: ' + response.statusText)
      }
    } catch (error) {
      console.error('Error deleting rental:', error)
      setErrorMessage('An unexpected error occurred while deleting the rental.')
    }
  }
  // render the list of rentals
  return (
    <div className="w-full max-w-lg space-y-4 rounded bg-white p-4 shadow-lg">
      {/* title */}
      <RobotoText
        text="Your Rentals"
        fontSize="20px"
        className="text-center font-bold text-gray-800"
      />
      {/* loading spinner  */}
      {loading ? (
        <RobotoText
          text="Loading rentals..."
          fontSize="18px"
          className="text-center text-gray-500"
        />
      ) : rentals.length > 0 ? (
        // render the rentals
        rentals.map((rental) => (
          <div
            key={rental.rental_id}
            className="flex flex-col items-center justify-center rounded border p-4"
          >
            <RobotoText
              text={`Aircraft: ${rental.aircraft_type}`}
              fontSize="18px"
              className="text-gray-600"
            />
            <RobotoText
              text={`Date: ${formatDate(rental.rental_date)}`}
              fontSize="16px"
              className="text-gray-500"
            />
            <RobotoText
              text={`Duration: ${rental.rental_duration_hours} hours`}
              fontSize="16px"
              className="text-gray-500"
            />
            <RobotoText
              text={`Cost: ${rental.rental_cost} €`}
              fontSize="16px"
              className="text-gray-500"
            />
            <RobotoText
              text={`Airline: ${rental.airline_name}`}
              fontSize="16px"
              className="text-gray-500"
            />
            <RobotoText
              text={`Route: ${rental.route}`}
              fontSize="16px"
              className="text-gray-500"
            />
            {/* cancel rental */}
            <button
              onClick={() => handleCancelRental(rental.rental_id)} // Use rental_id here
              className="mt-2 rounded bg-red-500 px-4 py-2 text-white"
            >
              <RobotoText
                text={`Carcelar reserva`}
                fontSize="16px"
                className="text-white"
              />
            </button>
          </div>
        ))
      ) : (
        // render error message if no rentals found
        <RobotoText
          text="No rentals found."
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
  )
}

export default UserDashboard
