'use client'
import { FC, useEffect, useState } from 'react'
import RegisterForm from '../register_form/register_form'
import LoginForm from '../log_in_form/log_in_form'
import { RobotoText } from '@/components/atoms/roboto_text'
import UserDashboard from '../user_dashboard/user_dashboard'

const LoginOrRegister: FC = () => {
  const [activeForm, setActiveForm] = useState<'login' | 'register'>('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userAirlineId, setUserAirlineId] = useState<number | null>(null)

  // callback to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
  }

  //get the user id from local storage
  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (token) {
      try {
        const base64Payload = token.split('.')[1]

        // check if the payload is present
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

  return (
    <div className="flex flex-col items-center gap-6 pt-6">
      {/* check if user is logged in */}
      {isLoggedIn ? (
        <UserDashboard userId={userAirlineId} /> // show user dashboard if logged in
      ) : (
        <>
          {/* show LoginForm or RegisterForm based on the active form */}
          {activeForm === 'login' ? (
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          ) : (
            <RegisterForm />
          )}

          {/* login and Register buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setActiveForm('login')}
              className="rounded-lg px-4 py-2"
            >
              <RobotoText
                text="Iniciar Sesión"
                fontSize="16px"
                className={`${
                  activeForm === 'login'
                    ? 'text-blue underline'
                    : 'text-gray-500'
                }`}
              />
            </button>
            <button
              onClick={() => setActiveForm('register')}
              className="rounded-lg px-4 py-2"
            >
              <RobotoText
                text="Registrarse"
                fontSize="16px"
                className={`${
                  activeForm === 'register'
                    ? 'text-green-500 underline'
                    : 'text-gray-500'
                }`}
              />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default LoginOrRegister
