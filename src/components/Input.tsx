import { ChangeEvent } from "react"

interface InputProps {
    type?: 'text' | 'number' | 'email' | 'password'
    value: string | number
    name: string
    disabled?: boolean
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
  }

export const Input = ({ name = '', value = '', onChange, type = 'text' }: InputProps) => {
    return (
      <>
        <label className='label'>{name}</label>
        <input placeholder={name} name={name} className='input' type={type} value={value} onChange={onChange} min='1' />
      </>
    )
  }
  