'use client'
import { FC, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { RobotoText } from '@/components/atoms/roboto_text'
import Input from '../input/input'
import axios from 'axios'

// Define the structure of form data
type RegisterFormInputs = {
  name: string
  country: string
  email: string
  password: string
  rental_role: 'Lessor' | 'Lessee' | 'Both'
}

const RegisterForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registerError, setRegisterError] = useState<string | null>(null)
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false)

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setIsSubmitting(true)
    setRegisterError(null)
    setRegisterSuccess(false)

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, data)
      setRegisterSuccess(true)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setRegisterError(error.response?.data?.message || 'Registro fallido.')
      } else {
        setRegisterError('Hubo un problema, por favor intenta más tarde.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-[700px] flex-col items-center gap-8 pt-6"
    >
      <RobotoText tag="h1" text="Registro" fontSize="32px" style="bold" />
      <div className="flex w-full flex-col gap-3">
        {/* Name input */}
        <Input
          id="name"
          label="Nombre de la aerolínea"
          {...register('name', {
            required: 'Introduce el nombre de la aerolínea',
          })}
          className="w-full border-b border-black"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}

        {/* Country input */}
        <Input
          id="country"
          label="Código de País"
          {...register('country', {
            required: 'Introduce el país de la aerolínea',
          })}
          {...register('country')}
          className="w-full border-b border-black"
        />
        {errors.country && (
          <span className="text-red-500">{errors.country.message}</span>
        )}

        {/* Email input */}
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

        {/* Password input */}
        <Input
          type="password"
          id="password"
          label="Password"
          {...register('password', {
            required: 'Introduce tu contraseña',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          })}
          className="w-full border-b border-black"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        {/* Rental Role input */}
        <select
          id="rental_role"
          {...register('rental_role', { required: 'Selecciona un rol' })}
          className="w-full border-b border-black"
        >
          <option value="Lessee">Arrendatario</option>
          <option value="Lessor">Arrendador</option>
          <option value="Both">Ambos</option>
        </select>
        {errors.rental_role && (
          <span className="text-red-500">{errors.rental_role.message}</span>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-x-2 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Registrando...' : 'Registrarse'}
      </button>

      {/* Error message */}
      {registerError && <p className="mt-2 text-red-500">{registerError}</p>}

      {/* Success message */}
      {registerSuccess && (
        <p className="mt-2 text-green-500">¡Registro exitoso!</p>
      )}
    </form>
  )
}

export default RegisterForm
