'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Input } from './Input'
import { useRoot } from './RootContext'

const CardNew = () => {
    const emptyValues = { name: '', cost: 0, amount: 0 }
    const { createNew } = useRoot()


    const [itemValues, setItemValues] = useState(emptyValues)
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const { name, cost, amount } = itemValues

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setShowErrorMessage(false)
        setItemValues(prevState => ({
            ...prevState, [target.name]: target.value
        }))
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setShowErrorMessage(false)

        const valuesToCheck = Object.values(itemValues)
        const formNotComplete = valuesToCheck.some(item => !item)

        if (formNotComplete) {
            setShowErrorMessage(true)
            return
        }

        setItemValues(emptyValues)
        createNew(itemValues)
    }

    return (
        <form className='card__content' onSubmit={handleSubmit}>
            <h3>Add a food</h3>
            <div className='form__content'>
                <Input name='name' onChange={handleChange} value={name} />
                <Input name='cost' onChange={handleChange} value={cost} type="number" />
                <Input name='amount' onChange={handleChange} value={amount} type="number" />
                {showErrorMessage && <p className='form__error'>All the field are required</p>}
                <button className='form__button'>Add Food</button>
            </div>
        </form>
    )
}

export default CardNew
