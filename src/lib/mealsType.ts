import { ChangeEvent } from "react"

export interface Imeal {
    name: string
    amount: number
    cost: number
}

export interface IContextRoot {
    meals: Imeal[]
    editFood: (data: Imeal, idx: number) => void
    deleteFood: (idx: number) => void
    createNew: (data: Imeal) => void
    handleChangeTip: (e: ChangeEvent<HTMLInputElement>) => void
    total: number
    totalTip: number
    tipPercent: number
}