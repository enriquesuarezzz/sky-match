import { ChangeEvent, ForwardedRef, forwardRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  id?: string
  label?: string
  type?: 'text' | 'email' | 'tel' | 'checkbox' | 'password' // Specify possible input types
  name: string
  value?: string
  textArea?: boolean // Flag to determine if textarea should be rendered
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void // onChange event handler
  className?: string
  register?: UseFormRegisterReturn // if it doesnt work use any type
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ type = 'text', textArea = false, ...props }, ref) => {
    return (
      <div className={`relative ${props.className}`}>
        {textArea ? (
          <textarea
            ref={ref as ForwardedRef<HTMLTextAreaElement>} // Forwarding ref to textarea element
            id={props.id}
            name={props.name}
            value={props.value}
            className="focus: peer h-20 w-full bg-transparent pt-2 text-base placeholder-transparent focus:outline-none"
            placeholder=""
            onChange={props.onChange}
            {...props.register} // Spread additional props for integration with form libraries
          />
        ) : (
          <input
            ref={ref as ForwardedRef<HTMLInputElement>} // Forwarding ref to input element
            id={props.id}
            type={type}
            name={props.name}
            value={props.value}
            className="focus: peer w-full rounded-none bg-transparent pt-2 text-base placeholder-transparent focus:outline-none"
            placeholder=""
            onChange={props.onChange}
            {...props.register} // Spread additional props for integration with form libraries
          />
        )}
        <label
          htmlFor={props.id}
          className="peer-focus: peer-placeholder-shown: pointer-events-none absolute -top-4 left-0 bg-transparent text-base transition-all peer-placeholder-shown:-top-0 peer-placeholder-shown:text-xl peer-focus:-top-4 peer-focus:text-base"
        >
          {props.label}
        </label>
      </div>
    )
  },
)
Input.displayName = 'Input'
export default Input
