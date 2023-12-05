'use client'
import { IContextRoot, Imeal } from "@/lib/mealsType";
import usePersistState from "@/lib/usePersistState";
import { ChangeEvent, ReactNode, createContext, useContext, useMemo } from "react";

const defaultValues = {
    meals: [
        { name: "Burger", cost: 34.222, amount: 2 },
        { name: "French fries", cost: 15, amount: 4 },
        { name: "Hot dog", cost: 5, amount: 1 }
    ]
}

export const RootContext = createContext<IContextRoot>({} as IContextRoot)

export default function RootProvider({ children }: {
    children: ReactNode
}) {
    const [meals, setMeals] = usePersistState<Imeal[]>('meals', defaultValues.meals)
    const [tipPercent, setTipPercent] = usePersistState<number>('tipPercent', 10)

    const total = useMemo(() =>
        meals.reduce((prev, { cost, amount }) => prev + (cost * amount), 0)
        , [meals]);

    const totalTip = useMemo(() =>
        total * (tipPercent / 100) + total
        , [tipPercent, total]);

    const createNew = (data: Imeal) => {
        setMeals([...meals, data])
    }

    const deleteFood = (idxDelete: number) => {
        const removeByIndex = meals.filter((_, i) => i !== idxDelete);
        setMeals(removeByIndex)
    }

    const editFood = (item: Imeal, idxEdit: number) => {
        const newArr = [...meals]
        newArr[idxEdit] = item
        setMeals(newArr)
    }

    const handleChangeTip = ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (target.valueAsNumber >= 100) return setTipPercent(100)
        if (target.valueAsNumber < 0 || isNaN(target.valueAsNumber)) return setTipPercent(0)
        setTipPercent(target.valueAsNumber)
    }

    return (
        <RootContext.Provider value={{ meals, createNew, deleteFood, editFood, total, tipPercent, totalTip, handleChangeTip }}>
            {children}
        </RootContext.Provider>
    )
}

export const useRoot = () => useContext(RootContext);

