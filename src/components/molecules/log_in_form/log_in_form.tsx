'use client'
import { FC, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { RobotoText } from '@/components/atoms/roboto_text'
import Input from '../input/input'
import axios from 'axios'

// Define the structure of form data
type LoginFormInputs = {
  email: string
  password: string
}
//Create the states to store the data
const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false)

  // Function to handle form submission
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsSubmitting(true)
    setLoginError(null)
    setLoginSuccess(false)

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        data,
      )
      setLoginSuccess(true)
    } catch (error) {
      setLoginError('Email o contraseña incorrectos')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    // Form
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-8 pt-6"
    >
      <RobotoText tag="h1" text="Iniciar Sesión" fontSize="32px" style="bold" />
      <div className="w-full max-w-[700px]">
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
            {...register('password', { required: 'Introduce tu contraseña' })}
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
        {isSubmitting ? 'Iniciando...' : 'Inciar Sesión'}
      </button>

      {/* Error message */}
      {loginError && <p className="mt-2 text-red-500">{loginError}</p>}

      {/* Success message */}
      {loginSuccess && (
        <p className="mt-2 text-green-500">¡Bienvenido de nuevo!</p>
      )}
    </form>
  )
}

export default LoginForm
