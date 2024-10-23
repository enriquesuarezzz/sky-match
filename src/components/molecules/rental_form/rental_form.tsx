'use client'
import { RobotoText } from '@/components/atoms/roboto_text'
import { useState, useEffect } from 'react'

interface Aircraft {
  id: number
  type: string
}

interface RentalFormData {
  aircraftId: number
  rentalDate: string
  rentalDurationHours: number
}

export default function RentalForm() {
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([])
  const [formData, setFormData] = useState<RentalFormData>({
    aircraftId: 0,
    rentalDate: '',
    rentalDurationHours: 1,
  })

  // Fetch available aircrafts from the backend
  useEffect(() => {
    const fetchAircrafts = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/aircrafts',
      )
      const data = await response.json()
      setAircrafts(data)
    }

    fetchAircrafts()
  }, [])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/rentals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      alert('Rental submitted successfully!')
    } else {
      alert('Error submitting rental.')
    }
  }

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="mx-10 w-fit border border-gray-200 p-4">
      <RobotoText
        tag="h2"
        fontSize="20px"
        text={'Alquila un Avión'}
        className=""
      />

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <div>
          <label htmlFor="aircraftId" className="block">
            <RobotoText tag="h2" fontSize="18px" text={'Avión'} className="" />
          </label>
          <select
            name="aircraftId"
            id="aircraftId"
            value={formData.aircraftId}
            onChange={handleChange}
            required
          >
            <option value="">
              <RobotoText
                tag="h2"
                fontSize="18px"
                text={'Elige un Avión'}
                className=""
              />
            </option>
            {aircrafts.map((aircraft) => (
              <option key={aircraft.id} value={aircraft.id}>
                {aircraft.type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="rentalDate" className="block">
            <RobotoText
              tag="h2"
              fontSize="18px"
              text={'Fecha de Alquiler'}
              className=""
            />
          </label>
          <input
            type="date"
            name="rentalDate"
            id="rentalDate"
            value={formData.rentalDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="rentalDurationHours" className="block">
            <RobotoText
              tag="h2"
              fontSize="18px"
              text={'Duración en horas del alquiler'}
              className=""
            />
          </label>
          <input
            type="number"
            name="rentalDurationHours"
            id="rentalDurationHours"
            value={formData.rentalDurationHours}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 rounded px-4 py-2 text-white"
        >
          Submit Rental
        </button>
      </form>
    </div>
  )
}
