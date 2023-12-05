import { ChangeEvent, useState } from 'react'
import './styles.css'
import { Imeal } from '@/lib/mealsType'
import { useRoot } from './RootContext'

interface Props {
    item: Imeal,
    index: number
}

export const Item = ({ item, index }: Props) => {
    const [isDisabled, setIsDisabled] = useState(true)
    const [itemValues, setItemValues] = useState(item)
    const { deleteFood, editFood } = useRoot()

    const { name, cost, amount } = itemValues

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setItemValues(prevState => ({
            ...prevState, [target.name]: target.value
        }))
    }

    const toggleEdit = () => {
        const valuesToCheck = Object.values(itemValues)
        const formNotComplete = valuesToCheck.some(item => !item)

        if (!isDisabled) {
            !formNotComplete && editFood(itemValues, index)
        }

        setIsDisabled(!isDisabled)
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const handleDelete = () => {
        deleteFood(index)
        setIsDisabled(!isDisabled)
    }

    const costFormat = isDisabled ? formatter.format(cost) : cost

    return (
        <li className='listItem__content'>
            <input type='text' name='name' value={name} disabled={isDisabled} onChange={handleChange} />
            <input type='text' name='cost' value={costFormat} disabled={isDisabled} onChange={handleChange} />
            <input type='number' name='amount' value={amount} disabled={isDisabled} onChange={handleChange} />
            <input type='text' name='total' value={formatter.format(amount * cost)} disabled onChange={handleChange} />
            {isDisabled ? (
                <button className='listItem__button__edit' onClick={toggleEdit}>✎</button>
            ) :
                <>
                    <button className='listItem__button__save' onClick={toggleEdit}>✓</button>
                    <button className='listItem__button__delete' onClick={handleDelete}>X</button>
                </>
            }
        </li>
    )
}
