'use client'
import { FC, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { sendEmail } from '@/utils/send-email'
import Input from '../input/input'
import { RobotoText } from '@/components/atoms/roboto_text'

// Define the structure of form data
export type FormData = {
  name: string
  surname: string
  email: string
  phone: string
  message: string
  checkbox: boolean
}

const ContactForm: FC = () => {
  // Form management using react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  // State variables to manage form submission status
  const [isSending, setIsSending] = useState(false) // Indicates if the form is currently being submitted
  const [sendError, setSendError] = useState<string | null>(null) // Error message if sending email fails
  const [sendSuccess, setSendSuccess] = useState<boolean | null>(null) // Success message after email is sent

  // Function to handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSending(true) // Set isSending to true to indicate form submission in progress
    setSendError(null) // Clear any previous error messages
    setSendSuccess(null) // Clear any previous success messages

    try {
      await sendEmail(data) // Call function to send email with form data
      setSendSuccess(true) // Set sendSuccess to true upon successful submission
      reset() // Clear the form fields using react-hook-form's reset method
    } catch (error) {
      console.error('Error sending email:', error)
      setSendError('Failed to send email. Please try again later.') // Set error message if sending email fails
    } finally {
      setIsSending(false) // Set isSending back to false after submission attempt
    }
  }

  // Clear success message after 3 seconds
  if (sendSuccess) {
    setTimeout(() => {
      setSendSuccess(null)
    }, 3000)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 lg:gap-6">
          {/* Grid layout for form inputs */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
            {/* Input fields for Name and Surname */}
            <div className="flex flex-col">
              <Input
                id="name"
                label="Nombre"
                {...register('name', {
                  required: 'Introduce tu nombre',
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: 'Nombre solo debe contener letras',
                  },
                })}
                className="w-full border-b border-black"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div className="flex flex-col">
              <Input
                id="surname"
                label="Apellidos"
                {...register('surname', { required: false })}
                className="w-full border-b border-black"
              />
              {errors.surname && (
                <span className="text-red-500">{errors.surname.message}</span>
              )}
            </div>
          </div>
          {/* Grid layout for Email and Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
            <div className="flex flex-col">
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
            <div className="flex flex-col">
              <Input
                id="phone"
                label="Teléfono"
                {...register('phone', {
                  required: 'Introduce tu teléfono',
                  pattern: {
                    value: /^[0-9]{9}$/,
                    message: 'Teléfono debe ser un número de 9 dígitos',
                  },
                })}
                className="w-full border-b border-black"
              />
              {errors.phone && (
                <span className="text-red-500">{errors.phone.message}</span>
              )}
            </div>
          </div>
          {/* Input field for Message */}
          <div className="flex flex-col">
            <Input
              textArea={true}
              id="message"
              label="Mensaje"
              {...register('message', {
                required: 'Escribe tu consulta',
              })}
              className="w-full border-b border-black"
            />
            {errors.message && (
              <span className="text-red-500">{errors.message.message}</span>
            )}
          </div>
        </div>
        {/* Checkbox for Privacy Policy */}
        <div className="flex flex-col pt-4">
          <div className="flex">
            <Input
              type="checkbox"
              id="checkbox"
              className="mr-2 h-4 w-4"
              {...register('checkbox', {
                required: 'Debes aceptar la política de privacidad',
              })}
            />
            <label htmlFor="checkbox">
              <RobotoText
                text={`Acepto el procesamiento de mis datos personales de acuerdo con nuestra <a href='/privacy-policy' class='underline hover:text-orange'> Política de Privacidad </a>`}
                fontSize="16px"
                className=""
              />
            </label>
          </div>
          {errors.checkbox && (
            <span className="mt-2 text-red-500">{errors.checkbox.message}</span>
          )}
        </div>
        {/* Submit Button */}
        <div className="mt-6 grid items-center justify-center">
          <button
            type="submit"
            className="inline-flex w-fit items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue px-6 py-3 text-sm font-semibold disabled:opacity-50"
            disabled={isSending}
          >
            {isSending ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
        {/* Display error message if sending email fails */}
        {sendError && <div className="mt-4 text-red-500">{sendError}</div>}
        {/* Display success message after successfully sending email */}
        {sendSuccess && (
          <div className="mt-4">
            <RobotoText
              text="Gracias por enviar tu consulta. Te responderemos lo antes posible."
              className="text-green-500"
            />
          </div>
        )}
      </form>
    </>
  )
}

export default ContactForm
