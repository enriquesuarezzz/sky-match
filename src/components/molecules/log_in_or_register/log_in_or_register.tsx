'use client'
import { FC, useState } from 'react'
import RegisterForm from '../register_form/register_form'
import LoginForm from '../log_in_form/log_in_form'
import { RobotoText } from '@/components/atoms/roboto_text'

const loginOrRegister: FC = () => {
  const [activeForm, setActiveForm] = useState<'login' | 'register'>('login')

  return (
    <div className="flex flex-col items-center gap-6 pt-6">
      {/*  loginForm or registerForm depending on wich one use click */}
      {activeForm === 'login' ? <LoginForm /> : <RegisterForm />}

      {/* login and register buttons to toggle between forms */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setActiveForm('login')}
          className="rounded-lg px-4 py-2"
        >
          <RobotoText
            text="Iniciar Sesión"
            fontSize="16px"
            className={`${activeForm === 'login' ? 'text-blue underline' : 'text-gray-500'}`}
          />
        </button>
        <button
          onClick={() => setActiveForm('register')}
          className="rounded-lg px-4 py-2"
        >
          <RobotoText
            text="Registrarse"
            fontSize="16px"
            className={`${activeForm === 'register' ? 'text-green-500 underline' : 'text-gray-500'}`}
          />
        </button>
      </div>
    </div>
  )
}

export default loginOrRegister
