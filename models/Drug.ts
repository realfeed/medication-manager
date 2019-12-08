import DrugTakingResult from './DrugTakingResult'

export interface DrugHistory {
  result: DrugTakingResult, time: number
}

interface Drug {
  name: string
  stock: number
  prescriptions: number[]
  history: DrugHistory[]
}

export default Drug
