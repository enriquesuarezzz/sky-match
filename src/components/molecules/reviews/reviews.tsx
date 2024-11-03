'use client'
import { useEffect, useState } from 'react'
import { RobotoText } from '@/components/atoms/roboto_text'
import { Bars } from 'react-loader-spinner'
import Star from '@/components/atoms/svg/star'

// define the structure of the reviews
interface Review {
  review_id: number
  rating: number
  review_text: string
  reviewer_name: string
  aircraft_name: string
}

// fecth the reviews from the API
export default function ReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
        )
        const data = await response.json()
        setReviews(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching reviews:', error)
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [])

  // render the reviews
  return (
    <section className="mx-10 flex flex-col items-center justify-center py-10">
      {/* loading spinner */}
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
        // render the reviews when the data is fetched
        <div className="w-full max-w-2xl space-y-8">
          {reviews.map((review) => (
            <div
              key={review.review_id}
              className="flex flex-col items-center justify-center gap-3 rounded-lg bg-gray-100 p-6 shadow-md"
            >
              <div className="mt-2 flex">
                {/* render star component depending on the rating */}
                {Array.from({ length: review.rating }, (_, index) => (
                  <Star key={index} />
                ))}
              </div>
              <div className="font-semibold text-gray-800">
                <RobotoText
                  text={`${review.aircraft_name} alquilado por ${review.reviewer_name}`}
                  fontSize="16px"
                />
              </div>
              <div className="text-center text-gray-600">
                <RobotoText text={review.review_text} fontSize="16px" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
