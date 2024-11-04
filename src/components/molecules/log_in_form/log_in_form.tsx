'use client'
import { FC, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { RobotoText } from '@/components/atoms/roboto_text'
import Input from '../input/input'
import axios from 'axios'

// define the structure of data
type LoginFormInputs = {
  email: string
  password: string
}

interface LoginFormProps {
  onLoginSuccess: () => void
}

// create the states to store the data
const LoginForm: FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  // function to handle form submission to log in and set the token in local storage
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsSubmitting(true)
    setLoginError(null)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        data,
      )
      const { token } = response.data
      localStorage.setItem('authToken', token)
      onLoginSuccess()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setLoginError(
          error.response?.data?.message || 'Email o contraseña incorrectos',
        )
      } else {
        setLoginError('Hubo un problema, por favor intenta más tarde.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-[500px] flex-col items-center gap-8 pt-6"
    >
      {/* log in form */}
      <RobotoText tag="h1" text="Iniciar Sesión" fontSize="32px" style="bold" />
      <div className="flex w-full flex-col gap-3">
        {/* Email input */}
        <div className="flex w-full flex-col gap-4">
          <Input
            id="email"
            label="Email"
            {...register('email', {
              required: 'Introduce tu email',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Email no es válido',
              },
              onChange: () => setLoginError(null),
            })}
            className="w-full border-b border-black"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        {/* Password input */}
        <div className="flex w-full flex-col">
          <Input
            type="password"
            id="password"
            label="Password"
            {...register('password', {
              required: 'Introduce tu contraseña',
              onChange: () => setLoginError(null),
            })}
            className="w-full border-b border-black"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-x-2 rounded-lg bg-blue px-6 py-3 text-sm font-semibold disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
      </button>

      {/* Error message */}
      {loginError && <p className="mt-2 text-red-500">{loginError}</p>}
    </form>
  )
}

export default LoginForm
